import { useEffect } from 'react';
import { toast } from 'react-toastify'
import { CopyToClipboard } from 'react-copy-to-clipboard';

import useAppSelector from 'helpers/useAppSelector';
import type { WalletProps } from 'modules/account/types';
import { getWallets } from 'modules/account/apis';
import { CopyIcon } from 'modules/common/components/Icons';
import ConnectWalletModal from 'modules/account/components/ConnectWalletModal';
import metamask from 'images/metamask.svg';
import myalgo from 'images/MyAlgoBlue.svg';

const Wallet = () => {
  const walletList: Array<WalletProps> = useAppSelector('account.walletList');

  useEffect(() => {
    getWallets();
  }, [])

  const handleCopy = () => {
    toast.success('Copied on Clipboard');
  }

  return(
    <>
      <h1 className="text-c-darkgray font-semibold text-base md:text-2xl">
        My Wallets
      </h1>
      <div className="flex flex-row justify-between">
        <h1 className="text-c-darkgray font-semibold text-base md:text-lg">
          Primary Wallet
        </h1>
        {walletList.filter(itemFilter => +itemFilter.primary === 1).length !== 1 &&
        <ConnectWalletModal label="Connect" />}
      </div>
      <div className="w-full flex flex-col my-3 space-y-4">
        {walletList.filter(itemFilter => +itemFilter.primary === 1).map((item, i) => {
          return(
            <div key={i} className="border rounded-md shadow-md p-4 flex justify-between space-x-2 items-center">
              <img src={item?.network === 'algo' ? myalgo : metamask} alt="icon" width='50' />
              <h1 className="text-c-darkgray font-semibold">
                <CopyToClipboard options={{message: 'None'}} text={item?.address || ''}> 
                  <div 
                    onClick={handleCopy}
                    className="text-xs md:text-base hover:text-gray-800 font-extrabold border-b-2
                    border-white text-blue-900 cursor-pointer flex flex-row items-center space-x-1">
                    <p>{(item?.address || '').substring(0,6) +'...'+ (item?.address || '').substring((item?.address || '').length - 7)}</p><div><CopyIcon /></div> 
                  </div>
                </CopyToClipboard>
                <p className='text-xs text-center'>({item?.type})</p>
              </h1>
            </div>
          )
        })}
      </div>
      <div className="flex flex-row justify-between">
        <h1 className="text-c-darkgray font-semibold text-base md:text-lg">
          Secondary Wallets
        </h1>
        {walletList.filter(itemFilter => +itemFilter.primary !== 1).length !== 2 &&
        <ConnectWalletModal label="Add" />}
      </div>
      <div className="w-full flex flex-col my-3 space-y-4">
        {walletList.filter(itemFilter => +itemFilter.primary !== 1).map((item, i) => {
          return(
            <div key={i} className="border rounded-md shadow-md p-4 flex justify-between space-x-2 items-center">
              <img src={item?.network === 'algo' ? myalgo : metamask} alt="icon" width='50' />
              <h1 className="text-c-darkgray font-semibold">
                <CopyToClipboard options={{message: 'None'}} text={item?.address || ''}> 
                  <div 
                    onClick={handleCopy}
                    className="text-xs md:text-base hover:text-gray-800 font-extrabold border-b-2
                    border-white text-blue-900 cursor-pointer flex flex-row items-center space-x-1">
                    <p>{(item?.address || '').substring(0,6) +'...'+ (item?.address || '').substring((item?.address || '').length - 7)}</p><div><CopyIcon /></div> 
                  </div>
                </CopyToClipboard>
              </h1>
            </div>
          )
        })}
      </div>
    </>
  );
}
export default Wallet;