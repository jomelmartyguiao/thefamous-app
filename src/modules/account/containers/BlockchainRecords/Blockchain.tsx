import type { BlockchainProps } from 'modules/account/types';

import useAppSelector from 'helpers/useAppSelector';

const Blockchain = () => {
  const blockchainData: BlockchainProps = useAppSelector('account.blockchainData');
  
  return(
    <div className="w-full">
      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-4 
        pt-2 rounded-bl-lg rounded-br-lg h-96 overflow-y-auto">
        <table className="min-w-full">
          <tbody className="bg-white">
            {blockchainData?.blockchain?.length > 0 ? 
            <>
              {blockchainData?.blockchain?.map((item, i) => {
                return(
                  <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-100'} w-full`}>
                    {/* <td className="py-2 whitespace-no-wrap border-b border-gray-300 text-gray-500 text-xs">
                      <IconFile width="1em" height="1em" />
                    </td> */}
                    <td className="py-2 whitespace-no-wrap border-b border-gray-300 text-gray-500 text-xs w-1/2">
                      <p className="mb-1">Status: <span className="font-semibold">{item.status}</span></p>
                      <p>Transaction Hash: </p>
                      <p className="font-semibold truncate w-3/4">{item.transaction_hash}</p>
                    </td>
                    <td className="py-2 whitespace-no-wrap border-b border-gray-300 text-gray-500 text-xs w-1/2">
                      <p className="mb-1">Type: <span className="font-semibold">{item.type}</span></p>
                      <p>Time Stamp: <span className="font-semibold">{item.created_at}</span> </p>
                    </td>
                  </tr>
                );
              })}
              {/* {blockchainData?.details?.copyright_type === 'Sub' ? 
                <>
                  {blockchainData?.blockchain?.tokens?.slice(0,1).map((item, i) => {
                    return(
                      <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-100'} w-full`}>
                        <td className="py-2 whitespace-no-wrap border-b border-gray-300 text-gray-500 text-xs w-1/2">
                          <p className="mb-1">
                            # of Sub NFTs: <span className="font-semibold">{blockchainData?.details?.supply}</span>
                          </p>
                        </td>
                        <td className="py-2 whitespace-no-wrap border-b border-gray-300 text-gray-500 text-xs w-1/2">
                          <p className="mb-1">Supply by NFTs: <span className="font-semibold">1</span></p>
                        </td>
                      </tr>
                    );
                  })}
                </>
                : <>
                  {blockchainData?.blockchain?.tokens?.map((item, i) => {
                    return(
                      <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                        <td className="py-2 whitespace-no-wrap border-b border-gray-300 text-gray-500 text-xs">
                          <p className="mb-1">
                            # of NFTs: <span className="font-semibold">{blockchainData?.blockchain?.tokens.length}</span>
                          </p>
                        </td>
                        <td className="py-2 whitespace-no-wrap border-b border-gray-300 text-gray-500 text-xs">
                          <p className="mb-1">Supply by NFTs: <span className="font-semibold">{item.supply}</span></p>
                        </td>
                      </tr>
                    );
                  })}
                </>
              }
              {blockchainData?.blockchain?.signature?.map((item, i) => {
                return(
                  <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                    <td className="py-2 whitespace-no-wrap border-b border-gray-300 text-gray-500 text-xs">
                      <p className="mb-1">Signer: {item?.client}</p>
                      <p>Signature Hash: </p>
                      <p>{item?.signature_hash}</p>
                    </td>
                    <td className="py-2 whitespace-no-wrap border-b border-gray-300 text-gray-500 text-xs">
                      <p className="mb-1">Time Stamp: {item?.attached_at}</p>
                    </td>
                  </tr>
                );
              })}  */}
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
export default Blockchain;