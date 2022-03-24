import { useState } from 'react';

import Uploader from 'modules/common/components/Uploader';
import { IconSignature, IconImagePlus } from "modules/common/components/Icons";
import Signature from './Signature';

interface MySignatureProps {
  onUploadSignature: any;
  handleType: any;
  signature: string
}

const MySignature = ({ onUploadSignature, handleType, signature }: MySignatureProps) => {
  const [isType, setIsType] = useState(false);
  const [isUpload, setIsUpload] = useState(false);

  return(
    <>
      <div className='flex flex-row mt-5 relative'>
        {isType &&
          <div className="absolute -right-9 -top-7">
            <div className="relative mx-2">
              <div className="bg-black text-white text-xs rounded py-1 px-4 right-0 bottom-full">
                Type your signature
                <svg className="absolute text-black h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255">
                  <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
                </svg>
              </div>
            </div>
          </div>}
        {isUpload &&
          <div className="absolute -right-16 -top-7">
            <div className="relative mx-2">
              <div className="bg-black text-white text-xs rounded py-1 px-4 right-0 bottom-full">
                Upload your signature
                <svg className="absolute text-black h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255">
                  <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
                </svg>
              </div>
            </div>
          </div>} 
        <div className='w-1/2'>
          <h1 className="text-c-darkgray font-semibold text-base md:text-base ml-1 mb-1">
            My Signature
          </h1>
        </div>
        <div className='w-1/2'>
          <Uploader
            onSuccess={onUploadSignature}
            imagesOnly
            imgClassname="absolute right-1">
            <span 
              onMouseEnter={() => setIsUpload(true)}
              onMouseLeave={() => setIsUpload(false)}
              className="absolute p-1 right-1 cursor-pointer">
              <IconImagePlus className="hover:text-blue-500" />
            </span>
          </Uploader>
          <Signature handleType={handleType} setIsType={setIsType} />
        </div>
      </div>
      <div className="relative">
        <div className="w-full h-32 border-gray-200 border-2 rounded-md overflow-hidden relative flex">
          {signature ?
            <img src={signature} alt="profile-pic" className="w-full h-full" />
          : <IconSignature className="w-full h-3/4 text-gray-200 my-auto" />}
        </div>
        <p className="text-xs pl-2">Your signature will be requested for the trading</p>
        <p className="text-xs pl-2">and transfer of NFT documents (NFT Passport).</p>
      </div>
    </>
  )
}
export default MySignature;