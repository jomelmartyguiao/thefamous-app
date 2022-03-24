import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getItems } from '../apis';
import type { ItemProps } from 'modules/account/types';
import useAppSelector from 'helpers/useAppSelector';
import { IconArrowBack, IconCirclePlus, IconCircleInfo } from 'modules/common/components/Icons';

const Collection = () => {
  const params: any = useParams();

  useEffect(() => {
    getItems(params.code)
    // eslint-disable-next-line
  }, [])

  const itemList: Array<ItemProps> = useAppSelector('account.itemList');
  const address = localStorage.getItem('wallet_address');
  return(
    <>
      <div className="w-full md:w-3/4 flex flex-col border rounded-md p-5 relative shadow-md">        
        <div className="flex flex-row">
          <Link to="/profile/mynfts" className="text-base my-auto"><IconArrowBack /></Link> 
          <h1 className="text-c-darkgray font-semibold text-sm md:text-2xl ml-2 w-1/2">
            My Collection
          </h1>
          <Link 
            to={`/profile/my-collections/${params.code}/add-item`}
            className="text-c-darkgray hover:text-blue-900 font-semibold text-xs md:text-xl text-right w-1/2 cursor-pointer">
            <IconCirclePlus /> Add Item
          </Link>
        </div>
        {itemList.length === 0 ?
          <h1 className="text-c-darkgray italic text-xl w-full text-center py-10">
            <IconCircleInfo /> No NFTs to display.
          </h1>
        : <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-5 p-5">
            {itemList.map((item, i) => (
              <Link key={i} to={`/profile/my-item/?collectionCode=${params.code}&itemCode=${item.code}`}>
                <div className="flex flex-col space-y-2 border rounded-md hover:shadow-lg transform duration-200 ease-in-out">
                  <img 
                    src={item.image} 
                    alt="Collection" 
                    className="bg-gray-400 object-cover h-auto w-full border-b-2 shadow-lg border-gray-100"
                  />
                  <div className="flex flex-col px-3 pb-3">
                    <h1 className="font-semibold text-center text-lg">{item.name}</h1>
                    <h1 className="font-semibold text-gray-500 text-sm text-center mb-3">#{item?.series}</h1>
                    <div className="flex justify-between">
                      <h1 className="text-xxs text-gray-500">Contract Address:</h1>
                      <h1 className="text-xxs text-blue-500">
                        <a href="https://algoexplorer.io/assets" rel="noreferrer" target="_blank">
                          {(address || '').substring(0,4) +'...'+ (address || '').substring((address || '').length - 7)}
                        </a>
                      </h1>
                    </div>
                    <div className="flex justify-between">
                      <h1 className="text-xxs text-gray-500">Token ID:</h1>
                      <h1 className="text-xxs text-gray-500">{item?.series}</h1>
                    </div>
                    <div className="flex justify-between">
                      <h1 className="text-xxs text-gray-500">Token Standard:</h1>
                      <h1 className="text-xxs text-gray-500">ASA (Algorand Standard Asset)</h1>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {(item?.properties || []).map((itemData, i) => {
                        return(
                          <div key={i} className="border border-blue-200 bg-blue-50 rounded-md p-1 text-center">
                            <span className='text-xxs font-medium'>{itemData.label}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>}
      </div>
    </>
  )
}
export default Collection;