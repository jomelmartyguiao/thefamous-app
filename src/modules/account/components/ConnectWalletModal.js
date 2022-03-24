import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ethers } from "ethers";
import MyAlgoConnect from '@randlabs/myalgo-connect';

import { IconCirclePlus, IconCloseCirle } from 'modules/common/components/Icons';
import { connectManyWallet, getAuthMessage } from 'modules/auth/apis';
import { getWallets } from 'modules/account/apis';
import { getWalletConnectConnector } from 'modules/common/constants/connector';
import { signWalletConnectTxn } from 'modules/auth/constants/sign-txn';
import metamask from 'images/metamask.svg';
import myalgo from 'images/MyAlgoBlue.svg';
import walletconnect from 'images/walletconnect-logo.svg';
import connecting from 'images/connecting2.png';
import Modal from 'modules/common/components/Modal';


const ConnectWalletModal = ({ label }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const history = useHistory();

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
        address: address,
        wallet: 'metamask',
        message: finalMessage
      };

      await connectManyWallet(payload, () => {
        setIsOpen(false);
        getWallets();
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
  const subscribeToEvents = (connector) => {
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

      // onDisConnect(payload.params[0].message);
    });
  }

  const signMsg = async (payload) => {
    const message = await getAuthMessage();
    const { accounts } = payload.params[0];
    const address = accounts[0];
    const walletType = payload.params[0].peerMeta.name;

    const obj = {
      network: 'algorand',
      message,
      address,
      wallet: 'walletconnect',
      walletType
    }

    await signWalletConnectTxn(obj, (payload) => {
      if (payload) {
        connectManyWallet(payload, () => {
          setIsOpen(false)
          getWallets();
        }) ;
        setIsModalOpen(false);
      } else {
        setIsModalOpen(false);
      }
    })
  }

  return(
    <>
      <span
        onClick={() => setIsOpen(true)} 
        className="text-c-darkgray hover:text-blue-900 font-semibold text-base mt-3 cursor-pointer">
        <IconCirclePlus className="inline-block fill-current mr-1" />{label} Wallet
      </span>
      {isOpen &&
        <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full z-10">
          <div className="bg-white rounded-lg w-full md:w-1/3 border border-gray-100 shadow-2xl p-5">
            <div className="flex flex-row justify-between mb-3">
              <h1 className="text-c-darkgray font-semibold text-base md:text-xl">
                Connect a wallet
              </h1>
              <div onClick={() => setIsOpen(false)}>
                <IconCloseCirle className="inline-block fill-current text-red-600 mt-1 cursor-pointer" />
              </div>
            </div>
            <div
              className='flex flex-row items-center border border-gray-200 p-3 rounded-md w-full mb-2 cursor-pointer'
              onClick={signWithMetaMask}>
                <img src={metamask} alt="MetaMask" width='30' className='mr-2' />
                <h5 className='font-semibold text-sm md:text-md'>Metamask</h5>
            </div>
            <div
              className='flex flex-row items-center border border-gray-200 p-3 rounded-md w-full mb-2 cursor-pointer'
              onClick={connectWithMyAlgo}>
                <img src={myalgo} alt="MetaMask" width='30' className='mr-2' />
                <h5 className='font-semibold text-sm md:text-md'>MyAlgo Connect</h5>
            </div>
            <div
              className='flex flex-row items-center border border-gray-200 p-3 rounded-md w-full mb-2 cursor-pointer'
              onClick={connectWithWalletConnect}>
                <img src={walletconnect} alt="MetaMask" width='30' className='mr-2' />
                <h5 className='font-semibold text-sm md:text-md'>WalletConnect</h5>
            </div>
          </div>
        </div>}
        <Modal
          isOpen={isModalOpen}
          hideHeader
        >
          <div className='text-center p-3 space-y-3'>
            <img src={connecting} alt="Connecting" className='animate-pulse' />
            {/* <div className='flex items-center justify-center space-x-1 w-full'>
              <p className='font-black text-blue-900 text-xs'>CONNECTING</p>
              <div className="animate-pulse inline-flex h-2 w-2 rounded-full bg-blue-900"></div>
              <div className="animate-pulse inline-flex h-2 w-2 rounded-full bg-blue-900"></div>
              <div className="animate-pulse inline-flex h-2 w-2 rounded-full bg-blue-900"></div>
            </div> */}
            {/* <p className="text-xxs text-gray-600"></p> */}
          </div>
        </Modal>
    </>
  );
}
export default ConnectWalletModal;