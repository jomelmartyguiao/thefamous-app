import { useEffect, useState, SyntheticEvent } from 'react';
import { Link, useLocation, useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import LazyLoad from 'react-lazyload';

import { heartItem } from 'modules/explore/apis';
import { buyTradedItem, offerItem, bidItem } from 'modules/trade/apis';
import { getItem } from 'modules/trade/apis';
import type { ItemProps } from 'modules/account/types';
import useAppSelector from 'helpers/useAppSelector';
import stringToObject from 'helpers/stringToObject';
import { 
  DescriptionIcon, 
  HeartIcon, 
  IconArrowUp, 
  IconArrowDown, 
  IconEye, 
  OfferIcon, 
  PropertyIcon, 
  IconArrowBack,
  IconCloseCirle,
  IconGraphUp,
  IconUserCircle, } from 'modules/common/components/Icons'
import LoadingImg from 'modules/collections/components/LoadingImg';
import Modal from 'modules/common/components/Modal';
import Chart from 'modules/common/components/Chart';

import eth from 'images/etherium-logo.png';
import algo from 'images/algorand-logo.png';
import bnb from 'images/bnblogo.png';

let initialState = {
  coin: 'BNB',
  price: 0,
  bid_price: 0,
}

const TradeItem = () => {
  const [state, setState] = useState(initialState)
  const [loadingItem, setIsLoadingItem] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBid, setIsOpenBid] = useState(false);
  const [description, setDescription] = useState(true);
  const [details, setDetails] = useState(false);

  const params: any = useParams();
  const history: any = useHistory();
  const location = useLocation();
  const searchParams: any = stringToObject(location.search);
  // const profile = useAppSelector('common.profile');
  const tradeItemData: ItemProps = useAppSelector('trade.tradeItemData');
  const address = localStorage.getItem('wallet_address');

  useEffect(() => {
    getItemLoader()
    // eslint-disable-next-line
  }, [params.code])

  const getItemLoader = () => {
    setIsLoadingItem(true)
    getItem(params.code, () => setIsLoadingItem(false));
  }  
  
  const handleChange = (e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setState({
      ...state,
      [name]: value,
    })
  }

  const handleHeart = () => {
    if(address){
      heartItem(searchParams?.collectionCode, params.code, () => {
        getItem(params.code)
      })
    }else{
      toast.error("Please log in your account.")
    }
  }

  const handleBuy = () => {
    if(address){
      tradeItemData?.button === 'BUY' ? 
        buyTradedItem(params.code, {}, () => {
          getItem(params.code)
        }) 
      : history.push("/profile/mynfts")
    }else{
      toast.error("Please log in your account.")
    }
  }

  const handleOffer = () => {
    if(address){
      tradeItemData?.button === 'OFFER' ? 
      offerItem(params.code, state, () => {
          getItem(params.code);
          setIsOpen(false);
        }) 
      : history.push("/profile/mynfts")
    }else{
      toast.error("Please log in your account.")
    }
  }

  const handleBid = () => {
    if(address){
      tradeItemData?.button === 'BID' ? 
      bidItem(params.code, {price: state.bid_price}, () => {
          getItem(params.code);
          setIsOpenBid(false);
        }) 
      : history.push("/profile/mynfts")
    }else{
      toast.error("Please log in your account.")
    }
  }

  return (
    <>
    <div className="pt-24 md:pt-32 pb-10 flex flex-col min-w-3/4 bg-contain bg-center bg-famous bg-fixed bg-opacity-10 bg-no-repeat">
      <div className="flex flex-col md:flex-row max-w-7xl w-full md:space-x-5 mx-auto px-3 md:px-0">
        <div className="w-full md:w-2/5 flex flex-col space-y-4">
          <Link to={`/trade`} className='flex flex-row text-base hover:text-blue-900 '>
            <IconArrowBack />
            <span className='ml-2'>Back</span>
          </Link>
          <div className="flex flex-col space-y-3 border p-2 rounded-md shadow-sm bg-white">
            <div className="flex justify-between">
              <div className="flex space-x-1 items-center">
                <IconEye className="text-gray-400 hover:text-gray-500"/>
                <h1 className="text-sm text-gray-500">{tradeItemData?.views || 0}</h1>
              </div>
              <div 
                onClick={handleHeart}
                className="flex space-x-1 items-center cursor-pointer">
                <HeartIcon className="text-gray-400 hover:text-red-300"/>
                <h1 className="text-sm text-gray-500">{tradeItemData?.hearts || 0}</h1>
              </div>
            </div>
            <div className="bg-gradient-to-r from-red-50 to-blue-100">
              {loadingItem ?
                <LoadingImg />
              :
              <LazyLoad height={500} placeholder={<LoadingImg />} scroll={true} debounce={500} once>
                <img src={tradeItemData?.image} alt="Artwork" loading='lazy' className="h-auto object-contain w-full"/>
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
                <p className="text-sm text-gray-500">
                  The Famous Founder Club is a limited collection of unique NFTs. These unique digital collectible NFTs, act as unique member badge to join the Famous Fan Guild and access the private Famous Founder Club to benefit from exclusive privileges. more on The Famous Discord.
                </p>
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
                    {tradeItemData?.asset_id ?
                      <a href={`https://algoexplorer.io/asset/${tradeItemData?.asset_id}`} rel="noreferrer" target="_blank">
                        {/* {(address || '').substring(0,4) +'...'+ (address || '').substring((address || '').length - 7)} */}
                        {tradeItemData?.asset_id}
                      </a>
                    : <span className="text-sm text-gray-500">---</span>}
                  </h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="text-xs md:text-xxs lg:text-sm text-gray-500">Token ID</h1>
                  <h1 className="text-xs md:text-xxs lg:text-sm text-gray-500">{tradeItemData?.series}</h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="text-xs md:text-xxs lg:text-sm text-gray-500">Token Standard</h1>
                  <h1 className="text-xs md:text-xxs lg:text-sm text-gray-500">{tradeItemData?.token_standard}</h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="text-sm text-gray-500">Blockchain</h1>
                  <h1 className="text-sm text-gray-500 capitalize">{tradeItemData?.network}</h1>
                </div>
              </h1>
            </div>}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(tradeItemData?.properties || []).map((item, i) => {
              return(
                <div key={i} className="border border-blue-200 bg-blue-50 rounded-md p-1 text-center">
                  <span className='text-xs lg:text-sm font-medium'>{item.label}</span>
                </div>
              )
            })}
          </div>
        </div>
        <div className="flex flex-col pt-5 md:pt-10 p-0 md:p-3 w-full md:w-3/5">
          {/* <h1 className="text-2xl text-gray-500 font-semibold">{tradeItemData?.name} #{tradeItemData?.series}</h1> */}
          <div className='flex flex-row'>
            <div>
              <h1 className="text-2xl text-gray-500 font-semibold">{tradeItemData?.name} #{tradeItemData?.series}</h1>
          <h1 className="text-lg text-blue-500">@TheFamous</h1>
            </div>
            <button
              type="button"
              onClick={tradeItemData?.button === 'OFFER' ? () => setIsOpen(true) : tradeItemData?.button === 'BID' ? () => setIsOpenBid(true) : handleBuy}
              className='text-base rounded-md border border-blue-500 font-semibold bg-blue-500 
                hover:bg-transparent text-white hover:text-blue-500 shadow-md transform duration-200 
                ease-in-out px-2 w-28 h-10 ml-auto'>
                {tradeItemData?.button}
            </button>
          </div>
          <div className="flex space-x-3 md:space-x-8 mt-3">
            <h1 className="text-sm text-gray-500">Owned by <span className="text-blue-500">{tradeItemData.owner || '---'}</span></h1>
            <div className="flex items-center space-x-1">
              <IconEye className="text-gray-500"/>
              <h1 className="text-sm text-gray-500">{tradeItemData?.views || 0} Views</h1>
            </div>
            <div className="flex items-center space-x-1 cursor-pointer" onClick={handleHeart}>
              <HeartIcon className="text-gray-500"/>
              <h1 className="text-sm text-gray-500">{tradeItemData?.hearts || 0} Hearts</h1>
            </div>
          </div>
          <div className="flex flex-col border rounded-md shadow-sm mt-2 bg-white">
            {+tradeItemData?.sold !== 1 &&
            <div className="flex items-center justify-between p-5 border-b">
              <div className='flex items-center space-x-1'>
                <OfferIcon className="text-gray-500"/>
                <h1 className="text-base">For Sale </h1>
              </div>
            </div>}
            <div className="flex flex-col space-y-2 px-5 py-4">
              {+tradeItemData?.sold === 1 ?
                <div className="rounded-md bg-gray-400 text-white font-semibold text-lg flex items-center 
                  justify-center p-2 w-52">
                  SOLD
                </div>
                : 
                <>
                  <h1 className="text-sm text-gray-500">Current price: ${tradeItemData?.price_usd}</h1>
                  <div className='flex flex-col w-1/3'>
                    <div className='flex flex-row items-center mr-auto'>
                      <img src={bnb} alt="Bnb logo" className="h-6 object-contain" />
                      <h1 className="text-3xl font-bold ml-3">{tradeItemData?.price} BNB</h1>
                    </div>
                  </div>
                </>
              }
            </div>
          </div>
          {(tradeItemData?.button === 'OFFER' || tradeItemData?.button === 'BID') &&
            <div className="flex flex-col border rounded-md shadow-sm mt-3 bg-white w-full">
              <div className="flex items-center justify-between p-5 border-b">
                <div className='flex items-center space-x-1'>
                  <IconGraphUp className="text-gray-500"/>
                  <h1 className="text-base">Price History</h1>
                </div>
              </div>
              <div className="flex flex-col space-y-2 p-5 text-center">
                {tradeItemData?.button === 'OFFER' ? 
                  <>
                    {tradeItemData?.offers?.length === 0 ? 
                      <>
                        <IconGraphUp className="h-10 w-10 mx-auto"/>
                        <h1 className="text-sm text-gray-500">No item activity yet.</h1>
                      </>
                      : <>
                          <p className='text-left ml-2 font-thin mb-3'>
                            Average Price: 
                            <span className='font-black text-blue-500 ml-1'>
                              {(tradeItemData?.offers.reduce((a, b) => a + b.price, 0) / tradeItemData?.offers.length).toFixed(2)} BNB
                            </span>
                          </p>
                          <Chart data={tradeItemData?.offers} />
                          <table className="min-w-full">
                            <thead>
                              <tr>
                                <th className="py-2 border-b-2 border-gray-400 text-left text-sm leading-4 text-c-darkgray tracking-wider w-2/12">Date</th>
                                <th className="py-2 border-b-2 border-gray-400 text-left text-sm leading-4 text-c-darkgray tracking-wider w-8/12">User</th>
                                <th className="py-2 border-b-2 border-gray-400 text-left text-sm leading-4 text-c-darkgray tracking-wider w-2/12">Offer</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <>
                                {tradeItemData?.offers?.map((item, i) => {
                                  return(
                                    <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                                      <td className="py-2 whitespace-no-wrap border-b border-gray-300">
                                        <div className='items-center flex flex-row text-xs'>
                                          {item.created_at}
                                        </div>
                                      </td>
                                      <td className="whitespace-no-wrap border-b border-gray-300">
                                        <div className='items-center flex flex-row text-xs text-gray-500'>
                                          <IconUserCircle width="1em" height="1em" /> <span className='ml-2'>{item.creator}</span>
                                        </div>
                                      </td>
                                      <td className="py-2 whitespace-no-wrap border-b border-gray-300">
                                        <div className='items-center flex flex-row text-xs'>
                                          <img src={bnb} alt="bnb-logo" className="h-3 mr-1" />{item.price} {item?.coin}
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })} 
                              </>
                            </tbody>
                          </table>
                        </>}
                  </>
                : tradeItemData?.button === 'BID' ? 
                <>
                  {tradeItemData?.bids?.length === 0 ? 
                    <>
                      <IconGraphUp className="h-10 w-10 mx-auto"/>
                      <h1 className="text-sm text-gray-500">No item activity yet.</h1>
                    </>
                    : <>
                        <Chart data={tradeItemData?.bids} />
                        <table className="min-w-full">
                            <thead>
                              <tr>
                                <th className="py-2 border-b-2 border-gray-400 text-left text-sm leading-4 text-c-darkgray tracking-wider w-2/12">Date</th>
                                <th className="py-2 border-b-2 border-gray-400 text-left text-sm leading-4 text-c-darkgray tracking-wider w-8/12">User</th>
                                <th className="py-2 border-b-2 border-gray-400 text-left text-sm leading-4 text-c-darkgray tracking-wider w-2/12">Bid</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <>
                                {tradeItemData?.bids?.map((item, i) => {
                                  return(
                                    <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                                      <td className="py-2 whitespace-no-wrap border-b border-gray-300">
                                        <div className='items-center flex flex-row text-xs'>
                                          {item.created_at}
                                        </div>
                                      </td>
                                      <td className="whitespace-no-wrap border-b border-gray-300">
                                        <div className='items-center flex flex-row text-xs text-gray-500'>
                                          <IconUserCircle width="1em" height="1em" /> <span className='ml-2'>{item.creator}</span>
                                        </div>
                                      </td>
                                      <td className="py-2 whitespace-no-wrap border-b border-gray-300">
                                        <div className='items-center flex flex-row text-xs'>
                                          {item.price}
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })} 
                              </>
                            </tbody>
                          </table>
                      </>}
                </>
                : <></>
              }
              </div>
            </div>}
          <div className="md:hidden flex flex-col border rounded-md shadow-sm mt-3 bg-white">
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
                <p className="text-sm text-gray-500">
                  The Famous Founder Club is a limited collection of unique NFTs. These unique digital collectible NFTs, act as unique member badge to join the Famous Fan Guild and access the private Famous Founder Club to benefit from exclusive privileges. more on The Famous Discord.
                </p>
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
              <h1 className="text-sm text-gray-500">
                <div className="flex justify-between">
                  <h1 className="text-sm text-gray-500">Contract Address</h1>
                  <h1 className="text-sm text-blue-500">
                    {tradeItemData?.asset_id ?
                      <a href={`https://algoexplorer.io/asset/${tradeItemData?.asset_id}`} rel="noreferrer" target="_blank">
                        {/* {(address || '').substring(0,4) +'...'+ (address || '').substring((address || '').length - 7)} */}
                        {tradeItemData?.asset_id}
                      </a>
                    : <span className="text-sm text-gray-500">---</span>}
                  </h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="text-sm text-gray-500">Token ID</h1>
                  <h1 className="text-sm text-gray-500">{tradeItemData?.series}</h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="text-sm text-gray-500">Token Standard</h1>
                  <h1 className="text-sm text-gray-500">{tradeItemData?.token_standard}</h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="text-sm text-gray-500">Blockchain</h1>
                  <h1 className="text-sm text-gray-500 capitalize">{tradeItemData?.network}</h1>
                </div>
              </h1>
            </div>}
          </div>
          <div className="border rounded-md shadow-sm mt-4 p-5 bg-white">
            <p className='text-sm text-gray-700 font-bold'>Secondary market purchase rules</p>
            <ul className='list-disc ml-5'>
              <li className='text-sm text-gray-500'>
                You can buy a NFT on TheFamous trading floor using your account. 
              </li>
              <li className='text-sm text-gray-500'>
                You need first to sign up on The Famous platform and complete your account profile with your signature. 
              </li>
              <li className='text-sm text-gray-500'>
                You can trade NFT with the currencies accepted on TheFamous and requested by the seller. 
              </li>
              <li className='text-sm text-gray-500'>
                You will need to make a deposit in one of your account wallets before to buy an NFT as your balance will be verified to validate a transaction.  
              </li>
              <li className='text-sm text-gray-500'>
                When you buy a NFT traded by its owner, the NFT passport will be updated with the ownership transfer registration.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Modal isOpen={isOpen} hideHeader>
        <div className='flex'>
          <span className='ml-auto cursor-pointer text-red-500' onClick={() => setIsOpen(false)}>
            <IconCloseCirle />
          </span>
        </div>
        <p className="text-gray-900 font-semibold text-xl pb-3 border-b border-gray-100 -mt-5">
          Make an Offer
        </p>
        <div className='flex flex-col justify-between pt-5'>
          <span className='text-sm'>Price</span>
          <div className='flex flex-row space-x-2 pb-5'>
            <div className="flex flex-wrap w-1/2 relative h-15 bg-white items-center rounded-md mb-4 border border-gray-100">
              <div className="flex -mr-px">
                <span className="flex items-center leading-normal bg-white rounded rounded-l-none border-0 px-3
                  whitespace-no-wrap text-gray-600">
                    {state.coin === 'eth' ? 
                      <img src={eth} alt="eth" className='h-6 w-6' />
                    : state.coin === 'algo' ? 
                      <img src={algo} alt="algo" className='h-6 w-6' />
                    : <img src={bnb} alt="bnb" className='h-6 w-6' />}
                  </span>
              </div>
              <select
                onChange={handleChange}
                defaultValue={state.coin}
                name="coin"
                className="flex-shrink flex-grow flex-auto leading-normal w-px h-10 px-3 relative self-center
                  text-base outline-none rounded-md">
                <option value={'bnb'}>BNB</option>
                <option value={'eth'}>ETH</option>
                <option value={'algo'}>ALGO</option>
              </select>
            </div>
            <div className="flex flex-wrap w-1/2 relative h-15 bg-white items-center rounded-md mb-4 border border-gray-100">
              <input
                type="number"
                name="price"
                onChange={handleChange}
                className="flex-shrink flex-grow flex-auto leading-normal w-px h-10 px-3 relative self-center
                  text-base outline-none rounded-md"
                placeholder="Amount"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleOffer}
            className='text-sm rounded-md border border-blue-500 font-semibold bg-blue-500 
              hover:bg-transparent text-white hover:text-blue-500 shadow-md transform duration-200 
              ease-in-out w-32 h-8 ml-auto'>
              Make Offer
          </button>
        </div>
      </Modal>
      <Modal isOpen={isOpenBid} hideHeader>
        <div className='flex'>
          <span className='ml-auto cursor-pointer text-red-500' onClick={() => setIsOpenBid(false)}>
            <IconCloseCirle />
          </span>
        </div>
        <p className="text-gray-900 font-semibold text-xl pb-3 border-b border-gray-100 -mt-5">
          Auction
        </p>
        <div className='flex flex-col justify-between pt-5'>
          <span className='text-sm'>Price</span>
          <div className='flex flex-row space-x-2 pb-5'>
            <div className="flex flex-wrap w-1/2 relative h-15 bg-white items-center rounded-md mb-4 border border-gray-100">
              <div className="flex -mr-px">
                <span className="flex items-center leading-normal bg-white rounded rounded-l-none border-0 px-3
                  whitespace-no-wrap text-gray-600">
                    <img src={bnb} alt="bnb" className='h-6 w-6' />
                  </span>
              </div>
              <select
                onChange={handleChange}
                defaultValue={state.coin}
                name="coin"
                className="flex-shrink flex-grow flex-auto leading-normal w-px h-10 px-3 relative self-center
                  text-base outline-none rounded-md">
                <option value={'bnb'}>BNB</option>
                {/* <option value={'eth'}>ETH</option>
                <option value={'algo'}>ALGO</option> */}
              </select>
            </div>
            <div className="flex flex-wrap w-1/2 relative h-15 bg-white items-center rounded-md mb-4 border border-gray-100">
              <input
                type="number"
                name="bid_price"
                onChange={handleChange}
                className="flex-shrink flex-grow flex-auto leading-normal w-px h-10 px-3 relative self-center
                  text-base outline-none rounded-md"
                placeholder="Amount"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleBid}
            className='text-sm rounded-md border border-blue-500 font-semibold bg-blue-500 
              hover:bg-transparent text-white hover:text-blue-500 shadow-md transform duration-200 
              ease-in-out w-32 h-8 ml-auto'>
              Bid
          </button>
        </div>
      </Modal>
    </>
  )
}

export default TradeItem;

// const Completionist = () => <span>Reset</span>;
