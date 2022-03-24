import { useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { QRCode } from 'react-qrcode-logo';
import { toast } from 'react-toastify'

import Modal from 'modules/common/components/Modal';
import { IconCloseCirle, CopyIcon } from 'modules/common/components/Icons'
// import type { BillingProps } from 'modules/account/types';
// import useAppSelector from 'helpers/useAppSelector';
import { getDepositWallet } from "modules/account/apis";
import bnb from 'images/bnblogo.png';
import algo from 'images/algorand-logo.png';
import matic from 'images/polygon-logo.png';

const Billing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('');
  const [hover, setHover] = useState(false);
  const [address, setAddress] = useState('');

  // const billingData: Array<BillingProps> = useAppSelector('account.billingData');

  // useEffect(() => {
  //   getBilling();
    // eslint-disable-next-line
  // }, [])

  const handleOpenModal = (network: string) => {
    getDepositWallet(network, (res) => {
      setAddress(res.address)
      setIsOpen(true)
    })
  }

  const handleActive = (name: string) => {
    setHover(!hover)
    setActive(name)
  }

  const handleCopy = () => {
    toast.success('Copied on Clipboard');
  }
  
  return(
    <>
      <h1 className="text-c-darkgray font-semibold text-base md:text-2xl mb-3">
        Billing
      </h1>
      <div className="flex flex-row space-x-4 justify-center bg-blue-200 p-5">
        <div className='w-2/12 flex flex-col space-y-2'>
          <div className='bg-yellow-200 w-full h-20 rounded-md p-3 flex flex-col text-center'>
            <span>Earned</span>
            <span className='text-lg font-semibold'>$0</span>
          </div>
          <div className='bg-gray-200 w-full h-20 rounded-md p-3 flex flex-col text-center'>
            <span>Spent</span>
            <span className='text-lg font-semibold'>$0</span>
          </div>
        </div>
          <div className='border border-gray-100 p-3 w-4/12 rounded-md bg-white'>
            <span className='text-lg font-semibold'>Binance (BNB)</span>
            <div className='flex flex-row mt-4'>
              <div className='w-1/2 flex flex-row'>
                <img src={bnb} alt="bnb" className="h-8 object-contain mr-3" />
                <span className="text-xl font-semibold">0</span>
              </div>
              <div className='w-1/2 flex flex-col'>
                <span className='text-sm font-light'>Last updated:</span>
                <span className='text-sm font-light'>02.23.22</span>
                <span className='text-sm font-light'>15:00(GMT)</span>
              </div>
            </div>
            <div className='flex flex-row space-x-2 mt-8'>
              <button 
                type="button"
                onClick={() => handleOpenModal('BSC')}
                className="bg-yellow-300 text-gray-700 font-semibold py-2 px-4 rounded w-1/2 text-sm">
                  Deposit
              </button>
              <button 
                type="button"
                onMouseEnter={() => handleActive('bnb')}
                onMouseLeave={() => handleActive('')}
                className={`bg-blue-900 text-white font-semibold py-2 px-4 rounded w-1/2 ${active === 'bnb' && hover ? 'text-xxs' : 'text-sm'}`}>
                  {active === 'bnb' && hover ? 'Coming Soon' : 'Withdraw'}
              </button>
            </div>
          </div>
          <div className='border border-gray-100 p-3 w-4/12 rounded-md bg-white'>
            <span className='text-lg font-semibold'>Algorand (ALGO)</span>
            <div className='flex flex-row mt-4'>
              <div className='w-1/2 flex flex-row'>
                <img src={algo} alt="algorand" className="h-8 object-contain mr-3" /> 
                <span className="text-xl font-semibold">0</span>
              </div>
              <div className='w-1/2 flex flex-col'>
                <span className='text-sm font-light'>Last updated:</span>
                <span className='text-sm font-light'>02.23.22</span>
                <span className='text-sm font-light'>15:00(GMT)</span>
              </div>
            </div>
            <div className='flex flex-row space-x-2 mt-8'>
              <button 
                type="button"
                onClick={() => handleOpenModal('ALGO')}
                className="bg-yellow-300 text-gray-700 font-semibold py-2 px-4 rounded w-1/2 text-sm">
                  Deposit
              </button>
              <button 
                type="button"
                onMouseEnter={() => handleActive('algo')}
                onMouseLeave={() => handleActive('')}
                className={`bg-blue-900 text-white font-semibold py-2 px-4 rounded w-1/2 ${active === 'algo' && hover ? 'text-xxs' : 'text-sm'}`}>
                {active === 'algo' && hover ? 'Coming Soon' : 'Withdraw'}
              </button>
            </div>
          </div>
          <div className='border border-gray-100 p-3 w-4/12 rounded-md bg-white'>
            <span className='text-lg font-semibold'>Polygon (MATIC)</span>
            <div className='flex flex-row mt-4'>
              <div className='w-1/2 flex flex-row'>
                <img src={matic} alt="matic" className="h-8 object-contain mr-3" />
                <span className="text-xl font-semibold">0</span>
              </div>
              <div className='w-1/2 flex flex-col'>
                <span className='text-sm font-light'>Last updated:</span>
                <span className='text-sm font-light'>02.23.22</span>
                <span className='text-sm font-light'>15:00(GMT)</span>
              </div>
            </div>
            <div className='flex flex-row space-x-2 mt-8'>
              <button 
                type="button"
                onClick={() => handleOpenModal('MATIC')}
                className="bg-yellow-300 text-gray-700 font-semibold py-2 px-4 rounded w-1/2 text-sm">
                  Deposit
              </button>
              <button 
                type="button"
                onMouseEnter={() => handleActive('matic')}
                onMouseLeave={() => handleActive('')}
                className={`bg-blue-900 text-white font-semibold py-2 px-4 rounded w-1/2 ${active === 'matic' && hover ? 'text-xxs' : 'text-sm'}`}>
                  {active === 'matic' && hover ? 'Coming Soon' : 'Withdraw'}
              </button>
            </div>
          </div>
      </div>
      <div className='mt-3'>
        <h1 className="text-c-darkgray font-semibold text-base md:text-lg mb-3">
          Transactions
        </h1>
        <table className='w-full'>
          <thead className='bg-blue-900'>
            <tr>
              <th className="py-3 px-3 text-white text-left leading-4 tracking-wider">Description</th>
              <th className="py-3 px-3 text-white text-center text-sm leading-4 tracking-wider">Details</th>
              <th className="py-3 px-3 text-white text-center text-sm leading-4 tracking-wider">Currency</th>
              <th className="py-3 px-3 text-white text-center text-sm leading-4 tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="font-medium text-base text-center">No Data Found.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Modal isOpen={isOpen} hideHeader>
        <div className='flex'>
          <span className='ml-auto cursor-pointer' onClick={() => setIsOpen(false)}>
            <IconCloseCirle />
          </span>
        </div>
        <p className="text-gray-900 font-semibold text-xl pb-3 text-center border-b border-gray-100 -mt-5">
          Deposit Crypto
        </p>
        <div className='justify-between py-5 border-b border-gray-100'>
          <p className="text-gray-900 font-semibold text-lg pb-1">
            Address: 
          </p>
          <CopyToClipboard options={{message: 'None'}} text={address || ''}> 
            <div 
              onClick={handleCopy}
              className="text-base hover:text-gray-800 font-extrabold border-b-2
              border-white text-blue-900 cursor-pointer flex flex-row items-center space-x-1">
              <p>{(address || '').substring(0,25) +'...'+ (address || '').substring((address || '').length - 5)}</p>
              <div><CopyIcon /></div> 
            </div>
          </CopyToClipboard>
          <div className="flex w-full">
            <div className="mx-auto">
              <QRCode 
                logoWidth={50}
                size={170}
                logoImage="https://ucarecdn.com/30bc3a89-8a72-42cf-94e0-f7b163af02a0/"
                value={address} />
            </div>
          </div>
        </div>
        {/* <p className="text-gray-900 font-semibold text-sm text-center pt-4 pb-1">
          To complete your listing follow these steps:
        </p> */}
      </Modal>
    </>
  );
}
export default Billing;