import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

import { getBoughtItemData } from 'modules/account/apis';
import type { ItemProps } from 'modules/account/types';
import useAppSelector from 'helpers/useAppSelector';
import { 
  DescriptionIcon, 
  HeartIcon, 
  IconArrowUp, 
  IconArrowDown, 
  IconEye,
  PropertyIcon,
  IconArrowBack,
  IconGraphUp } from 'modules/common/components/Icons'
import LoadingImg from 'modules/collections/components/LoadingImg';

import bnb from 'images/bnblogo.png';

const MyNFT = () => {
  const [loadingItem, setIsLoadingItem] = useState(false);
  const [description, setDescription] = useState(false);
  const [details, setDetails] = useState(false);

  const params: any = useParams();
  
  useEffect(() => {
    getItemLoader()
  //  eslint-disable-next-line
  }, [params])

  const getItemLoader = () => {
    setIsLoadingItem(true)
    getBoughtItemData(params?.code, () => setIsLoadingItem(false));
  }

  const itemData: ItemProps = useAppSelector('account.itemData');

  return(
    <div className="w-full lg:w-3/4 flex flex-col border rounded-md p-5 relative shadow-md">
      <div className="flex flex-col md:flex-row max-w-7xl w-full md:space-x-5 mx-auto px-3 md:px-0">
        <div className="w-full md:w-2/5 flex flex-col space-y-2">
          <Link to={`/profile/mynfts`} className='flex flex-row text-sm hover:text-blue-900 '>
            <IconArrowBack className="h-3 mt-1" />
            <span className='ml-2'>Back</span>
          </Link>
          <div className="flex flex-col space-y-2 border p-2 rounded-md shadow-sm bg-white">
            <div className="flex justify-between">
              <div className="flex space-x-1 items-center">
                <IconEye className="text-gray-400 hover:text-gray-500"/>
                <h1 className="text-sm text-gray-500">{itemData?.views || 0}</h1>
              </div>
              <div 
                // onClick={handleHeart}
                className="flex space-x-1 items-center cursor-pointer">
                <HeartIcon className="text-gray-400 hover:text-red-300"/>
                <h1 className="text-sm text-gray-500">{itemData?.hearts || 0}</h1>
              </div>
            </div>
            <div className="bg-gradient-to-r from-red-50 to-blue-100">
              {loadingItem ?
                <LoadingImg />
              :
              <LazyLoad height={500} placeholder={<LoadingImg />} scroll={true} debounce={500} once>
                <img src={itemData?.image} alt="Artwork" loading='lazy' className="h-auto object-contain w-full"/>
              </LazyLoad>}
            </div>
          </div>
          <div className="hidden md:flex flex-col border rounded-md shadow-sm bg-white">
            <div 
              className="flex justify-between items-center p-5 border-b w-full cursor-pointer" 
              onClick={() => setDescription(!description)}>
                <div className="flex space-x-1 items-center">
                <DescriptionIcon className="text-gray-500"/>
              <h1 className="text-sm text-gray-500 font-semibold">Description</h1>
              </div>
              {description ? <IconArrowUp className="text-gray-500"/> : <IconArrowDown className="text-gray-500"/>}
            </div>
            {description &&
              <div className="flex flex-col p-5 space-y-2 bg-gray-50">
                <h1 className="text-sm text-gray-500">Created by <span className="text-blue-500">The Famous</span></h1>
                <p className="text-sm text-gray-500">{itemData.details}</p>
              </div>}
            <div 
              onClick={() => setDetails(!details)}
              className="flex justify-between items-center p-5 border-b w-full border cursor-pointer">
              <div className="flex space-x-1 items-center">
                <PropertyIcon className="text-gray-500"/>
                <h1 className="text-sm text-gray-500 font-semibold">Details</h1>
              </div>
              {details ? <IconArrowUp className="text-gray-500"/> : <IconArrowDown className="text-gray-500"/>}
            </div>
            {details &&
            <div className="flex flex-col p-5 space-y-2 bg-gray-50">
              <h1 className="text-xs md:text-xxs lg:text-sm text-gray-500">
                <div className="flex justify-between">
                  <h1 className="text-xs md:text-xxs lg:text-sm text-gray-500">Contract Address</h1>
                  <h1 className="text-sm text-blue-500">
                    {itemData?.asset_id ?
                      <a href={`https://algoexplorer.io/asset/${itemData?.asset_id}`} rel="noreferrer" target="_blank">
                        {itemData?.asset_id}
                      </a>
                    : <span className="text-sm text-gray-500">---</span>}
                  </h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="text-xs md:text-xxs lg:text-sm text-gray-500">Token ID</h1>
                  <h1 className="text-xs md:text-xxs lg:text-sm text-gray-500">{itemData?.series}</h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="text-xs md:text-xxs lg:text-sm text-gray-500">Token Standard</h1>
                  <h1 className="text-xs md:text-xxs lg:text-sm text-gray-500">{itemData?.token_standard}</h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="text-sm text-gray-500">Blockchain</h1>
                  <h1 className="text-sm text-gray-500 capitalize">{itemData?.network}</h1>
                </div>
              </h1>
            </div>}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(itemData?.properties || []).map((item, i) => {
              return(
                <div key={i} className="border border-blue-200 bg-blue-50 rounded-md p-1 text-center">
                  <span className='text-xs lg:text-sm font-medium'>{item.label}</span>
                </div>
              )
            })}
          </div>
        </div>
        <div className='flex flex-col w-full md:w-3/5 pt-6'>
          <div className='flex flex-row'>
            <div>
              <h1 className="text-lg text-blue-500">The Famous Founder Club</h1>
              <h1 className="text-2xl text-gray-500 font-semibold">{itemData?.name} #{itemData?.series}</h1>
            </div>
            <Link 
              to={`/profile/list-item/${params?.code}`}
              className='ml-auto'>
              <button
                className='text-base rounded-md border border-blue-500 font-semibold bg-blue-500 
                  hover:bg-transparent text-white hover:text-blue-500 shadow-md transform duration-200 
                  ease-in-out px-2 w-28 h-10'>
                  Sell
              </button>
            </Link>
          </div>
          <div className="flex space-x-3 md:space-x-5 mt-3">
            <h1 className="text-sm text-gray-500">Owned by <span className="text-blue-500">you</span></h1>
            <div className="flex items-center space-x-1">
              <IconEye className="text-gray-500"/>
              <h1 className="text-sm text-gray-500">{itemData?.views || 0} Views</h1>
            </div>
            <div className="flex items-center space-x-1 cursor-pointer">
              <HeartIcon className="text-gray-500"/>
              <h1 className="text-sm text-gray-500">{itemData?.hearts || 0} Hearts</h1>
            </div>
          </div>
          <div className="flex flex-col border rounded-md shadow-sm mt-2 bg-white w-full">
            <div className="flex items-center justify-between p-5 border-b">
            </div>
            <div className="flex flex-col space-y-2 px-5 py-4">
              <h1 className="text-base text-gray-500">Current price</h1>
              <div className='flex flex-row items-center'>
                <div><img src={bnb} alt="BNB-logo" className="h-6 object-contain" /></div>
                <h1 className="text-3xl font-bold ml-2">0 BNB</h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col border rounded-md shadow-sm mt-3 bg-white w-full">
            <div className="flex items-center justify-between p-5 border-b">
              <div className='flex items-center space-x-1'>
                <IconGraphUp className="text-gray-500"/>
                <h1 className="text-base">Price History</h1>
              </div>
            </div>
            <div className="flex flex-col space-y-2 px-5 py-10 text-center">
              <IconGraphUp className="h-10 w-10 mx-auto"/>
              <h1 className="text-sm text-gray-500">No item activity yet.</h1>
            </div>
          </div>
        </div>  
      </div>
    </div>
  )
}
export default MyNFT;