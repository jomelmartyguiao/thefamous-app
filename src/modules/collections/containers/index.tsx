import { useEffect, useState, Fragment, SyntheticEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
// import { isEmpty } from 'lodash';

import { getCollectionData, getItems, getItemsFilter, heartItem } from 'modules/explore/apis';
import { getCollectionTraits } from 'modules/account/apis';
import type { CollectionProps, ItemProps, TraitProps } from 'modules/account/types';
import type { ProfileProps } from 'modules/common/types';
import useAppSelector from 'helpers/useAppSelector';
import { 
  Badge, 
  FilterIcon, 
  SearchIcon, 
  IconCircleInfo, 
  ChevronRight, 
  ChevronDown,
  HeartIcon, 
  IconCloseCirle,
  IconInstagram,
  IconTwitter,
  IconWebsite,
  IconDiscord,
  IconTelegram} from 'modules/common/components/Icons';
import bnbIcon from 'images/bnblogo.png';
import algorandIcon from 'images/algorand-logo.png';
import { toast } from 'react-toastify';
import LoadingImg from 'modules/collections/components/LoadingImg';
interface Props {
  name: string,
  id: string
}

const Collections = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const [filterString, setFilterString] = useState('');
  const [nftList, setNftList] = useState<Array<ItemProps>>([]);
  const [activeTooltip, setActiveTooltip] = useState('')
  const [active, setIsActive] = useState('');
  const [loadingItem, setIsLoadingItem] = useState(false);
  const [filterTraits, setFilterTraits] = useState<Array<Props>>([]);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(window.innerWidth <= 768 ? true : false);

  const params: any = useParams();
  const itemList: Array<ItemProps> = useAppSelector('noAuth.itemList');
  const profile: ProfileProps = useAppSelector('common.profile');

  useEffect(() => {
    const onScroll = (e: any) => {
      const { scrollTop, clientHeight, scrollHeight } = e.target.documentElement;
      setScrollTop(scrollTop);
      if(clientHeight + scrollTop === scrollHeight && !filterString){
        getItemsLoader()
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line
  }, [scrollTop]);

  useEffect(() => {
    getCollectionData(params?.code);
    getCollectionTraits(params?.code);
    // eslint-disable-next-line
  }, [params?.code])

  useEffect(() => {
    if(filterString) {
      getFilterLoader()
    }else{
      getItemsLoader()
    }
    // eslint-disable-next-line
  }, [filterString])

  useEffect(() => {
    setNftList(filterString ? itemList : nftList.concat(itemList))
    // eslint-disable-next-line
  }, [itemList])

  const getItemsLoader = () => {
    setIsLoadingItem(true)
    getItems(params?.code, () => setIsLoadingItem(false));
  }

  const getFilterLoader = () => {
    setIsLoadingItem(true)
    getItemsFilter(params.code, filterString, () => setIsLoadingItem(false))
  }

  const handleDrop = (item: string) => (
    setIsActive(item === active ? '' : item)
  )

  const updateFilter = (subTypeId: string, checked: boolean) => {
    if(subTypeId === 'BUY' || subTypeId === 'SOLD'){
      setFilterString((currentFilter) => (checked ? `${currentFilter}&filters[status]=${subTypeId}` 
      : currentFilter.replace(`&filters[status]=${subTypeId}`, '')))
    }else if(subTypeId === 'algorand' || subTypeId === 'polygon'){
      setFilterString((currentFilter) => (checked ? `${currentFilter}&filters[network]=${subTypeId}` 
      : currentFilter.replace(`&filters[network]=${subTypeId}`, '')))
    }else{
      setFilterString((currentFilter) => (checked ? `${currentFilter}&filters[properties][]=${subTypeId}` 
        : currentFilter.replace(`&filters[properties][]=${subTypeId}`, '')))
    }

  }

  const handleCheck = (e: SyntheticEvent, propertyId: string, label: any) => {
    const { checked } = e.target as HTMLInputElement;
    setFilterTraits(checked ? filterTraits.concat([{name: label, id: propertyId}]) : filterTraits.filter(item => item.name !== label));
    updateFilter(propertyId, checked)
  }  
  
  const handleRemove = (label: any, propertyId: string) => {
    setFilterTraits(filterTraits.filter(item => item.name !== label));
    updateFilter(propertyId, false)
  }

  const handleHeart = (itemCode: string) => {
    if(address){
      heartItem(params?.code, itemCode, () => {
        getItems(params?.code);
      })
    }else{
      toast.error("Please log in your account.")
    }
  }

  const handleTooltip = (itemCode: string) => {
    setActiveTooltip(itemCode)
  }
  
  const address = localStorage.getItem("wallet_address")
  const collectionData: CollectionProps = useAppSelector('noAuth.collectionData')
  const traitList: Array<TraitProps> = useAppSelector('account.traitList');
  return (
    <div className="pt-20 relative flex-col flex bg-contain bg-famous bg-center bg-fixed min-h-screenFooter bg-opacity-90 bg-no-repeat">
      <div className="flex flex-col items-center">
        <img 
          src={collectionData?.banner}
          alt="panda" 
          loading="lazy"
          className="bg-gray-200 w-full md:h-60"
        />
        <img 
          src={collectionData?.logo} 
          alt="profile" 
          loading="lazy"
          className="rounded-full border-4 bg-gray-200 border-white h-16 w-16 md:h-28 md:w-28 2xl:h-32 2xl:w-32 -mt-5 md:-mt-14"
        />
        <div className="flex w-full md:pr-5 md:-mt-10">
          <div className='mx-auto md:mx-0 md:ml-auto flex flex-row bg-white border border-gray-50 rounded-md'>
            {collectionData?.website &&
            <a 
              href={collectionData?.website}
              target="_blank" 
              rel="noopener noreferrer"
              className='p-2 hover:text-blue-500 hover:shadow-md'>
              <IconWebsite className="text-base md:text-xl" />
            </a>}
            {collectionData?.twitter &&
            <a 
              href={collectionData?.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className='border-l p-2 border-gray-50 hover:text-blue-500 hover:shadow-md'>
              <IconTwitter className="text-base md:text-xl" />
            </a>}
            {collectionData?.instagram &&
            <a 
              href={collectionData?.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className='border-l p-2 border-gray-50 hover:text-blue-500 hover:shadow-md'>
              <IconInstagram className="text-base md:text-xl" />
            </a>}
            {collectionData?.telegram &&
            <a 
              href={collectionData?.telegram} 
              target="_blank" 
              rel="noopener noreferrer"
              className='border-l p-2 border-gray-50 hover:text-blue-500 hover:shadow-md'>
              <IconTelegram className="text-base md:text-xl" />
            </a>}
            {collectionData?.discord &&
            <a 
              href="https://discord.gg/CgxKg6QbU4" 
              target="_blank" 
              rel="noopener noreferrer"
              className='border-l p-2 border-gray-50 hover:text-blue-500 hover:shadow-md'>
              <IconDiscord className="text-base md:text-xl" />
            </a>}
          </div>
        </div>
        <div className="w-full px-5">
          <div className="mt-2 md:mt-4 flex flex-col items-center">
            <div className="flex space-x-1 mx-auto">
              <div className="flex align-top space-x-1">
                <h1 className='text-xl md:text-2xl 2xl:text-5xl text-center text-c-darkgray font-semibold'>{collectionData?.name}</h1>
                <Badge className="inline w-4" />
              </div>
            </div>
            <h1 className="text-sm 2xl:text-lg text-gray-500 font-medium">Created by: <span className="text-blue-500">The Famous</span></h1>
          </div>
          <div className="mt-6 md:mt-12 w-full grid grid-cols-2 md:grid-cols-4 md:3-4 lg:w-1/2 md:mx-auto">
            <div className="border min-h-max flex flex-col hover:shadow-lg hover:z-10 shadow-sm items-center justify-start 
              p-4 rounded-tl-md md:rounded-l-md bg-white">
              <p className="text-xl md:text-4xl text-c-darkgray font-semibold">{collectionData?.total_items}</p>
              <p className="text-sm md:text-base text-gray-500 font-medium">NFTs</p>
            </div>
            <div className="border min-h-max flex flex-col hover:shadow-lg hover:z-10 shadow-sm items-center justify-start 
              p-4 bg-white rounded-tr-md md:rounded-none">
              <p className="text-xl md:text-4xl text-c-darkgray font-semibold">{collectionData?.total_owned}</p>
              <p className="text-sm md:text-base text-gray-500 font-medium">Owned</p>
            </div>
            <div className="border min-h-max flex flex-col hover:shadow-lg hover:z-10 shadow-sm items-center justify-start 
              p-4 bg-white rounded-bl-md md:rounded-none">
              <p className="text-xl md:text-4xl text-c-darkgray font-semibold">{collectionData?.floor_price_bnb}</p>
              <div className="flex space-x-1 items-center">
                <img src={bnbIcon} alt="Icon" className="h-3 w-3"/>
                <p className="text-sm md:text-base font-medium text-gray-500">BNB</p>
              </div>
              <p className="text-sm md:text-base text-gray-500 font-medium">Floor Price</p>
            </div>
            <div className="border min-h-max flex flex-col hover:shadow-lg hover:z-10 shadow-sm items-center justify-start 
              p-4 rounded-br-md md:rounded-r-md bg-white">
              <p className="text-xl md:text-4xl text-c-darkgray font-semibold">{collectionData?.floor_price_algo}</p>
              <div className="flex space-x-1 items-center">
                <img src={algorandIcon} alt="Icon" className="h-3 w-3"/>
                <p className="text-sm md:text-base font-medium text-gray-500">ALGO</p>
              </div>
            </div>
          </div>
          <div className="mt-6 md:mt-12 max-w-5xl mx-auto">
            <p className="text-gray-500 text-center 2xl:text-lg">
              {/* {collectionData?.details} */}
              The Famous Founder Club is a limited collection of unique NFTs. These unique digital collectible NFTs, act as unique member badge to join the Famous Fan Guild and access the private Famous Founder Club to benefit from exclusive privileges. More on The Famous Discord.
            </p>
          </div>
          <div className="mt-6 lg:mt-12 w-full flex flex-col lg:flex-row lg:space-x-4 pl-1 mb-12">
            <div className={`w-full lg:w-1/4 h-full border shadow-md p-5 rounded-l-md flex flex-col space-y-3 bg-white 
              ${scrollTop > 700 ? 'lg:fixed lg:top-28' : ''}`}>
              <div className="flex space-x-2 cursor-pointer" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                <FilterIcon />
                <h1 className="text-sm text-c-darkgray font-medium">Filter</h1>
              </div>
              <div className={`${isFilterOpen ? 'hidden' : 'block'} overflow-y-auto h-lg 2xl:h-xxl`}>
                <div className="flex flex-col space-y-1 cursor-pointer mb-2">
                  <div 
                    className="p-3 border rounded-md flex justify-between hover:shadow-md"
                    onClick={() => handleDrop('status')}>
                      <h1 className="text-sm font-semibold text-c-darkgray">Status</h1>
                      {active === 'chains' ? <ChevronDown /> : <ChevronRight />}
                  </div>
                  <div className={active === 'status' ? 'flex flex-col p-2 rounded-md border shadow-md bg-gray-100 space-y-1' 
                    : 'hidden'}>
                    <label htmlFor="buy" className="relative flex-inline items-center isolate p-2 rounded-lg w-full cursor-pointer">
                      <input 
                        id="buy" 
                        type="checkbox"
                        checked={filterTraits.filter(itemFilter => itemFilter.name === 'For Sale').length === 1}
                        onChange={(e) => handleCheck(e, 'BUY', 'For Sale')}
                        className="relative peer z-20 text-gray-900 rounded-md focus:ring-0" />
                      <span className="ml-2 relative z-20">For Sale</span>
                      <div className="absolute inset-0 bg-white z-10 border rounded-lg"></div>
                    </label>
                    <label htmlFor="sold" className="relative flex-inline items-center isolate p-2 rounded-lg w-full cursor-pointer">
                      <input 
                        id="sold" 
                        type="checkbox" 
                        checked={filterTraits.filter(itemFilter => itemFilter.name === 'Sold').length === 1}
                        onChange={(e) => handleCheck(e, 'SOLD', 'Sold')}
                        className="relative peer z-20 text-gray-900 rounded-md focus:ring-0" />
                      <span className="ml-2 relative z-20">Sold</span>
                      <div className="absolute inset-0 bg-white z-10 border rounded-lg"></div>
                    </label>
                  </div>
                </div>
                <div className="flex flex-col space-y-1 cursor-pointer mb-2">
                  <div 
                    className="p-3 border rounded-md flex justify-between hover:shadow-md"
                    onClick={() => handleDrop('price')}>
                      <h1 className="text-sm font-semibold text-c-darkgray">Price</h1>
                      {active === 'price' ? <ChevronDown /> : <ChevronRight />}
                  </div>
                  <div className={active === 'price' ? 'flex flex-col p-3 rounded-md shadow-md bg-gray-50' : 'hidden'}>
                    <label htmlFor="price" className="relative flex-inline items-center isolate p-2 rounded-lg w-full cursor-pointer">
                      <span className="ml-2 relative z-20">0.5 BNB</span>
                      <div className="absolute inset-0 bg-white z-10 border rounded-lg"></div>
                    </label>
                  </div>
                </div>
                <div className="flex flex-col space-y-1 cursor-pointer mb-2">
                  <div 
                    className="p-3 border rounded-md flex justify-between hover:shadow-md"
                    onClick={() => handleDrop('chains')}>
                      <h1 className="text-sm font-semibold text-c-darkgray">Chains</h1>
                      {active === 'chains' ? <ChevronDown /> : <ChevronRight />}
                  </div>
                  <div className={active === 'chains' ? 'flex flex-col p-2 rounded-md border shadow-md bg-gray-100 space-y-1' 
                    : 'hidden'}>
                    <label htmlFor="algorand" className="relative flex-inline items-center isolate p-2 rounded-lg w-full cursor-pointer">
                      <input 
                        id="algorand" 
                        type="checkbox"
                        checked={filterTraits.filter(itemFilter => itemFilter.name === 'TheFamous/Algorand').length === 1}
                        onChange={(e) => handleCheck(e, 'algorand', 'TheFamous/Algorand')}
                        className="relative peer z-20 text-gray-900 rounded-md focus:ring-0" />
                      <span className="ml-2 relative z-20">TheFamous/Algorand</span>
                      <div className="absolute inset-0 bg-white z-10 border rounded-lg"></div>
                    </label>
                    <label htmlFor="polygon" className="relative flex-inline items-center isolate p-2 rounded-lg w-full cursor-pointer">
                      <input 
                        id="polygon" 
                        type="checkbox" 
                        checked={filterTraits.filter(itemFilter => itemFilter.name === 'Opensea/Polygon').length === 1}
                        onChange={(e) => handleCheck(e, 'polygon', 'Opensea/Polygon')}
                        className="relative peer z-20 text-gray-900 rounded-md focus:ring-0" />
                      <span className="ml-2 relative z-20">Opensea/Polygon</span>
                      <div className="absolute inset-0 bg-white z-10 border rounded-lg"></div>
                    </label>
                  </div>
                </div>
                {traitList.map((item, i) => {
                  return(
                    <Fragment key={i}>
                      {item.code !== 'type' &&
                        <div className="flex flex-col space-y-1 cursor-pointer mb-2">
                          <div 
                            className="p-3 border rounded-md flex justify-between hover:shadow-md"
                            onClick={() => handleDrop(item.code)}>
                              <h1 className="text-sm font-semibold text-c-darkgray">{item.label}</h1>
                              {active === item.code ? <ChevronDown /> : <ChevronRight />}
                          </div>
                          <div className={active === item.code 
                            ? 'flex flex-col p-3 rounded-md border shadow-md bg-gray-100 space-y-1 max-h-60 overflow-auto' : 'hidden'}>
                            {item.properties.map((property, index) => {
                              const updatedFilter = filterTraits.filter(itemFilter => itemFilter.name === property.label);
                              return(
                                <label htmlFor={property.id} key={index} className="relative flex-inline items-center isolate p-2 rounded-lg w-full cursor-pointer">
                                  <input 
                                    id={property.id} 
                                    type="checkbox" 
                                    checked={updatedFilter.length === 1}
                                    className="relative peer z-20 text-gray-900 rounded-md focus:ring-0"
                                    onChange={(e) => handleCheck(e, property.id, property.label)} />
                                  <span className="ml-2 relative z-20">{property.label}</span>
                                  <div className="absolute inset-0 bg-white z-10 border rounded-lg"></div>
                                </label>
                              )
                            })}
                          </div>
                        </div>}
                    </Fragment>
                  )
                })}
              </div>
            </div>
            {scrollTop > 700 && <div className='lg:w-1/4'></div>}
            <div className='space-y-5 lg:w-3/4'>
              <div className="border border-gray-200 bg-white shadow-md p-5 rounded-r-md h-auto flex flex-col lg:flex-row w-full mt-5 lg:mt-0">
                <div className='w-full lg:w-3/4 mb-2 lg:mb-0'>
                  {filterTraits.length !== 0 &&
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                      {filterTraits.map((item, i) => {
                        return(
                          <div key={i} className="border border-blue-200 bg-blue-50 rounded-md px-2 py-1 relative">
                            <p className='text-xs text-center'>{item.name}</p>
                            <div 
                              onClick={() => handleRemove(item.name, item.id)}
                              className='text-xs float-right cursor-pointer absolute -right-1 -top-2 text-red-600'>
                              <IconCloseCirle />
                            </div>
                          </div>
                        )
                      })}
                    </div>}
                </div>
                <div className="flex w-full lg:w-1/4 items-center">
                  <input type="search" placeholder="Search item No." className="w-72 h-10 border rounded-l-md p-2 text-small focus:outline-none"/>
                  <div className="bg-gray-400 hover:bg-gray-500 transform duration-200 ease-in-out rounded-r-md px-3 flex items-center h-10">
                    <SearchIcon />
                  </div>
                </div>
              </div>
              <div className="w-full h-full">
                {
                  nftList.length === 0 ?
                    <h1 className="text-c-darkgray italic text-xl w-full text-center py-10">
                      <IconCircleInfo /> No NFTs to display.
                    </h1>
                  :
                  // <InfiniteScroll
                  //   dataLength={itemList.length}
                  //   next={fetchMoreData}
                  //   hasMore={true}
                  //   loader={<h1 className='text-center text-xl mt-3'>Loading More...</h1>}>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                    {nftList.map((item, i) => (
                        <Fragment key={i}>
                          <div className="flex flex-col space-y-2 border rounded-md hover:shadow-lg transform duration-200 
                            ease-in-out bg-white">
                            <Link to={`/nft/?itemCode=${item.code}&collectionCode=${params.code}`}>
                              {loadingItem ? 
                                <LoadingImg />
                              :
                              <LazyLoad height={500} placeholder={<LoadingImg />} debounce={500} once>
                                <img 
                                  src={item.image} 
                                  alt={item?.code}
                                  loading='lazy' 
                                  className="bg-gray-400 h-auto w-full border-b-2 rounded-t-md border-gray-100"
                                />
                              </LazyLoad>}
                            </Link>
                            <div className="flex flex-row h-full justify-between p-2">
                              <div className="flex flex-col w-1/2 space-y-1">
                                <div className='flex flex-row relative'>
                                  <h1 className="font-bold text-xs lg:text-sm truncate">{item.name}</h1>
                                  {item?.asset_id && 
                                    <>
                                      {(item?.code === activeTooltip) &&
                                      <div className="absolute -right-28 -top-7">
                                        <div className="relative mx-2">
                                          <div className="bg-black text-white text-xs rounded py-1 px-4 right-0 bottom-full w-60">
                                            NFT is verified and passport updated
                                            <svg className="absolute text-black h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255">
                                              <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
                                            </svg>
                                          </div>
                                        </div>
                                      </div>}
                                      <h1 
                                        onMouseEnter={() => handleTooltip(item?.code)}
                                        onMouseLeave={() => handleTooltip('')}
                                        className='ml-1 -mt-1 cursor-pointer'>
                                          <Badge className="inline w-3" />
                                      </h1>
                                    </>
                                  }
                                </div>
                                <h1 className="text-sm">#{item.series}</h1>
                              </div>
                              <div className="flex flex-col w-1/2 text-right space-y-1">
                                <div className="flex space-x-1 items-center justify-end">
                                  {profile?.network === 'algorand' ?
                                    <>
                                      <img src={algorandIcon} alt="algorand-icon" className="h-3 inline"/>
                                      <p className="font-bold text-xs lg:text-sm">{item?.price?.algo}</p>
                                      <p className='text-xs lg:text-sm'>ALGO</p>
                                    </>
                                    :
                                    <>
                                      <img src={bnbIcon} alt="bnb-icon" className="h-3 inline"/>
                                      <p className="font-bold text-xs lg:text-sm">0.5</p>
                                      <p className='text-xs lg:text-sm'>BNB</p>
                                    </>}
                                </div>
                                <h1 className="text-semibold  text-xs lg:text-sm text-right text-gray-500">{item?.views || 0} Views</h1>
                                <div 
                                  onClick={() => handleHeart(item.code)} 
                                  className="flex space-x-1 items-center justify-end cursor-pointer">
                                  <HeartIcon className="hover:text-red-400 text-gray-500" />
                                  <h1 className="text-semibold  text-xs lg:text-sm text-right">{item?.hearts || 0}</h1>
                                </div>
                              </div>
                            </div>
                            <Link 
                              to={`/nft/?itemCode=${item.code}&collectionCode=${params.code}`}
                              className={`p-1 text-white text-sm font-semibold text-center w-full bottom-0
                              rounded-b-md ${+item.sold === 1 ? 'bg-red-400' : 'hover:bg-blue-800 bg-blue-900'}`}>
                              {+item.sold === 1 ? 'Sold' : 'Buy'}
                            </Link>
                          </div>
                        </Fragment>
                      ))
                    }
                  </div>
                  // </InfiniteScroll>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Collections;
