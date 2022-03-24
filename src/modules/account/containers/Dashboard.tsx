import { SyntheticEvent, useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import { CopyToClipboard } from 'react-copy-to-clipboard';

import type { ProfileProps } from 'modules/common/types';
import type { DashboardProps } from 'modules/account/types';
import useAppSelector from 'helpers/useAppSelector';
import { getActivityList, getDashboardData } from '../apis';
import { getProfile } from 'modules/common/apis';
import { 
  ArtIcon, 
  IconPriceTag,
  IconTrade, 
  LockIcon,
  IconSale,
  IconCart,
  IconShakeHands,
 } from "modules/common/components/Icons"
import { verifyEmail, verifyCode } from '../apis';
import pandaWhite from 'images/panda-white.png';

const initialState = {
  email: '',
  password: '',
  password_confirmation: '',
  code: '',
  username: '',
}

const Dashboard = () => {
  const [state, setState] = useState(initialState);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);

  const profile: ProfileProps = useAppSelector('common.profile');
  const dashboardData: DashboardProps = useAppSelector('account.dashboardData');
  // const activityList: Array<ActivityProps> = useAppSelector('account.activityList');

  useEffect(() => {
    getDashboardData();
    getActivityList();
  }, [])

  const handleChange = (e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setState({
      ...state,
      [name]: value,
    })
  }

  const handleSubmit = () => {
    verifyEmail(state, () => {
      setIsOpen(true)
      setIsOpenForm(false);
      }
    );
  }

  const handleVerify = () => {
    verifyCode({code: state.code}, () => {
      setIsOpen(false);
      getProfile()
    });
  }

  // const handleCopy = () => {
  //   toast.success('Copied on Clipboard');
  // }
  
  return(
    <>
      <div className="w-full lg:w-3/4 flex flex-col border rounded-md p-5 relative shadow-md">
        {+profile?.verified !== 1 &&
          <div className="w-full h-auto bg-blue-500 rounded-md mb-4 shadow-lg py-5 px-8 mx-auto">
            <p className="text-white font-semibold text-base md:text-xl">
              Let's complete setting up your account.
            </p>
            <button 
              type="button"
              onClick={profile?.email ? () => setIsOpen(true) : () => setIsOpenForm(true)}
              className="bg-blue-900 text-white font-medium py-2 px-8 rounded mt-2">
                {profile?.email ? 'Verify email' : 'Set up email and password'}
            </button> 
          </div>}
        <div className="w-full md:hidden md:w-1/3 gap-4 grid grid-rows-2 my-3 md:mt-0">
          <div className="border rounded-md shadow-md p-4 flex justify-between space-x-2 items-center">
            <h1 className="text-lg text-c-darkgray font-semibold">
              {dashboardData?.created_items || 0} NFTs Created
            </h1>
            <ArtIcon className="h-14 w-14 text-c-darkgray" />
          </div>
          <div className="border rounded-md shadow-md p-4 flex justify-between space-x-2 items-center">
            <h1 className="text-lg group-hover:text-white text-c-darkgray font-semibold">
              {dashboardData?.bought_items || 0} NFTs Bought
            </h1>
            <LockIcon className="h-14 w-14 text-c-darkgray" />
          </div>
        </div>
        <h1 className="text-c-darkgray font-semibold text-2xl hidden md:flex">Wallet</h1>
        <div className="flex flex-col md:flex-row lg:flex-col space-y-8 mt-4">
          {profile?.profile_type === 'Artist' &&
          <div className="w-full hidden md:flex md:flex-row md:space-x-4 mt-3 md:mt-0">
            <div className="border rounded-md md:w-1/2 shadow-md p-4 flex justify-between space-x-1 items-center">
              <h1 className="text-xl md:text-xl text-c-darkgray font-semibold">
                NFTs Created
              </h1>
              <span className='text-2xl text-blue-900 font-semibold'>{dashboardData?.created_items || '-'}</span>
              <img alt="panda" src={pandaWhite} className="w-10 h-10 bg-black rounded-md" />
            </div>
            <div className="border rounded-md md:w-1/2 shadow-md p-4 flex justify-between space-x-1 items-center">
              <h1 className="text-xl md:text-xl group-hover:text-white text-c-darkgray font-semibold">
                NFTs Sold
              </h1>
              <span className='text-2xl text-blue-900 font-semibold'>{dashboardData?.created_items || '-'}</span>
              <IconPriceTag className="h-14 w-14 text-c-darkgray" />
            </div>
          </div>}
          <div className="w-full hidden md:flex md:flex-row md:space-x-4 mt-3 md:mt-0">
            <div className="border rounded-md md:w-1/2 shadow-md p-4 flex justify-between space-x-1 items-center">
              <h1 className="text-xl md:text-xl text-c-darkgray font-semibold">
                NFTs Bought
              </h1>
              <span className='text-2xl text-blue-900 font-semibold'>{dashboardData?.created_items || '-'}</span>
              <IconCart className="h-12 w-12 text-c-darkgray" />
            </div>
            <div className="border rounded-md md:w-1/2 shadow-md p-4 flex justify-between space-x-1 items-center">
              <h1 className="text-xl md:text-xl group-hover:text-white text-c-darkgray font-semibold">
                NFTs Received
              </h1>
              <span className='text-2xl text-blue-900 font-semibold'>{dashboardData?.created_items || '-'}</span>
              <IconTrade className="h-14 w-14 text-c-darkgray" />
            </div>
          </div>
          <div className="w-full hidden md:flex md:flex-row md:space-x-4 mt-3 md:mt-0">
            <div className="border rounded-md md:w-1/2 shadow-md p-4 flex justify-between space-x-1 items-center">
              <h1 className="text-xl md:text-xl text-c-darkgray font-semibold">
                NFTs for sale
              </h1>
              <span className='text-2xl text-blue-900 font-semibold'>{dashboardData?.created_items || '-'}</span>
              <IconSale className="h-14 w-14 text-c-darkgray" />
            </div>
            <div className="border rounded-md md:w-1/2 shadow-md p-4 flex justify-between space-x-1 items-center">
              <h1 className="text-xl md:text-xl text-c-darkgray font-semibold">
                NFTs Traded
              </h1>
              <span className='text-2xl text-blue-900 font-semibold'>{dashboardData?.created_items || '-'}</span>
              <IconShakeHands className="h-14 w-14 text-c-darkgray" />
            </div>
          </div>
          <div className="w-full hidden md:flex md:flex-row md:space-x-4 mt-3 md:mt-0">
            <div className="border rounded-md md:w-1/2 shadow-md p-4 flex justify-between space-x-1 items-center">
              <h1 className="text-xl md:text-xl group-hover:text-white text-c-darkgray font-semibold">
                Balance
              </h1>
              <span className='text-2xl font-semibold'>USD 0</span>
            </div>
            <div className="border rounded-md md:w-1/2 shadow-md p-4 flex justify-between space-x-1 items-center">
              <h1 className="text-xl md:text-xl group-hover:text-white text-c-darkgray font-semibold">
                Profits
              </h1>
              <span className='text-2xl font-semibold'>USD 0</span>
            </div>
          </div>
        </div>
      </div>
      {isOpenForm &&
        <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full z-10">
          <div className="bg-white rounded-lg w-full md:w-1/2 lg:w-1/3 border border-gray-100 shadow-2xl p-5">
            <div className="flex items-center w-full">
              <p className="text-gray-900 font-medium text-lg text-center">Setup your email and password.</p> 
              <svg 
                onClick={() => setIsOpenForm(false)}
                className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 18 18">
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
              </svg>
            </div>
            <div className="flex flex-col space-y-2 mt-4">
              <input 
                type="text" 
                name="username"
                placeholder="User Name" 
                className="p-2 border border-gray-300 rounded-md text-sm w-full"
                onChange={handleChange} />
              <input 
                type="email" 
                name="email"
                placeholder="Email Address" 
                className="p-2 border border-gray-300 rounded-md text-sm w-full"
                onChange={handleChange} />
              <input 
                type="password" 
                name="password"
                placeholder="Password" 
                className="p-2 border border-gray-300 rounded-md text-sm w-full"
                onChange={handleChange} />
              <input 
                type="password" 
                name="password_confirmation"
                placeholder="Confirm Password" 
                className="p-2 border border-gray-300 rounded-md text-sm w-full"
                onChange={handleChange} />
            </div>
            <button 
              type="button"
              onClick={handleSubmit}
              className="bg-blue-900 text-white font-semibold py-2 px-4 rounded float-right mt-3 ml-3">
                Submit
            </button>
          </div>
        </div>}
      {isOpen &&
        <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full z-10">
          <div className="bg-white rounded-lg w-full md:w-1/2 lg:w-1/3 border border-gray-100 shadow-2xl p-5">
            <p className="text-gray-900 font-medium text-lg text-center">Verify your email</p>
            <p className="text-gray-900 font-medium text-md text-center">We have send you a verification code.</p>
            <p className="text-gray-900 font-medium text-md text-center">Please verify your email before you can use it to log in.</p>
            <div className='flex flex-row mt-3'>
              <input 
                type="text" 
                name="code"
                placeholder="Code"
                className="p-2 border border-gray-300 rounded-md text-sm w-full"
                onChange={handleChange} />
              <button 
                type="button"
                onClick={handleVerify}
                className="bg-blue-900 text-white font-semibold py-2 px-4 rounded float-right ml-3">
                Confirm
              </button>
            </div>
          </div>
        </div>}
    </>
  );
}
export default Dashboard