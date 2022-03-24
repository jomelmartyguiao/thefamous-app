import { SyntheticEvent, useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';

import { getBoughtItemData, sellNFT } from 'modules/account/apis';
import type { ItemProps } from 'modules/account/types';
import useAppSelector from 'helpers/useAppSelector';
import { IconArrowBack, IconCloseCirle } from 'modules/common/components/Icons'
import LoadingImg from 'modules/collections/components/LoadingImg';
import Modal from 'modules/common/components/Modal';
import { Input } from 'modules/account/components/FormComponents';

import eth from 'images/etherium-logo.png';
import algo from 'images/algorand-logo.png';
import bnb from 'images/bnblogo.png';

let initialState = {
  currency: 'BNB',
  amount: 0,
  password: '',
  startDate: new Date(),
  endDate: new Date(),
  duration: 0
}

const Sell = () => {
  const [state, setState] = useState(initialState)
  const [loadingItem, setIsLoadingItem] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState('FIXED');

  const params: any = useParams();
  const history = useHistory();
  
  useEffect(() => {
    getItemLoader()
  //  eslint-disable-next-line
  }, [params])

  const getItemLoader = () => {
    setIsLoadingItem(true)
    getBoughtItemData(params?.code, () => setIsLoadingItem(false));
  }

  const itemData: ItemProps = useAppSelector('account.itemData');

  const handleChange = (e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setState({
      ...state,
      [name]: value,
    })
  }

  const handleSelectDate = (ranges: any) =>{
    handleDate(ranges?.selection?.startDate, ranges?.selection?.endDate)
  }

  const handleDate = (firstDate: Date, secondDate: Date) => {
    let difTime = secondDate.getTime() - firstDate.getTime();
    let difDays = difTime / (1000 * 3600 * 24);
    setState({
      ...state,
      duration: difDays === 0 ? 1 : difDays,
      startDate: firstDate,
      endDate: secondDate,
    })
  }
  
  const handleSubmit = () => {
    let obj = {
      coin: state.currency,
      duration: state.duration,
      price: state.amount,
      type: type,
      password: state.password,
    }
    sellNFT(params?.code, obj, () => {
      history.push("/trade")
    })
  }

  const selectionRange = {
    startDate: state.startDate,
    endDate: state.endDate,
    key: 'selection',
  }
  return(
    <>
      <div className="w-full lg:w-3/4 flex flex-col border rounded-md p-5 relative shadow-md">
        <div className="flex flex-col md:flex-row max-w-7xl w-full md:space-x-5 mx-auto px-3 md:px-0">
          <div className='flex flex-col w-full md:w-3/5'>
            <Link to={`/profile/my-nft/${params?.code}`} className='flex flex-row border-b border-gray-100 mb-2 pb-1'>
              <div className='flex flex-row text-sm hover:text-blue-900'>
                <IconArrowBack className="h-3 mt-1" />
                <img src={itemData?.image} alt="coon" className='h-6 w-6 ml-2' />
              </div>
              <div className='flex flex-col ml-2'>
                <span className='text-xxs text-gray-600'>The Famous Founder Club</span>
                <span className='text-xxs text-black font-semibold'>{itemData?.name} #{itemData?.series}</span>
              </div>
            </Link>
            <h1 className="text-lg text-gray-800 font-semibold mb-3">List item for sale</h1>
            <div className='flex flex-row w-1/2 space-x-2 mb-3'>
              <div 
                onClick={() => setType('FIXED')}
                className={`border border-gray-100 py-1 px-2 w-1/2 text-sm rounded-md text-center cursor-pointer
                items-center ${type === 'FIXED' ? 'bg-blue-900 text-white' : ''}`}>
                  <span className='mx-auto'>
                    Fixed Price
                  </span>
              </div>
              <div 
                onClick={() => setType('AUCTION')}
                className={`border border-gray-100 py-1 px-2 w-1/2 text-sm rounded-md text-center cursor-pointer
                  ${type === 'AUCTION' ? 'bg-blue-900 text-white' : ''}`}>
                Auction
              </div>
            </div>
            <span className='text-sm'>Price</span>
            <div className='flex flex-row space-x-2'>
              <div className="flex flex-wrap w-4/12 relative h-15 bg-white items-center rounded-md mb-4 border border-gray-100">
                <div className="flex -mr-px">
                  <span className="flex items-center leading-normal bg-white rounded rounded-l-none border-0 px-3
                    whitespace-no-wrap text-gray-600">
                      {state.currency === 'eth' ? 
                        <img src={eth} alt="eth" className='h-6 w-6' />
                      : state.currency === 'algo' ? 
                        <img src={algo} alt="algo" className='h-6 w-6' />
                      : <img src={bnb} alt="bnb" className='h-6 w-6' />}
                    </span>
                </div>
                <select
                  onChange={handleChange}
                  defaultValue={state.currency}
                  name="currency"
                  className="flex-shrink flex-grow flex-auto leading-normal w-px h-10 px-3 relative self-center
                    text-base outline-none rounded-md">
                  <option value={'bnb'}>BNB</option>
                  <option value={'eth'}>ETH</option>
                  <option value={'algo'}>ALGO</option>
                </select>
              </div>
              <div className="flex flex-wrap w-8/12 relative h-15 bg-white items-center rounded-md mb-4 border border-gray-100">
                <input
                  type="number"
                  name="amount"
                  onChange={handleChange}
                  className="flex-shrink flex-grow flex-auto leading-normal w-px h-10 px-3 relative self-center
                    text-base outline-none rounded-md"
                  placeholder={type === 'FIXED' ? 'Fixed Price' : `Reserve Price`}
                />
              </div>
            </div>
            <span className='text-sm'>Duration</span>
            <div className="flex flex-wrap w-full relative h-15 bg-white items-center rounded-md mb-4 border border-gray-100">
              <DateRangePicker
                ranges={[selectionRange]}
                // minDate={addDays(new Date(), -30)}
                // maxDate={addDays(new Date(), 30)}
                onChange={handleSelectDate}
                staticRanges={[
                  {
                    label: '1 Day',
                    // hasCustomRendering: true,
                    range: () => ({
                      startDate: new Date(),
                      endDate: new Date()
                    }),
                    isSelected() {
                      return true;
                    }
                  },
                  {
                    label: '1 Week',
                    // hasCustomRendering: true,
                    range: () => ({
                      startDate: new Date(),
                      endDate: addDays(new Date(), 7)
                    }),
                    isSelected() {
                      return true;
                    }
                  },
                  {
                    label: '1 Month',
                    // hasCustomRendering: true,
                    range: () => ({
                      startDate: new Date(),
                      endDate: addDays(new Date(), 30)
                    }),
                    isSelected() {
                      return true;
                    }
                  }
                ]
              }
              />
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className='text-base rounded-md border border-blue-500 font-semibold bg-blue-500 
                hover:bg-transparent text-white hover:text-blue-500 shadow-md transform duration-200 
                ease-in-out px-5 w-auto h-10 ml-auto'>
                Complete Listing
            </button>
          </div>  
          <div className="w-full md:w-2/5 flex flex-col pt-8">
            <div className="flex flex-col space-y-2 border p-2 rounded-md shadow-sm bg-white">
              <div className="bg-gradient-to-r from-red-50 to-blue-100">
                {loadingItem ?
                  <LoadingImg />
                :
                <LazyLoad height={500} placeholder={<LoadingImg />} scroll={true} debounce={500} once>
                  <img src={itemData?.image} alt="Artwork" loading='lazy' className="h-auto object-contain w-full"/>
                </LazyLoad>}
              </div>
            </div>
            <div className="flex flex-row border rounded-md shadow-sm bg-white p-3 justify-between">
              <div>
                <h1 className="text-sm text-gray-400">The Famous Founder Club</h1>
                <h1 className="text-base text-gray-800 font-semibold">{itemData?.name} #{itemData?.series}</h1>
              </div>
              <div>
                <span className="text-sm text-gray-400">Price</span>
                <div className="text-sm text-gray-800 font-semibold flex">
                <img src={bnb} alt="bnb" className='h-4 w-4 mr-1' />0 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} hideHeader>
        <div className='flex'>
          <span className='ml-auto cursor-pointer' onClick={() => setIsOpen(false)}>
            <IconCloseCirle />
          </span>
        </div>
        <p className="text-gray-900 font-semibold text-xl pb-3 text-center border-b border-gray-100 -mt-5">
          Complete your listing
        </p>
        <div className='flex flex-row justify-between py-5 border-b border-gray-100'>
          <div className='flex flex-row'>
            <div className='flex flex-row text-sm hover:text-blue-900'>
              <img src={itemData?.image} alt="coon" className='h-8 w-8 ml-2' />
            </div>
            <div className='flex flex-col ml-2'>
              <span className='text-xs text-gray-600'>The Famous Founder Club</span>
              <span className='text-xs text-black font-semibold'>{itemData?.name} #{itemData?.series}</span>
            </div>
          </div>
          <div>
            <span className="text-sm text-gray-400">Price</span>
            <div className="text-sm text-gray-800 font-semibold flex">
            <img src={bnb} alt="bnb" className='h-4 w-4 mr-1' />0 
            </div>
          </div>
        </div>
        <p className="text-gray-900 font-semibold text-sm text-center pt-4 pb-1">
          To complete your listing follow these steps:
        </p>
        <div className="flex flex-col border rounded-md shadow-sm mt-2 bg-white w-full">
          <div className="flex items-center justify-between p-3 border-b">
            <span className='text-sm font-bold'>1. Input password</span>
          </div>
          <div className="flex flex-col space-y-2 p-4">
            <h1 className="text-sm font-semibolde text-gray-600 mb-1">Input your password to continue.</h1>
            <Input
              type="password"
              name="password"
              label="Password"
              value={state.password}
              handleChange={handleChange}
              />
            <button
              type="button"
              onClick={handleSubmit}
              className='text-sm rounded-md border border-blue-500 font-semibold bg-blue-500 
                hover:bg-transparent text-white hover:text-blue-500 shadow-md transform duration-200 
                ease-in-out w-24 h-8 ml-auto'>
                Submit
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
export default Sell;