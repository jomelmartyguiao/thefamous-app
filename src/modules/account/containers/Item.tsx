import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { getCollectionItemData, getBoughtItemData } from '../apis';
import type { ItemProps } from 'modules/account/types';
import useAppSelector from 'helpers/useAppSelector';
import stringToObject from 'helpers/stringToObject';
import { IconArrowBack } from 'modules/common/components/Icons';

const Item = () => {
  const location = useLocation();
  const searchParams: any = stringToObject(location.search)

  useEffect(() => {
    if(searchParams?.collectionCode){
      getCollectionItemData(searchParams?.collectionCode, searchParams.itemCode)
    }else{
      getBoughtItemData(searchParams.itemCode)
    }
  }, [searchParams])

  const itemData: ItemProps = useAppSelector('account.itemData');
  return(
    <div className="w-full lg:w-3/4 flex flex-col border rounded-md p-5 relative shadow-md">
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="w-full md:w-1/3 flex flex-col space-y-2">
          <div className='flex flex-row'>
            <Link 
              to={searchParams?.collectionCode ? `/profile/my-collections/${searchParams?.collectionCode}` : '/profile/mynfts'}
              className="text-base my-auto">
                <IconArrowBack />
            </Link> 
            <h1 className="text-xl text-c-darkgray font-semibold ml-2">My NFT</h1>
          </div>
          <img src={itemData.image} alt="panda" className="rounded-md h-auto w-auto shadow-md"/>
        </div>
        <div className='flex flex-col w-full md:w-2/3 space-y-4'>
          <div className="w-full flex flex-col">
            <h1 className="text-xl text-c-darkgray font-semibold mb-2">NFT Description</h1>
            <div className="rounded-md border bg-white bg-opacity-70 border-gray-100 h-auto md:h-96 p-5 shadow-md flex flex-col space-y-3">
              <table>
                <tbody className="leading-loose">
                  <tr>
                    <td className="font-medium text-xxs">Code:</td>
                    <td className="font-bold text-xxs text-blue-900">{itemData?.code}</td>
                  </tr>
                  <tr>
                    <td className="font-medium text-xxs">Name:</td>
                    <td className="font-bold text-xxs text-blue-900">{itemData?.name}</td>
                  </tr>
                  <tr>
                    <td className="font-medium text-xxs">Details:</td>
                    <td className="font-bold text-xxs text-blue-900">{itemData.details}</td>
                  </tr>
                  <tr>
                    <td className="font-medium text-xxs">Collection ID:</td>
                    <td className="font-bold text-xxs text-blue-900">{itemData.collection_id}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>  
      </div>
    </div>
  )
}
export default Item;