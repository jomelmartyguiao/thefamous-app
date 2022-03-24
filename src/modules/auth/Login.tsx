import { SyntheticEvent, useState } from 'react';
import { ethers } from "ethers";
import { useHistory, Link } from 'react-router-dom';
import WalletConnect from "@walletconnect/client";

import { IInternalEvent } from "@walletconnect/types";
import MyAlgoConnect from '@randlabs/myalgo-connect';

// import { getWalletConnectProvider } from "modules/auth/constants/provider";
// import { convertUtf8ToHex } from "@walletconnect/utils";
import { Input } from "modules/account/components/FormComponents";
import { login, loginEmail, logout, getAuthMessage, loginMyAlgo, verifyCode} from 'modules/auth/apis';
import { UserIcon, WalletIcon } from 'modules/common/components/Icons';
import metamask from 'images/metamask.svg';
import myalgo from 'images/MyAlgoBlue.svg';
import connecting from 'images/connecting2.png';
import walletconnect from 'images/walletconnect-logo.svg';
import toastMessage from 'helpers/toastMessage';
import { getWalletConnectConnector } from '../common/constants/connector';
import { signWalletConnectTxn } from './constants/sign-txn';
import { SignWCTxnProps } from './types';
import Modal from 'modules/common/components/Modal';

const initialState = {
  email: '',
  password: '',
  code: '',
}

declare let window: any;

