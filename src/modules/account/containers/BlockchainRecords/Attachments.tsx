import type { BlockchainProps } from 'modules/account/types';

import useAppSelector from 'helpers/useAppSelector';
import { IconFile } from 'modules/common/components/Icons';

const Attachments = () => {
  const blockchainData: BlockchainProps = useAppSelector('account.blockchainData');
  
  return(
    <div className="w-full">
      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-4 
        pt-2 rounded-bl-lg rounded-br-lg h-96 overflow-y-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-3 border-b-2 border-gray-400 text-left leading-4 text-c-darkgray tracking-wider">Document Name</th>
              <th className="py-3 border-b-2 border-gray-400 text-center text-sm leading-4 text-c-darkgray tracking-wider">Category</th>
              <th className="py-3 border-b-2 border-gray-400 text-center text-sm leading-4 text-c-darkgray tracking-wider">Date</th>
              <th className="py-3 border-b-2 border-gray-400 text-center text-sm leading-4 text-c-darkgray tracking-wider">URL</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {blockchainData?.attachments?.length > 0 ? 
            <>
              {blockchainData?.attachments?.map((item, i) => {
                return(
                  <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                    <td className="py-2 whitespace-no-wrap border-b border-gray-300 text-gray-500 text-xs">
                      <p className="mb-1 font-semibold">{item.file_name}</p>
                      <span>{item.description}</span>
                    </td>
                    <td className="py-2 whitespace-no-wrap border-b border-gray-300 text-gray-500 text-xs text-center">
                      {item.type.toUpperCase()}
                    </td>
                    <td className="py-2 whitespace-no-wrap border-b border-gray-300 text-gray-500 text-xs text-center">
                      {item.created_at}
                    </td>
                    <td className="py-2 whitespace-no-wrap border-b border-gray-300 text-c-blue text-xs text-center">
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        <IconFile width="2rem" height="2rem" />
                      </a>
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
export default Attachments;