import { useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ethers } from "ethers";
import { toast } from 'react-toastify';

import { WalletIcon, UserIcon, IconMenuNav, IconMenuNavAlt, IconBell } from '../../Icons';
import useAppSelector from 'helpers/useAppSelector';
import { login, getAuthMessage } from 'modules/auth/apis';
import famousLogo from 'images/famousLogo.png';
import { navs } from 'modules/common/constants/navs';
import Sidebar from '../Sidebar';
import BuyModal from '../BuyModal';

const Header = () => {
  const [isHoverStats, setIsHoverStats] = useState(false);
  const [isHoverRewards, setIsHoverRewards] = useState(false);
  const [isHoverTrade, setIsHoverTrade] = useState(false);
  const [notif, setNotif] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const classForBtn = 'text-xxs md:text-xs flex items-center mx-1 lg:mx-1 py-2 rounded-md border px-4 border-blue-900 font-medium hover:bg-blue-900 text-blue-900 hover:text-white shadow-md transform duration-200 ease-in-out';

  const history = useHistory();
  const profile = useAppSelector('common.profile');
  const notificationList = useAppSelector('common.notificationList');

  const signMessage = async () => {
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
  
      return {
        signature,
        wallet: address,
        message: finalMessage
      };
    } catch (err) {
      // setError(err.message);
    }
  };

  const handleSign = async () => {
    const signReturn = await signMessage();
    if (signReturn) {
      login(signReturn, () => {
        history.push("/profile/dashboard")
      });
    }
  };

  // const onChange = (e) => {
  //   const { value } = e.target;
  //   setSearch(value);
  // }

  const handleCopy = () => {
    toast.success('Copied on Clipboard');
  }

  const address = localStorage.getItem('wallet_address');  
  const token = localStorage.getItem('token');
  console.log("LIST: ", notificationList)
  return (
    <>
      <div className='flex justify-between lg:justify-center lg:space-x-60 items-center p-2 bg-white space-x-3 
        shadow-md fixed w-full top-0 left-0 z-30'>
        <div className="brand md:flex md:items-center">
          <NavLink to="/">
              <img src={famousLogo} alt="Logo" className='w-16 md:w-20' />
          </NavLink>
          {/* <InputGroup
            type='text'
            placeholder='Search item'
            value={search}
            onChange={onChange}
            icon={
              <IconSearch 
                className='fill-current h-3 w-3'
              />
            }
            className='hidden md:flex'
            inputClassName='w-72'   
          /> */}
        </div>
        <div className='flex item-center'>
          {
            navs.map(({ key, to, label }) => (
              <>
                {key === "resources" || key === "explore" || key === 'trade' || key === 'buy'?
                <>
                  <div className="dropdown cursor-pointer">
                    <NavLink
                      key={key}
                      to={to} 
                      activeClassName='border-blue-600 text-gray-800 '
                      className="hidden lg:flex text-base text-gray-500 hover:text-gray-800 mx-2 lg:mx-4 font-semibold border-b-2 
                        border-white hover:border-blue-600 py-3 relative"
                    >
                      {label}
                    </NavLink>
                    {key === "resources" ? 
                      <div className="dropdown-content">
                        <Link to="/resources" className="px-3 py-2 text-sm">General</Link>
                        <a  
                          href="https://tutorial.thefamous.xyz" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="px-3 py-2 text-sm">
                            Tutorial
                        </a>
                        <Link 
                          to="/coming-soon"
                          onMouseEnter={() => setIsHoverStats(true)}
                          onMouseLeave={() => setIsHoverStats(false)} 
                          className="px-3 py-2 text-sm">
                            {isHoverStats ? 'Coming Soon' : 'Stats'}
                        </Link>
                      </div>
                    : key === 'trade' ?
                      <div className="dropdown-content">
                        <Link to="/trade" className="px-3 py-2 text-sm">Trading Floor</Link>
                        <a 
                          href="/trade"
                          onMouseEnter={() => setIsHoverTrade(true)}
                          onMouseLeave={() => setIsHoverTrade(false)}
                          className="px-3 py-2 text-sm">
                            {isHoverTrade ? 'Coming soon' : 'Trading OTC'}
                        </a>
                      </div>
                    : key === 'buy' ?
                      <div className="dropdown-content">
                        <Link to="/collection/TF00001" className="px-3 py-2 text-sm">TFFC</Link>
                      </div>
                    : <div className="dropdown-content">
                        <button 
                          onClick={() => setIsModal(true)} 
                          className="px-3 py-2 text-sm hover:bg-blueklein hover:text-white rounded-md">
                          How to Buy
                        </button>
                      </div>
                    }
                  </div>
                  {isModal && <BuyModal close={() => setIsModal(false)} />}
                </>
              :
                <>
                  {key === "rewards" ?
                    <div
                      key={key}
                      onMouseEnter={() => setIsHoverRewards(true)}
                      onMouseLeave={() => setIsHoverRewards(false)}
                      activeClassName='border-blue-600 text-gray-800'
                      className="hidden cursor-pointer lg:flex text-base text-gray-500 hover:text-gray-800 relative
                        font-semibold mx-2 lg:mx-4 border-b-2 border-white hover:border-blue-600 py-3">
                        {isHoverRewards &&<div className="absolute -right-16 -top-3">
                          <div className="relative mx-2">
                            <div className="bg-black text-white text-xs rounded py-1 px-4 right-0 bottom-full">
                              Coming Soon
                              <svg className="absolute text-black h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255">
                                <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
                              </svg>
                            </div>
                          </div>
                        </div>}
                        {label}
                    </div>
                  :
                  <NavLink
                    key={key}
                    to={to} 
                    activeClassName='border-blue-600 text-gray-800 '
                    className="hidden lg:flex text-base text-gray-500 hover:text-gray-800 font-semibold mx-2 lg:mx-4 border-b-2 border-white hover:border-blue-600 py-3"
                  >
                      {label}
                  </NavLink>
                }
              </>
              }
              </>
            ))
          }

          {
            !address && !token ?
            <>
              <button onClick={handleSign} className={classForBtn}>
                Connect Wallet
              </button>
              <Link
                to='/login'
                className={classForBtn}>
                  Login/Signup
              </Link>
            </>
          :
            <>
              {(address && address !== 'null') ?
                <CopyToClipboard options={{message: 'None'}} text={address}> 
                  <div 
                    onClick={handleCopy}
                    className="text-xs md:text-base hover:text-gray-800 mx-2 font-extrabold border-b-2
                    border-white text-blue-900 cursor-pointer flex items-center space-x-1">
                    <div><WalletIcon /></div> <p>{address.substring(0,4) +'...'+ address.substring(address.length - 7)}</p>
                  </div>
                </CopyToClipboard>
              : 
              <Link to="/connect-wallet" className={classForBtn}>
                Connect Wallet
              </Link>}
              <Link
                to="/profile/dashboard" 
                className="text-xs md:text-base font-extrabold hover:bg-blue-900 hover:text-white text-blue-900 
                  transform duration-200 ease-in-out border-l pl-2 lg:px-3 py-2 border-blue-900">
                  <div className='flex flex-row-reverse md:flex-row items-center md:space-x-1'>
                    <div>
                      {profile?.photo ? 
                      <div className="mx-auto w-8 h-8 border-gray-200 rounded-full overflow-hidden relative">
                        <img src={profile?.photo} alt="profile-pic" className="w-full h-full object-cover" />
                      </div>
                      : <UserIcon className="text-xl" />}
                    </div> 
                    <p className='pt-1 pr-2 md:pr-0'>My Account</p>
                  </div>
              </Link>
              <div className="text-xs md:text-base hover:text-gray-600 ml-2 font-extrabold text-blue-900 
                  cursor-pointer flex items-center relative">
                {profile?.notification !== 0 && 
                <span className='px-0.5 bg-red-500 text-xxs rounded-full text-white left-2 top-3 absolute'>
                  1
                </span>}
                <span onClick={() => setNotif(!notif)}><IconBell /></span>
                {notif &&
                  <div className="flex flex-col absolute right-0 top-10 bg-white rounded-lg shadow-xl border p-5 w-72 
                    max-h-100 overflow-y-auto">
                    <h1 className="font-bold text-gray-800 text-left text-base border-b-2 border-gray-100">Notifications</h1>
                    {notificationList.filter(item => item.read === 0).length === 0 ?
                      <div className="flex justify-center items-center w-full py-2">
                        <p className="font-semibold text-gray-400 text-xs">
                          No notifications to display.
                        </p>
                      </div>
                    : <>
                      {notificationList.filter(item => item.read === 0).map((item, i) => {
                        return(
                          <Link 
                            key={i} 
                            to={`/trade/item/${item?.data?.code}`}
                            className={`flex flex-col w-full p-2 ${i === 0 ? '' : 'border-t border-gray-100'} 
                            hover:bg-gray-100`}>
                            <p className="font-bold text-gray-800 text-sm">
                              {item?.type}:<span className="text-gray-500 ml-1 font-semibold">
                                {item?.message} <span className='text-gray-800'>{item?.data?.code}</span>
                              </span>
                            </p>
                            <p className="text-gray-700 font-semibold text-sm">Price: {item?.data?.price} {item?.data?.coin}</p>
                            <p className='text-right text-gray-400 text-xs'>{item.created_at}</p>
                          </Link>
                        );
                      })}
                    </>}
                  </div>}
              </div>
            </>
          }
          <div 
            onClick={() => setIsNavOpen(!isNavOpen)}
            className='hidden md:flex lg:hidden self-center'
            >
            {
              isNavOpen ?
              <div className='ease-in-out duration-300'>
                  <IconMenuNav />
              </div> :
              <div className='ease-in-out duration-300'>
                  <IconMenuNavAlt />
              </div>
            }
          </div>
        </div>
        <div 
          onClick={() => setIsNavOpen(!isNavOpen)}
          className='md:hidden self-center'
          >
          {
            isNavOpen ?
            <div className='ease-in-out duration-300'>
                <IconMenuNav />
            </div> :
            <div className='ease-in-out duration-300'>
                <IconMenuNavAlt />
            </div>
          }
        </div>
      </div>
      <Sidebar 
        isNavOpen={isNavOpen}
        setIsNavOpen={setIsNavOpen}
        setIsModal={setIsModal}
      />
    </>
  );
};
export default Header;