const Login = () => {
  const [isShowWallet, setIsShowWallet] = useState<boolean>(false);
  const [isShowLogin, setIsShowLogin] = useState<boolean>(false);
  const [state, setState] = useState(initialState);
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [key, setKey] = useState('');
  
  const getFinalMessage = (address: string, message: string) => {
    return `
      Welcome to The Famous community!
      
      Click to Authorize and accept 'The Famous' Terms of Service: https://thefamous.xyz/tos
      
      Note: This request will not trigger a blockchain transaction or cost any fees.
      
      Your authentication status will reset after 24 hours.
      
      Wallet address:
      ${address}
      
      Nonce:
      ${message}`;
  } 

  const signWithMetaMask = async () => {
    const message = await getAuthMessage();
    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const finalMessage = getFinalMessage(address, message);
      const signature = await signer.signMessage(finalMessage);
  
      const payload = {
        signature,
        wallet: address,
        message: finalMessage
      };

      await login(payload, () => {
        history.push("/profile/dashboard")
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

    // window.onbeforeunload = () => {
    //   return "Data will be lost if you leave the page, are you sure?";
    // };

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

  // const killSession = async (connector: WalletConnect) => {
  //   if (connector) {
  //     connector.killSession();
  //   }
  // };

  const onDisConnect = (message: string) => {
    logout({}, (res) => {
      console.log("logout: " + message)
      toastMessage({ message });
      setIsModalOpen(false);
      history.push("/login");
    })
  }

  const signMsg = async (payload: IInternalEvent) => {
    const message = await getAuthMessage();
    const { accounts } = payload.params[0];
    const address = accounts[0];
    const walletType = payload.params[0].peerMeta.name;
    const finalMessage = getFinalMessage(address, message);

    const obj: SignWCTxnProps = {
      message: finalMessage,
      address,
      walletType
    }

    await signWalletConnectTxn(obj, (payload, network) => {
      console.log(network)
      if (payload) {
        network === "algorand" ?
          loginMyAlgo(payload, () => history.push("/profile/dashboard")) :
          login(payload, () => history.push("/profile/dashboard"));
        
        setIsModalOpen(false);
      } else {
        setIsModalOpen(false);
      }
    })
  }

  const handleChange = (e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setState({
      ...state,
      [name]: value,
    })
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    loginEmail(state, (res) => {
      if(+res?.data.two_factor_auth === 1){
        setIsOpen(true)
        setKey(res?.data?.key)
      }else{
        localStorage.setItem('token', res?.data?.token);
        localStorage.setItem('wallet_address', res?.data?.user?.wallet);
        history.push("/profile/dashboard")
      }
    });
  };

  const handleVerify = () => {
    let obj = {
      key: key,
      token: state.code
    }
    verifyCode(obj, () => {
      history.push("/profile/dashboard")
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
        <div
          className='flex flex-col items-center text-blue-900 font-semibold cursor-pointer'
          onClick={() => {setIsShowWallet(!isShowWallet); setIsShowLogin(false);}}
        >
          <div className='flex flex-row text-sm md:text-lg justify-center'>
            <WalletIcon className="h-5 w-5 lg:h-7 lg:w-7 object-contain mr-1 lg:mr-3" />
            <h4 className='font-semibold'>Log in with your wallet</h4>
          </div>
          <p className='text-xs font-semibold'>(wallet compatible with BEP20 token)</p>
        </div>

        <div className={`space-y-3 mt-3 ${isShowWallet ? 'block' : 'hidden'}`}>
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
      <div className="border border-gray-200 bg-white w-10/12 md:w-1/2 lg:w-1/3 p-4 flex flex-col justify-center bg-opacity-60 
        hover:bg-opacity-100 rounded-xl shadow-md hover:shadow-lg transform duration-200 ease-in-out">
        <div 
          className='flex flex-row text-sm md:text-lg justify-center text-blue-900 cursor-pointer'
          onClick={() => {setIsShowLogin(!isShowLogin); setIsShowWallet(false);}}
        >
          <UserIcon className=" h-5 w-5 lg:h-7 lg:w-7 object-contain mr-1 lg:mr-3"/>
          <h4 className='font-semibold'>Log in with Email and Password</h4>
        </div>
        <div className={`space-y-3 mt-3 ${isShowLogin ? 'block' : 'hidden'}`}>
          <form onSubmit={handleSubmit}>
            <h1 className="text-blue-900 text-sm lg:text-lg font-semibold text-left pt-3">
              Email
            </h1>
            <input type="email" name="email" placeholder="Please input your email"
              className="p-2 border border-gray-200 rounded-md w-full focus:border-gray-500 focus:outline-none opacity-70"
              onChange={handleChange} />
            <h1 className="text-blue-900 text-sm lg:text-lg font-semibold text-left pt-3">
              Password
            </h1>
            <input type="password" name="password" placeholder="Please input your password"
              className="p-2 border border-gray-200 rounded-md w-full focus:border-gray-500 focus:outline-none opacity-70"
              onChange={handleChange} />
            <div className="flex justify-between mt-4 mb-2">
              <div className="flex items-center space-x-1">
                <input type="checkbox" />
                <h1 className="text-xxs lg:text-sm font-medium text-blue-900">Remember Password</h1>
              </div>
              <h1 className="text-xxs lg:text-sm font-medium hover:underline text-blue-900">Forgot Password?</h1>
            </div>
            <button 
              type="submit"
              className="p-2 border border-blue-900 text-blue-900 rounded-md hover:bg-blue-900 hover:text-white w-full">
              Log in
            </button>
          </form>
          <h1 className="text-sm text-center font-medium text-blue-900">
            <span className="hover:underline">Terms of use</span> - <span className="hover:underline">Privacy Policy</span>
          </h1>
        </div>
      </div>
      <div className='flex flex-row text-sm md:text-lg justify-center text-blue-900 mt-3'>
        <h4 className='font-semibold'>Not yet a Famous member? Please <Link to="/signup" className="underline">sign up</Link> now</h4>
      </div>
    </div>
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
    <Modal
      isOpen={isOpen}
      hideHeader
    >
      <p className="text-gray-900 font-medium text-xl text-center">Verify 2FA Authentication</p>
      <p className="text-gray-900 font-medium text-md text-center">Enter Google 2FA Code to verify log in</p>
      <div className='flex flex-col space-y-4 mt-5'>
        <Input
          type="code"
          name="code"
          label="Code"
          value={state.code}
          handleChange={handleChange} />
        <div className='flex flex-row space-x-2'>
          <button 
            type="button"
            onClick={() => setIsOpen(false)}
            className="bg-gray-500 text-white text-sm font-semibold py-2 px-4 rounded w-1/2">
            Cancel
          </button>
          <button 
            type="button"
            onClick={handleVerify}
            className="bg-blue-900 text-white text-sm font-semibold py-2 px-4 rounded w-1/2">
            Confirm
          </button>
        </div>  
      </div>
    </Modal>
    </>
  )
}

export default Login
