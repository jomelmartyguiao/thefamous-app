import type { BlockchainProps } from 'modules/account/types';

import useAppSelector from 'helpers/useAppSelector';

const Notice = () => {
  const blockchainData: BlockchainProps = useAppSelector('account.blockchainData');
  
  return(
    <div className="w-full py-12 px-12">
      <p className="text-gray-500 text-sm font-semibold mb-3">NOTICE</p>
      <p className="text-gray-500 text-sm">{blockchainData?.notice}</p>
      <p className="text-gray-500 text-sm mb-3">{blockchainData?.statement}</p>
      <button
          className="bg-c-blue p-2 w-1/4 transform transition hover:scale-105 duration-300 ease-in-out font-medium 
            text-white text-xs rounded-md"
          type="button">
            Copy
        </button>
    </div>
  )
}
export default Notice;