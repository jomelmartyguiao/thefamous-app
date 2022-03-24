import type { BlockchainProps } from 'modules/account/types';

import useAppSelector from 'helpers/useAppSelector';
import { IconUserCircle } from 'modules/common/components/Icons';

const Ownership = () => {
  const blockchainData: BlockchainProps = useAppSelector('account.blockchainData');
  return(
    <div className="w-full">
      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-4 
        pt-2 rounded-bl-lg rounded-br-lg h-96 overflow-y-auto">
        <table className="min-w-full">
          <tbody className="bg-white">
            {blockchainData?.ownerships?.length > 0 ? 
            <>
              {blockchainData?.ownerships?.map((item, i) => {
                return(
                  <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                    <td className="py-2 whitespace-no-wrap border-b border-gray-300 text-gray-500 text-xs text-center">
                      <IconUserCircle width="3em" height="3em" />
                    </td>
                    <td className="py-2 whitespace-no-wrap border-b border-gray-300 text-gray-500 text-xs">
                      <p className="mb-1">User Name:</p>
                      <p className="mb-1">Email:</p>
                      <p className="mb-1">Wallet:</p>
                      <p className="mb-1">Created Date</p>
                    </td>
                    <td className="py-2 whitespace-no-wrap border-b border-gray-300 text-gray-500 text-xs">
                      <p className="mb-1 font-semibold">{item?.username || ''}</p>
                      <p className="mb-1 font-semibold">{item?.email || ''}</p>
                      <p className="mb-1 font-semibold">{item?.wallet.substring(0,4) +'...'+ item?.wallet.substring(item?.wallet.length - 7)}</p>
                      <p className="mb-1 font-semibold">{item?.created_at}</p>
                    </td>
                  </tr>
                );
              })}
            </>
            :
              <tr>
                <td 
                  className="py-2 text-center whitespace-no-wrap border-b border-gray-300 text-gray-500 text-sm" 
                  colSpan={6}>
                  No data to display.
                </td> 
              </tr>
            }
          </tbody>
        </table>
      </div>  
    </div>
  )
}
export default Ownership;