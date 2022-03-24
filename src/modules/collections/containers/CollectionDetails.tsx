import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Countdown from "react-countdown";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import LazyLoad from 'react-lazyload';

import { getItemData, buyItem, heartItem, claimItem, buyUsingMyAlgo, confirmTxn } from 'modules/explore/apis';
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
  // TimeIcon, 
  IconArrowBack,
  IconCopyFile } from 'modules/common/components/Icons'
import LoadingImg from 'modules/collections/components/LoadingImg';
import bnb from 'images/bnblogo.png';
import algo from 'images/algorand-logo.png';
import eth from 'images/etherium-logo.png';
import algosdk, { algosToMicroalgos } from 'algosdk';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { getWalletConnectConnector } from 'modules/common/constants/connector';
import { formatJsonRpcRequest } from '@json-rpc-tools/utils';
import Modal from 'modules/common/components/Modal';
// import MyAlgoConnect from '@randlabs/myalgo-connect';
// import algosdk from 'algosdk';

const { str2buffer } = require('string-encode');

const CollectionItem = () => {
  const [loadingItem, setIsLoadingItem] = useState(false);
  const [buy, setBuy] = useState(false);
  const [sent, setSent] = useState(false);
  const [description, setDescription] = useState(true);
  const [details, setDetails] = useState(false);
  const [amount, setAmount] = useState('');
  const [bscAddress, setAddress] = useState('');
  const [reference, setReference] = useState('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const location = useLocation();
  const searchParams: any = stringToObject(location.search);
  const profile = useAppSelector('common.profile');
  const itemData: ItemProps = useAppSelector('noAuth.itemData');
  const address = localStorage.getItem('wallet_address');
  const walletconnect = localStorage.getItem('walletconnect');

  interface TxnProps {
    senderAddress: string;
    receiverAddress: string;
    amount: number;
    note: string;
  }

  interface BuyProps {
    address: string
    amount: string
    reference: string
  }

  useEffect(() => {
    getItemLoader()
    // eslint-disable-next-line
  }, [searchParams?.itemCode, searchParams?.collectionCode])

  const getItemLoader = () => {
    setIsLoadingItem(true)
    getItemData(searchParams?.collectionCode, searchParams.itemCode, () => setIsLoadingItem(false));
  }

  const handleBuy = () => {
    profile.network === "bsc" ?
    buyItem(
      searchParams?.collectionCode, 
      searchParams.itemCode,
      (res: BuyProps) => {
        setBuy(true);
        setAmount(res?.amount);
        setAddress(res?.address);
        setReference(res?.reference);
      },
    ) :
    buyUsingMyAlgo(
      searchParams?.collectionCode,
      searchParams.itemCode,
      profile.network,
      (res) => {
        if (address && res) {
          const { data } = res;
          makePaymentTxn({
            senderAddress: address,
            receiverAddress: data.address,
            amount: data.amount,
            note: data.reference
          })
        }
      }
    )
  }

  const makePaymentTxn = async ({ senderAddress, receiverAddress, amount, note }: TxnProps) => {
    try {
      const algodClient = new algosdk.Algodv2("", process.env.REACT_APP_ALGO_URL, '');
      const microAlgosAmount = algosToMicroalgos(amount);
      const convertedNote = str2buffer(note, false);
      const suggestedParams = await algodClient.getTransactionParams().do();
      const txn = await algosdk.makePaymentTxnWithSuggestedParamsFromObject({
          suggestedParams: {
              ...suggestedParams
          },
          from: senderAddress,
          to: receiverAddress,
          amount: microAlgosAmount,
          note: convertedNote
      });

      interface ResponseProps { txId: string };
      let response: ResponseProps;
      if (walletconnect) {
        setIsModalOpen(true);
        // WALLETCONNECT PARAMS CREATION =============>
        const connector = getWalletConnectConnector();
        const txns = [txn]
        const txnsToSign = txns.map(txn => {
            const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
            return {
                txn: encodedTxn,
                message: note,
                // Note: if the transaction does not need to be signed (because it's part of an atomic group
                // that will be signed by another party), specify an empty singers array like so:
                // signers: [],
            };
        });
        const requestParams = [txnsToSign];
        const request = await formatJsonRpcRequest("algo_signTxn", requestParams);
        const result: Array<string | null> = await connector.sendCustomRequest(request);
        const decodedResult = await result.map(element => {
            return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
        });
        if (!decodedResult[0]) {
          throw new Error("There was a problem signing transaction!"); 
        }
        response = await algodClient.sendRawTransaction(decodedResult[0]).do();
      } else {
        // MYALGO WALLET PARAMS CREATION =============>
        const myAlgoConnect = new MyAlgoConnect();
        const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
        response = await algodClient.sendRawTransaction(signedTxn.blob).do();
      }

      await confirmTxn({
        collectionCode: searchParams?.collectionCode,
        itemCode: searchParams.itemCode,
        txid: response.txId,
        reference: note,
        network: profile.network,
        callback: () => {
          setIsModalOpen(false);
          getItemData(searchParams?.collectionCode, searchParams.itemCode)
        }
      })
    } catch(err) {
      toast.error("Operation Cancelled");
      setIsModalOpen(false)
    }
  }

  const handleHeart = () => {
    if(address){
      heartItem(searchParams?.collectionCode, searchParams.itemCode, () => {
        getItemData(searchParams?.collectionCode, searchParams.itemCode)
      })
    }else{
      toast.error("Please log in your account.")
    }
  }

  const handleClaim = () => {
    claimItem(searchParams?.collectionCode, searchParams.itemCode, () => {
      getItemData(searchParams?.collectionCode, searchParams.itemCode)
    })
  }

  const handleCopy = () => {
    toast.success('Copied on Clipboard');
  }

  const handleConfirm = () => {
    confirmTxn({
      collectionCode: searchParams?.collectionCode,
      itemCode: searchParams.itemCode,
      reference: reference,
      network: profile.network,
      callback: (res) => {
        getItemData(searchParams?.collectionCode, searchParams.itemCode)
        setSent(true)
      }
    })
  }

  return (
    <>
    <div className="pt-24 md:pt-32 pb-10 flex flex-col min-w-3/4 bg-contain bg-center bg-famous bg-fixed bg-opacity-10 bg-no-repeat">
      <div className="flex flex-col md:flex-row max-w-7xl w-full md:space-x-5 mx-auto px-3 md:px-0">
        <div className="w-full md:w-2/5 flex flex-col space-y-4">
          <Link to={`/collection/${searchParams.collectionCode}`} className='flex flex-row text-base hover:text-blue-900 '>
            <IconArrowBack />
            <span className='ml-2'>Back</span>
          </Link>
          <div className="flex flex-col space-y-3 border p-2 rounded-md shadow-sm bg-white">
            <div className="flex justify-between">
              <div className="flex space-x-1 items-center">
                <IconEye className="text-gray-400 hover:text-gray-500"/>
                <h1 className="text-sm text-gray-500">{itemData?.views || 0}</h1>
              </div>
              <div 
                onClick={handleHeart}
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
                    {itemData?.asset_id ?
                      <a href={`https://algoexplorer.io/asset/${itemData?.asset_id}`} rel="noreferrer" target="_blank">
                        {/* {(address || '').substring(0,4) +'...'+ (address || '').substring((address || '').length - 7)} */}
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
        <div className="flex flex-col pt-5 md:pt-10 p-0 md:p-3 w-full md:w-3/5">
          <h1 className="text-2xl text-gray-500 font-semibold">{itemData?.name} #{itemData?.series}</h1>
          <h1 className="text-lg text-blue-500">@TheFamous</h1>
          <div className="flex space-x-3 md:space-x-8 mt-3">
            <h1 className="text-sm text-gray-500">Owned by <span className="text-blue-500">{itemData.owner || '---'}</span></h1>
            <div className="flex items-center space-x-1">
              <IconEye className="text-gray-500"/>
              <h1 className="text-sm text-gray-500">{itemData?.views || 0} Views</h1>
            </div>
            <div className="flex items-center space-x-1 cursor-pointer" onClick={handleHeart}>
              <HeartIcon className="text-gray-500"/>
              <h1 className="text-sm text-gray-500">{itemData?.hearts || 0} Hearts</h1>
            </div>
          </div>
          <div className="flex flex-col border rounded-md shadow-sm mt-2 bg-white">
            {+itemData?.sold !== 1 &&
            <div className="flex items-center justify-between p-5 border-b">
              <div className='flex items-center space-x-1'>
                <OfferIcon className="text-gray-500"/>
                <h1 className="text-base">For Sale </h1>
              </div>
            </div>}
            <div className="flex flex-col space-y-2 px-5 py-4">
              {+itemData?.sold === 1 ?
                <div className="rounded-md bg-gray-400 text-white font-semibold text-lg flex items-center 
                  justify-center p-2 w-52">
                  SOLD
                </div>
                : 
                <>
                  <h1 className="text-sm text-gray-500">Current price: ${itemData?.price?.usd}</h1>
                  <div className="flex items-center">
                    { 
                      !address ?
                      <div className='flex flex-row space-x-4 w-full'>
                        {itemData.network === 'polygon' ?
                          <div className='flex flex-col w-1/3'>
                            <div className='flex flex-row items-center mx-auto'>
                              <div><img src={eth} alt="ETH logo" className="h-6 object-contain" /></div>
                              <h1 className="text-3xl font-bold ml-2">{itemData?.price?.eth} ETH</h1>
                            </div>
                            {itemData.button === "BUY" &&
                              <a 
                                href={`https://opensea.io/assets/matic/0x7580b073c56e440f3bc68066b85d7464a48fcad3/${itemData.series}`}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="rounded-md bg-blue-900 hover:bg-blue-800 transform duration-200 w-full
                                  ease-in-out text-white flex space-x-2 items-center justify-center p-3 cursor-pointer">
                                  <p className='font-semibold text-base'>Buy on OpenSea</p>
                              </a>
                              // <Link
                              //   to='/comingsoon'
                              //   target="_blank" 
                              //   rel="noopener noreferrer"
                              //   className="rounded-md bg-blue-900 hover:bg-blue-800 transform duration-200 w-full
                              //     ease-in-out text-white flex space-x-2 items-center justify-center p-3 cursor-pointer">
                              //   <p className='font-semibold text-base'>Buy on OpenSea</p>
                              // </Link>
                            }
                          </div>
                        : <>
                          <div className='flex flex-col w-1/3'>
                            <div className='flex flex-row items-center mx-auto'>
                              <img src={bnb} alt="Bnb logo" className="h-6 object-contain" />
                              <h1 className="text-3xl font-bold ml-3">{itemData?.price?.bnb} BNB</h1>
                            </div>
                            {itemData.button === "BUY" &&
                            <Link to="/login" className="rounded-md bg-blue-900 hover:bg-blue-800 transform 
                              duration-200 ease-in-out text-white font-semibold text-xs flex space-x-2 items-center
                              justify-center p-3 w-full cursor-pointer">
                                <p className='font-semibold text-base'>BUY</p>
                            </Link>}
                          </div>
                          <div className='flex flex-col w-1/3'>
                            <div className='flex flex-row items-center px-2'>
                              <div><img src={algo} alt="ALGO logo" className="h-6 object-contain" /></div>
                              <h1 className="text-3xl font-bold ml-1">{itemData?.price?.algo} ALGO</h1>
                            </div>
                            {itemData.button === "BUY" &&
                            <Link to="/login" className="rounded-md bg-blue-500 hover:bg-blue-600 transform 
                              duration-200 ease-in-out text-white font-semibold text-xs flex space-x-2 items-center 
                              justify-center p-3 w-full cursor-pointer">
                                <p className='font-semibold text-base'>BUY</p>
                            </Link>}
                          </div>
                          </>} 
                      </div> 
                      : <>
                        {!buy &&
                        <div className='flex flex-row space-x-4 w-full'>
                          {itemData.network === 'polygon' ?
                            <div className='flex flex-col w-1/3'>
                              <div className='flex flex-row items-center mx-auto'>
                                <div><img src={eth} alt="ETH logo" className="h-6 object-contain" /></div>
                                <h1 className="text-3xl font-bold ml-2">{itemData?.price?.eth} ETH</h1>
                              </div>
                              {itemData.button === "BUY" &&
                              <a 
                                href={`https://opensea.io/assets/matic/0x7580b073c56e440f3bc68066b85d7464a48fcad3/${itemData.series}`}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="rounded-md bg-blue-900 hover:bg-blue-800 transform duration-200 w-full
                                  ease-in-out text-white flex space-x-2 items-center justify-center p-3 cursor-pointer">
                                  <p className='font-semibold text-base'>Buy on OpenSea</p>
                              </a>
                              // <Link
                              //   to='/comingsoon'
                              //   target="_blank" 
                              //   rel="noopener noreferrer"
                              //   className="rounded-md bg-blue-900 hover:bg-blue-800 transform duration-200 w-full
                              //     ease-in-out text-white flex space-x-2 items-center justify-center p-3 cursor-pointer">
                              //   <p className='font-semibold text-base'>Buy on OpenSea</p>
                              // </Link>
                              }
                            </div>
                            : <>
                              {profile?.network === 'bsc' &&
                              <div className='flex flex-col w-1/3'>
                                <div className='flex flex-row items-center mx-auto'>
                                  <div><img src={bnb} alt="Bnb logo" className="h-6 object-contain" /></div>
                                  <h1 className="text-3xl font-bold ml-2">{itemData?.price?.bnb} BNB</h1>
                                </div>
                                {itemData.button === "BUY" &&
                                <div 
                                  onClick={handleBuy}
                                  className="rounded-md bg-blue-900 hover:bg-blue-800 transform duration-200 
                                  ease-in-out text-white flex space-x-2 items-center 
                                  justify-center p-3 w-full cursor-pointer">
                                    <p className='font-semibold text-base'>BUY</p>
                                </div>}
                              </div>}
                              {profile?.network === 'algorand' &&
                              <div className='flex flex-col w-1/3'>
                                <div className='flex flex-row items-center mx-auto'>
                                  <div><img src={algo} alt="ALGO logo" className="h-7 object-contain" /></div>
                                  <h1 className="text-3xl font-bold ml-1">{itemData?.price?.algo} ALGO</h1>
                                </div>
                                {itemData.button === "BUY" &&
                                <div 
                                  onClick={handleBuy}
                                  className="rounded-md bg-blue-900 hover:bg-blue-800 transform duration-200 
                                  ease-in-out text-white flex space-x-2 items-center 
                                  justify-center p-3 w-full cursor-pointer border-l">
                                    <p className='font-semibold text-base'>BUY</p>
                                </div>}
                              </div>}
                            </>
                          }
                        </div>}
                      </>
                    }
                  </div>
                </>
              }
              <div className="flex flex-row space-x-4">
                {buy ? 
                  <div className="rounded-md border bg-white bg-opacity-70 border-gray-100 h-auto font-medium p-5 shadow-md">
                    <p className='text-base text-gray-500'>
                      To purchase this NFT, please send <span className='font-semibold text-gray-900'>{amount} BNB</span> to this address: 
                      <CopyToClipboard options={{message: 'None'}} text={bscAddress}> 
                        <span 
                          className='font-semibold ml-1 cursor-pointer text-gray-900' 
                          onClick={handleCopy}>
                          {bscAddress} <IconCopyFile />
                        </span>
                      </CopyToClipboard>
                    </p>
                    <p className='text-base text-gray-500'>
                      From your own wallet(BEP20) and not from an exchange.
                    </p>
                    {sent 
                    ? <>
                        <p className='text-base text-gray-500'>Checking wallet balance to confirm purchase ...</p>
                        <span className='text-base text-gray-500 mr-2'>
                          Will reset in
                        </span>
                        <Countdown date={Date.now() + 60000}>
                          <Completionist />
                        </Countdown>
                      </>
                    :
                    <button 
                      type="button"
                      onClick={handleConfirm}
                      className="p-2 text-lg rounded-md border px-4 border-green-500 font-semibold bg-green-500 hover:bg-transparent
                    text-white hover:text-green-500 shadow-md transform duration-200 ease-in-out w-52 mt-3">
                        I sent the BNB
                    </button>}
                  </div>
                :
                  <div className='w-1/3'>
                    {
                      (itemData.button === "PROCESSING" || itemData.button === "LOCKED") &&
                      <button
                        disabled
                        className='rounded-md bg-gray-300 text-white font-semibold text-xs flex space-x-2 
                          items-center justify-center p-3 w-full'>
                        {itemData.button}
                      </button>
                    }
                    {
                      itemData.button === "CLAIM" &&
                      <div 
                        onClick={handleClaim}
                        className="rounded-md bg-green-500 hover:bg-green-700 transform duration-200 ease-in-out 
                          text-white font-semibold text-lg flex items-center justify-center p-2 w-full cursor-pointer">
                          Claim Now
                      </div>
                    }
                  </div>
                }
              </div>
            </div>
          </div>
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
                    {itemData?.asset_id ?
                      <a href={`https://algoexplorer.io/asset/${itemData?.asset_id}`} rel="noreferrer" target="_blank">
                        {/* {(address || '').substring(0,4) +'...'+ (address || '').substring((address || '').length - 7)} */}
                        {itemData?.asset_id}
                      </a>
                    : <span className="text-sm text-gray-500">---</span>}
                  </h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="text-sm text-gray-500">Token ID</h1>
                  <h1 className="text-sm text-gray-500">{itemData?.series}</h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="text-sm text-gray-500">Token Standard</h1>
                  <h1 className="text-sm text-gray-500">{itemData?.token_standard}</h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="text-sm text-gray-500">Blockchain</h1>
                  <h1 className="text-sm text-gray-500 capitalize">{itemData?.network}</h1>
                </div>
              </h1>
            </div>}
          </div>
          <div className="border rounded-md shadow-sm mt-4 p-5 bg-white">
            <p className='text-sm text-gray-500 font-semibold'>Purchase rules</p>
            <ul className='list-disc ml-5'>
              <li className='text-sm text-gray-500'>
                You can buy the NFT with BNB or (soon) with Algo tokens.
              </li>
              <li className='text-sm text-gray-500'>
                You need first to sign up on The Famous platform
              </li>
              <li className='text-sm text-gray-500'>
                <p>
                  When you own a Famous NFT, you can join the Famous Founder Club on <a href="https://discord.gg/caBbRnmjkN" className='text-blue-600' target="_blank" rel="noopener noreferrer">Discord</a> (go to ‘My account/My NFTs’ and use your private code).
                </p>
              </li>
              <li className='text-sm text-gray-500'>
                <p>
                  On <a href="https://discord.gg/caBbRnmjkN" className='text-blue-600' target="_blank" rel="noopener noreferrer">Discord</a> you can invite a minimum of 3 friends to get a chance to be rewarded with a Free Famous NFT!
                </p>
              </li>
            </ul>
            <p className='text-sm text-gray-500 italic'>
              (If you are a Founder Club member and 1 of your friend buy 1 NFT, you will receive a Free NFT. (more friends you invite, more chances for you to get I NFT free).
            </p>
          </div>
          <div className="border rounded-md shadow-sm mt-4 p-5 bg-white">
            <p className='text-sm text-gray-500 font-semibold'>The Famous NFTs limited series includes the following:</p>
            <ul className='list-disc ml-5'>
              <li className='text-sm text-gray-500'>
                8000 Famous NFTs that will allow holders to join the Famous Founder Club.
              </li>
              <li className='text-sm text-gray-500'>
                800 unique and super rare Famous NFTs that will be sold via auctions and will allow to join the Famous VIP Club.
              </li>
              <li className='text-sm text-gray-500'>
                The holders of Famous NFTs are allowed to join the Discord Founder Club and get access to its exclusive privileges.
              </li>
              <li className='text-sm text-gray-500'>
                The holders of super rare Famous NFTs will be invited to the Discord VIP Club to get specific exclusive advantages.
              </li>
            </ul>
          </div>
          {/* <p className='text-sm text-gray-500 text-center font-semibold mt-3'>Tutorial video to join whitelist using the bot</p>
          <div className='hidden md:flex mx-auto'>
            <video height="100" width="350" controls className="border rounded-lg border-gray-900 mt-2" >
              <source src="https://ucarecdn.com/f2bbeb4b-6265-4ca3-9ed9-24c47efdd7a6/Screenrecorder2022010515071870.mp4" />
            </video>
          </div>
          <div className='flex md:hidden mx-auto'>
            <video width="350" height="300" controls className="border rounded-lg border-gray-900 mt-3">
              <source src="https://ucarecdn.com/f2bbeb4b-6265-4ca3-9ed9-24c47efdd7a6/Screenrecorder2022010515071870.mp4" />
            </video>
          </div> */}
        </div>
      </div>
    </div>

    <Modal
      isOpen={isModalOpen}
      hideHeader
    >
      <div className='text-center p-3 space-y-3'>
        <div className='flex items-center justify-center space-x-1 w-full'>
          <p className='font-black text-blue-900 text-xs'>PROCESSING TRANSACTION</p>
          <div className="animate-pulse inline-flex h-2 w-2 rounded-full bg-blue-900"></div>
          <div className="animate-pulse inline-flex h-2 w-2 rounded-full bg-blue-900"></div>
          <div className="animate-pulse inline-flex h-2 w-2 rounded-full bg-blue-900"></div>
        </div>
        <small>Please pay using your mobile.</small>
      </div>
    </Modal>
    </>
  )
}

export default CollectionItem;

const Completionist = () => <span>Reset</span>;
