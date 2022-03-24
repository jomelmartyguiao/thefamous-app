
import { useState } from 'react';
import { ethers } from "ethers";
import { useHistory } from 'react-router-dom';
import WalletConnect from "@walletconnect/client";

import { IInternalEvent } from "@walletconnect/types";
import MyAlgoConnect from '@randlabs/myalgo-connect';

import { connectWallet, login, logout, getAuthMessage, loginMyAlgo } from 'modules/auth/apis';
import { WalletIcon } from 'modules/common/components/Icons';
import metamask from 'images/metamask.svg';
import myalgo from 'images/MyAlgoBlue.svg';
import connecting from 'images/connecting2.png';
import walletconnect from 'images/walletconnect-logo.svg';
import toastMessage from 'helpers/toastMessage';
import { getWalletConnectConnector } from '../common/constants/connector';
import { signWalletConnectTxn } from './constants/sign-txn';
import { SignWCTxnProps } from './types';
import Modal from 'modules/common/components/Modal';

declare let window: any;

const Login = () => {
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  

  const signWithMetaMask = async () => {
    const message = await getAuthMessage();
    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const finalMessage = `
      Welcome to The Famous community!
      
      Click to Authorize and accept 'The Famous' Terms of Service: https://thefamous.xyz/tos
      
      Note: This request will not trigger a blockchain transaction or cost any fees.
      
      Your authentication status will reset after 24 hours.
      
      Wallet address:
      ${address}
      
      Nonce:
      ${message}`;
      const signature = await signer.signMessage(finalMessage);
  
      const payload = {
        network: 'bsc',
        signature,
        wallet: address,
        message: finalMessage
      };

      await connectWallet(payload, () => {
        history.push("/profile/dashboard")
        localStorage.setItem('wallet_address', address);
      });
    } catch (err) {
      // setError(err.message);
    }
  };
  
  const connectWithWalletConnect = async () => {
    // create new connector
    const connector = getWalletConnectConnector();

    // console.log(connector)

    // Check if connection is already established
    if (!connector.connected) {
      // create new session
      await connector.createSession();
    }

    // subscribe to events
    await subscribeToEvents(connector);
  };

  const connectWithMyAlgo = async () => {
    const message = await getAuthMessage();
    try {
      const myAlgoConnect = new MyAlgoConnect();
      const settings = {
        shouldSelectOneAccount: true,
        openManager: false
      };
      await myAlgoConnect.connect(settings)
        .then((res) => {
          history.push({
            pathname: '/verify-txn',
            state: {
              address: res[0].address,
              message: message
            }
          });
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.error(err);
    }
  }

  // Subscribe to connection events
  const subscribeToEvents = (connector: WalletConnect) => {
    // Check if connection is already established
    if (!connector) {
      return
    }

    // Subscribe to connection events
    connector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }
      setIsModalOpen(true);
      signMsg(payload)
    });

    connector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }

      // Get updated accounts 
      // const { accounts } = payload.params[0];
    });

    window.onbeforeunload = () => {
      return "Data will be lost if you leave the page, are you sure?";
    };

    connector.on("network", (newNetwork, oldNetwork) => {
      // When a Provider makes its initial connection, it emits a "network"
      // event with a null oldNetwork along with the newNetwork. So, if the
      // oldNetwork exists, it represents a changing network
      if (oldNetwork) {
          window.location.reload();
      }
    });

    connector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }

      onDisConnect(payload.params[0].message);
    });
  }

  const signMsg = async (payload: IInternalEvent) => {
    const message = await getAuthMessage();
    const { accounts } = payload.params[0];
    const address = accounts[0];
    const walletType = payload.params[0].peerMeta.name;

    const obj: SignWCTxnProps = {
      message,
      address,
      walletType
    }

    await signWalletConnectTxn(obj, (payload) => {
      if (payload) {
        payload.message ?
          loginMyAlgo(payload, () => history.push("/profile/dashboard")) :
          login(payload, () => history.push("/profile/dashboard"));
        
        setIsModalOpen(false);
      } else {
        setIsModalOpen(false);
      }
    })
  }

  const onDisConnect = (message: string) => {
    logout({}, (res) => {
      console.log("logout: " + message)
      toastMessage({ message });
      setIsModalOpen(false);
      history.push("/login");
    })
  }
  
  return (
    <>
    <div className='bg-famous bg-no-repeat bg-fixed bg-contain bg-center md:min-h-screenFooter flex flex-col items-center pb-24 mt-32'>
      <div className='text-center'>
        <h1 className="text-4xl gangcrime text-c-blue">The Famous</h1>
        <h5 className="text-sm font-medium text-c-darkgray">The NFT marketplace for artists and fans</h5>
      </div>
      <div className="border border-gray-200 bg-white w-10/12  md:w-1/2 lg:w-1/3 p-4 flex flex-col justify-center 
        my-5 mt-10 bg-opacity-60 hover:bg-opacity-100 rounded-xl shadow-md hover:shadow-lg transform duration-200 ease-in-out">
        <div className='flex flex-col items-center text-blue-900 font-semibold cursor-pointer'>
          <div className='flex flex-row text-sm md:text-lg justify-center'>
            <WalletIcon className="h-5 w-5 lg:h-7 lg:w-7 object-contain mr-1 lg:mr-3" />
            <h4 className='font-semibold'>Connect your wallet</h4>
          </div>
          <p className='text-xs font-semibold'>(wallet compatible with BEP20 token)</p>
        </div>
        <div className={`space-y-3 mt-3 block`}>
          <button
            className='flex items-center space-x-3 border border-gray-200 p-3 rounded-md w-full'
            onClick={signWithMetaMask}
          >
            <img src={metamask} alt="MetaMask" width='30' />
            <h5 className='font-semibold text-sm md:text-md'>Metamask</h5>
          </button>
          <button
            className='flex items-center space-x-3 border border-gray-200 p-3 rounded-md w-full'
            onClick={connectWithWalletConnect}
          >
            <img src={walletconnect} alt="MetaMask" width='30' />
            <h5 className='font-semibold text-sm md:text-md'>WalletConnect</h5>
          </button>
          <button
            className='flex items-center space-x-3 border border-gray-200 p-3 rounded-md w-full'
            onClick={connectWithMyAlgo}
          >
            <img src={myalgo} alt="MetaMask" width='30' />
            <h5 className='font-semibold text-sm md:text-md'>MyAlgo Connect</h5>
          </button>
        </div>
      </div>
    </div>
    <Modal
      isOpen={isModalOpen}
      hideHeader
    >
      <div className='text-center p-3 space-y-3'>
        <img src={connecting} alt="Connecting" className='animate-pulse' />
        <p className="text-xxs text-gray-600"></p>
      </div>
    </Modal>
    </>
  )
}

export default Login
