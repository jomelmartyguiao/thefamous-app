import { useEffect, useState, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import ReactCardFlip from 'react-card-flip';
import { QRCode } from 'react-qrcode-logo';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import LazyLoad from 'react-lazyload';

import { getBoughtItems, getMyCollections, claimItem } from '../apis';
import { Badge, IconCirclePlus, IconCircleInfo, IconCopyFile, IconCloseCirle } from 'modules/common/components/Icons';
import type { CollectionProps, ItemProps } from 'modules/account/types';
import type { ProfileProps } from 'modules/common/types';
import useAppSelector from 'helpers/useAppSelector';
import LoadingImg from 'modules/collections/components/LoadingImg';
import Modal from 'modules/common/components/Modal';
import { Input } from 'modules/account/components/FormComponents';

let initialState = {
  code: ''
}

const MyNFTs = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState(initialState);
  const [active, setActive] = useState('');
  const [hover, setHover] = useState(false);

  useEffect(() => {
    getMyCollections();
    getBoughtItems();
  }, []);

  const handleChange = (e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setState({
      ...state,
      [name]: value,
    })
  }

  const handleFlip = (id: string) => {
    setIsFlipped(true);
    setActive(id)
  }

  const handleMobileFlip = (id: string) => {
    setIsFlipped(!isFlipped);
    setActive(id)
  }

  const handleCopy = () => {
    toast.success('Copied on Clipboard');
  }

  const handleSubmit = () => {
    claimItem(state, () => {
      setIsOpen(false)
    })
  }

  const collectionList: Array<CollectionProps> = useAppSelector('account.collectionList');
  const boughtList: Array<ItemProps> = useAppSelector('account.boughtList');
  const profile: ProfileProps = useAppSelector('common.profile');
  // const address = localStorage.getItem('wallet_address');
  return(
    <>
      <div className="w-full lg:w-3/4 flex flex-col border rounded-md p-5 relative shadow-md">
        <div className="flex flex-col items-center">
          <div className="w-full flex space-x-4">
            <div className="w-full flex flex-col">
              {profile?.profile_type === 'Artist' &&
              <div className='mb-3'>
                <div className="flex flex-row mb-8">
                  <span className="text-c-darkgray font-semibold text-sm md:text-2xl mb-3 w-1/2">My Creative Collections</span>
                  <Link 
                    to="/profile/mynfts/add-collection"
                    className="text-c-darkgray hover:text-blue-900 font-semibold text-xs md:text-xl text-right w-1/2 cursor-pointer">
                    <IconCirclePlus /> Add Collections
                  </Link>
                </div>
                {collectionList.length === 0 ?
                  <h1 className="text-c-darkgray italic text-xl w-full text-center py-10">
                    <IconCircleInfo /> No collections to display.
                  </h1>
                : <div className="grid grid-cols-1 md:grid-cols-2 justify-center max-w-7xl gap-5">
                    {collectionList.map((collection, i) => {
                      return(
                        <Link to={`/profile/my-collections/${collection.code}`} key={i}>
                          <div className="relative transform duration-200 ease-in-out hover:shadow-lg cursor-pointer">
                            <img 
                              src={collection?.logo}
                              alt="logo"
                              loading='lazy'
                              className="absolute w-16 h-16 border-4 border-white rounded-full p-2 bg-gray-200 top-28 md:top-44 
                                inset-x-0 mx-auto" />
                            <img 
                              src={collection?.banner} 
                              alt="Display" 
                              loading='lazy'
                              className="w-full h-40 md:h-52 object-cover object-center rounded-t-lg" />
                            <div className="w-full rounded-t-lg bg-white shadow-md h-auto md:h-52 rounded-b-lg p-5 md:p-10 flex flex-col 
                              items-center space-y-2">
                              <div className="flex space-x-1">
                                <h1 className="text-sm md:text-lg text-c-gray text-center font-semibold">{collection?.name}</h1>
                                <Badge />
                              </div>
                              <p className="text-xxs text-gray-500 text-center overflow-ellipsis">
                                {collection?.details}
                              </p>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>}
              </div>}
              <div className="flex flex-row">
                <h1 className="text-c-darkgray font-semibold text-base md:text-2xl">
                  My NFTs
                </h1>
                <div className='ml-auto'>
                  <button
                    type='button'
                    onClick={() => setIsOpen(true)}
                    className='text-sm rounded-md border border-yellow-400 font-semibold bg-yellow-400 
                    hover:bg-transparent text-white hover:text-yellow-400 shadow-md transform duration-200 
                    ease-in-out px-2 py-1 ml-2'>
                    Claim
                  </button>
                  <button 
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    className='text-sm rounded-md border border-blue-900 font-semibold bg-blue-900 
                      hover:bg-transparent text-white hover:text-blue-900 shadow-md transform duration-200 
                      ease-in-out px-2 py-1 ml-2'>
                      {hover ? 'Coming Soon' : 'Export'}
                  </button>
                </div>
              </div>
              {(+profile?.discord_club_member === 0 && profile.founder_club_code !== 'N/A') && <>
                <p className="text-xs font-medium text-gray-900">
                  As the owner of a Famous NFT, you can join the exclusive Famous Founder Club on <a href="https://discord.gg/caBbRnmjkN" className='text-blue-600' target="_blank" rel="noopener noreferrer">Discord</a>. 
                </p>
                <div className="hidden lg:flex lg:flex-row text-xs font-medium text-gray-900">
                  Please go to <a href="https://discord.gg/caBbRnmjkN" className='text-blue-600 ml-1' target="_blank" rel="noopener noreferrer">The Famous Discord server</a>, ‘Founder Club category’ and ‘Join’ channel and type the command:
                  <CopyToClipboard options={{message: 'None'}} text={`/verify-club-member ${profile.founder_club_code}`}> 
                    <div onClick={handleCopy} className='flex flex-row cursor-pointer ml-2'>
                      <span className='font-semibold mr-2'>/verify-club-member {profile.founder_club_code}</span>
                      <IconCopyFile />
                    </div>
                  </CopyToClipboard>
                </div>
                <p className="lg:hidden text-xs font-medium text-gray-900">
                  Please go to <a href="https://discord.gg/caBbRnmjkN" className='text-blue-600 ml-1' target="_blank" rel="noopener noreferrer">The Famous Discord server</a>, ‘Founder Club category’ and ‘Join’ channel and type the command:
                  <CopyToClipboard options={{message: 'None'}} text={`/verify-club-member ${profile.founder_club_code}`}> 
                    <span onClick={handleCopy} className='flex flex-row cursor-pointer ml-1 md:ml-2'>
                      <span className='font-semibold mr-2'>/verify-club-member {profile.founder_club_code}</span>
                      <IconCopyFile />
                    </span>
                  </CopyToClipboard>
                </p>
              </>}
              {boughtList.length === 0 ?
                <h1 className="text-c-darkgray italic text-xl w-full text-center py-10">
                  <IconCircleInfo /> No NFTs to display.
                </h1>
              :
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-2">
                  {boughtList.map((item, i) => (
                    <div 
                      key={i} 
                      className={`flex flex-col space-y-2 border rounded-md hover:shadow-lg transform cursor-pointer
                      duration-200 ease-in-out`}>
                      <ReactCardFlip isFlipped={isFlipped && item.code === active} flipDirection="horizontal">
                        <div
                          onMouseOver={() => handleFlip(item.code)}
                          onMouseLeave={() => handleFlip('')}>
                            <LazyLoad height={500} placeholder={<LoadingImg />} debounce={500} once>
                              <img 
                                src={item.image} 
                                alt={item?.name} 
                                className="bg-gray-400 object-cover h-auto w-full border-b-2 shadow-lg border-gray-100"
                              />
                            </LazyLoad>
                        </div>
                        <div 
                          className="h-81 w-full text-white relative cursor-pointer float-right flex" 
                          onMouseEnter={() => handleFlip(item.code)} 
                          onMouseLeave={() => handleFlip('')}>
                          {isFlipped && item.code === active &&
                          <>
                            <div className="flex m-auto">
                              <QRCode 
                                logoWidth={40}
                                size={150}
                                logoImage="https://ucarecdn.com/30bc3a89-8a72-42cf-94e0-f7b163af02a0/"
                                value={`${process.env.REACT_APP_UPLOADCARE_PUBLIC_KEY}/profile/nft/passport/${item?.code}`} />
                            </div>
                          </>}
                          <Link 
                            to={`/profile/nft/passport/${item?.code}`}
                            className="p-1 lg:text-sm w-full rounded-md bg-blue-900 absolute bottom-0 text-center">
                              View Passport
                          </Link>
                      </div>
                      </ReactCardFlip>
                      <div className="flex flex-col px-3 pb-3">
                        <button 
                          type="button"
                          onClick={() => handleMobileFlip(item.code)}
                          className="p-1 text-xs w-full rounded-md bg-blue-900 text-center text-white md:hidden">
                            Click to Flip
                        </button>
                        <div className='flex flex-row mb-1'>
                          <div>
                            <h1 className="font-semibold text-lg">{item.name}</h1>
                            <h1 className="font-semibold text-gray-500 text-sm">#{item?.series}</h1>
                          </div>
                          {+item?.listed === 1 ? 
                          <Link to={`/profile/my-nft/${item.code}`} className="ml-auto">
                            <button  
                              type="button"
                              className="px-2 text-xs rounded-md border border-blue-500 font-semibold bg-blue-500 
                                hover:bg-transparent text-white hover:text-blue-500 shadow-md transform duration-200 
                                ease-in-out w-16 h-6">
                                Update
                            </button>
                          </Link>
                          :
                          <Link to={`/profile/my-nft/${item.code}`} className="ml-auto">
                            <button  
                              type="button"
                              className="px-2 text-xs rounded-md border border-green-500 font-semibold bg-green-500 
                                hover:bg-transparent text-white hover:text-green-500 shadow-md transform duration-200 
                                ease-in-out w-16 h-6">
                                Trade
                            </button>
                          </Link>
                          }
                        </div>
                        <div className="flex justify-between">
                          <h1 className="text-xs md:text-xxs lg:text-sm text-gray-500">Contract Address:</h1>
                          <h1 className="text-xs md:text-xxs lg:text-sm text-blue-500">
                            {item?.asset_id && item?.asset_id !== '---' ?
                              <a href={`https://algoexplorer.io/asset/${item?.asset_id}`} rel="noreferrer" target="_blank">
                                {/* {(address || '').substring(0,4) +'...'+ (address || '').substring((address || '').length - 7)} */}
                                {item?.asset_id}
                              </a>
                            : <span className="text-xs md:text-xxs text-gray-500">---</span>}
                          </h1>
                        </div>
                        <div className="flex justify-between">
                          <h1 className="text-xs md:text-xxs lg:text-sm text-gray-500">Token ID</h1>
                          <h1 className="text-xs md:text-xxs lg:text-sm text-gray-500">{item?.series}</h1>
                        </div>
                        <div className="flex justify-between">
                          <h1 className="text-xs md:text-xxs lg:text-sm text-gray-500">Token Standard</h1>
                          <h1 className="text-xs md:text-xxs lg:text-sm text-gray-500">{item?.token_standard}</h1>
                        </div>
                        <div className="flex justify-between">
                          <h1 className="text-xs md:text-xxs lg:text-sm text-gray-500">Blockchain</h1>
                          <h1 className="text-xs md:text-xxs lg:text-sm text-gray-500 capitalize">{item?.network}</h1>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {(item?.properties || []).map((itemData, i) => {
                            return(
                              <div key={i} className="border border-blue-200 bg-blue-50 rounded-md text-center">
                                <span className='text-xxs font-medium'>{itemData.label}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>}
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
        <p className="text-gray-900 font-semibold text-xl pb-3 -mt-5">
          Enter claim code
        </p>
        <div className="flex flex-col border rounded-md shadow-sm mt-2 bg-white w-full">
          <div className="flex flex-col space-y-2 p-4">
            <Input
              type="text"
              name="code"
              label="code"
              value={state.code}
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
  );
}
export default MyNFTs