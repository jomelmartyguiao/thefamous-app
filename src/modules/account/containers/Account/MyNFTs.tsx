import { useState } from 'react';

import useAppSelector from 'helpers/useAppSelector';
import type { ItemProps } from 'modules/account/types';
import { IconCircleInfo, IconCircleClose } from "modules/common/components/Icons";

import pandaWhite from 'images/panda-white.png';

interface MyNFTsProps {
  setIsUse: any;
  handleNFT: any;
  setOpen: any;
  open: boolean;
}

const MyNFTs = ({ setIsUse, handleNFT, setOpen, open }: MyNFTsProps) => {
  const [hover, setHover] = useState(false)
  const [active, setActive] = useState('')
  
  const boughtList: Array<ItemProps> = useAppSelector('account.boughtList');

  const handleHover = (item: string) => {
    setHover(true)
    setActive(item)
  } 

  return(
    <>
      <span 
        onMouseEnter={() => setIsUse(true)}
        onMouseLeave={() => setIsUse(false)}
        onClick={() => setOpen(true)}
        className="absolute bg-black hover:bg-gray-500 rounded-full border border-black p-0.5 left-0 cursor-pointer">
        <img alt="panda" src={pandaWhite} className="w-5 h-5" />
      </span>
      {open &&
        <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full z-10">
          <div className="bg-white rounded-lg w-3/4 h-lg border border-gray-100 shadow-2xl p-5 overflow-y-auto">
            <div className="relative">
              <div className="text-c-darkgray font-semibold text-2xl">My NFTs</div>
              <button
                onClick={() => setOpen(false)}
                className="text-red-500 absolute right-0 -top-2 disabled:text-red-200"
              >
                <IconCircleClose width="18" height="18" />
              </button>
            </div>
            <h1 className="text-c-darkgray text-sm">Click the NFT you want to use.</h1>
              {boughtList.length === 0 ?
                <h1 className="text-c-darkgray italic text-xl w-full text-center py-10">
                  <IconCircleInfo /> No NFTs to display.
                </h1>
              :
                <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mt-2">
                  {boughtList.map((item, i) => (
                    <div 
                      key={i}
                      onMouseEnter={() => handleHover(item.code)}
                      onMouseLeave={() => handleHover('')}
                      onClick={() => handleNFT(item.image)}
                      className="flex flex-col border rounded-md relative cursor-pointer">
                      {(active === item.code && hover) && 
                        <div className='bg-gray-100 h-full w-full top-0 opacity-60 absolute flex'>
                          <span className="m-auto text-2xl">USE</span>
                        </div>}
                      <img 
                        src={item.image} 
                        alt="collection" 
                        className="bg-gray-400 object-cover h-auto w-full shadow-lg"
                      />
                    </div>
                  ))}
              </div>}
          </div>
        </div>}
    </>
  );
}
export default MyNFTs