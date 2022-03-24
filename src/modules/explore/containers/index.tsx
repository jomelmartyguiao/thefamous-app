import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

import { getFeaturedItems } from '../apis'
import type { ItemProps } from 'modules/account/types';
import useAppSelector from 'helpers/useAppSelector';
import { ArrowRight } from 'modules/common/components/Icons';
import LoadingImg from 'modules/collections/components/LoadingImg';
import { soccerList } from '../constants';
import famousBackround from 'images/graffiti.png'
import HowItWorks from './HowItWorks'

const Explore = () => {
  useEffect(() => {
    getFeaturedItems();
  }, [])

  const featuredList: Array<ItemProps> = useAppSelector('noAuth.featuredList');

  return (
    <>
      <div className="h-auto pb-24 relative bg-contain bg-center bg-famous bg-fixed bg-opacity-10 bg-no-repeat lg:block lg:px-10">
        <h1 className="pt-32 text-center text-4xl gangcrime text-c-blue">The Famous</h1>
        <h5 className="text-center text-sm font-medium text-c-darkgray">The NFT marketplace for artists and fans</h5>
        <div className="flex justify-center mt-12">
          <div className="max-w-screen-xl 2xl:max-w-screen-2xl flex w-full flex-col lg:flex-row lg:space-x-30 lg:justify-between relative">
            <div className="flex flex-col space-y-2 lg:space-y-4 lg:w-1/2">
              <h1 className="text-blue-900 text-lg md:text-2xl lg:text-left lg:text-3xl fonts-sans-bold text-center">Discover, collect, trade famous<br />celebrities, artists and brands NFTs</h1>
              <div className="flex">
                <img src={famousBackround} alt="Famous Illustration" className="h-full md:h-72 md:mx-auto lg:mx-0" loading='lazy' />
              </div>
            </div>
            <div className="flex flex-col items-center space-y-8">
              <h1 className="text-blue-900 text-xl md:text-3xl fonts-sans-bold text-center md:text-left">Become a Founder Club Member</h1>
              <div className="w-full hidden md:flex flex-col md:flex-row md:space-x-12 space-y-8 md:space-y-0 md:pl-32 lg:pl-0 p-5">
                {featuredList.slice(0, 2).map((item, i) => (
                  <Link 
                    to={`/nft/?itemCode=${item.code}&collectionCode=TF00001`}
                    key={i}>
                      <div className="relative flex flex-col transform duration-200 filter drop-shadow-lg hover:scale-105 ease-in-out">
                        <div className="absolute bg-blue-900 text-white w-16 h-16 rounded-full border-4 justify-center 
                          font-medium items-center text-center text-sm flex border-gray-100 inset-x-0 mx-auto -top-8">
                            Buy
                        </div>
                        <LazyLoad height={500} placeholder={<LoadingImg />} debounce={500} once>
                          <img src={item.image} alt={item?.name} className="h-auto w-56 object-cover rounded-t-xl" />
                        </LazyLoad>
                        <div className="h-14 rounded-b-xl w-56 bg-blue-900 border-t border-white p-2 flex items-center justify-center">
                          <h1 className="text-center text-white text-sm font-semibold">{item.name}</h1>
                        </div>
                      </div>
                  </Link>
                ))}
              </div>
              <div className="w-full flex md:hidden flex-col md:flex-row md:space-x-12 space-y-8 md:space-y-0 p-5">
                {featuredList.slice(0, 1).map((item, i) => (
                  <Link 
                    to={`/nft/?itemCode=${item.code}&collectionCode=TF00001`} 
                    className='mx-auto md:mx-0'
                    key={i}>
                      <div className="relative flex flex-col transform duration-200 filter drop-shadow-lg hover:scale-105 ease-in-out">
                        <div className="absolute bg-blue-900 text-white w-16 h-16 rounded-full border-4 justify-center 
                          font-medium items-center text-center text-sm flex border-gray-100 inset-x-0 mx-auto -top-8">
                            Buy
                        </div>
                        <LazyLoad height={500} placeholder={<LoadingImg />} debounce={500} once>
                          <img src={item.image} alt={item?.name} className="h-auto w-56 object-cover rounded-t-xl" />
                        </LazyLoad>
                        <div className="h-14 rounded-b-xl w-56 bg-blue-900 border-t border-white p-2 flex items-center justify-center">
                          <h1 className="text-center text-white text-sm font-semibold">{item.name}</h1>
                        </div>
                      </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <HowItWorks />
        <div className="flex flex-col items-center px-5 pt-4 md:pt-8">
          <div className="flex flex-col w-full lg:max-w-screen-xl 2xl:max-w-screen-2xl">
            <div className="flex justify-between items-center">
              <h1 className="text-lg md:text-2xl fonts-sans-bold">Featured Collection</h1>
              <Link 
              to="/collection/TF00001"
              className="text-xs md:text-xl font-semibold flex items-center">
                  Browse Collection
                  <ArrowRight className="ml-1 h-4 md:h-6" />
              </Link>
            </div>
            <h1 className="text-lg md:text-2xl fonts-sans-bold text-blue-900 mt-6">Famous Founder Club</h1>
            <div className="flex space-x-3 mt-5 overflow-x-scroll md:overflow-x-hidden md:overflow-y-hidden">
              {featuredList.slice(0, 5).map((item, i)=>(
                <Link 
                  to={`/nft/?itemCode=${item.code}&collectionCode=TF00001`}
                  key={i}
                  className="p-1 w-full flex flex-col space-y-2 transform duration-200 ease-in-out hover:scale-105">
                    <LazyLoad height={500} placeholder={<LoadingImg />} debounce={500} once>
                      <img src={item.image} alt={item?.name} className="w-full h-auto rounded-lg shadow-sm" loading='lazy' />
                    </LazyLoad>
                    <h1 className="text-xxs md:text-lg font-semibold text-c-darkgray">{item.name}</h1>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center px-5 pt-4 md:pt-20">
          <div className="flex flex-col w-full lg:max-w-screen-xl 2xl:max-w-screen-2xl">
            <div className="flex justify-between items-center">
              <h1 className="text-lg md:text-2xl fonts-sans-bold">Upcoming Collection</h1>
              <span className="text-xs md:text-xl font-semibold flex items-center">
                  Coming Soon
              </span>
            </div>
            <h1 className="text-lg md:text-2xl fonts-sans-bold text-blue-900 mt-6">
              NFT Fantasy Football DAO <span className='text-gray-800 text-xl ml-3'>[Sport - NFT Collectible card game]</span>
            </h1>
            <div className="flex space-x-3 mt-5 overflow-x-scroll md:overflow-x-hidden md:overflow-y-hidden">
              {soccerList.map((item, i)=>(
                <div key={i} className="p-1 w-full flex flex-col space-y-2 transform duration-200 ease-in-out hover:scale-105">
                  <LazyLoad height={500} placeholder={<LoadingImg />} debounce={500} once>
                    <img src={item.image} alt={item?.name} className="w-56 h-64 rounded-lg shadow-sm" loading='lazy' />
                  </LazyLoad>
                  <h1 className="text-xxs md:text-lg font-semibold text-c-darkgray">{item.name}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Explore
