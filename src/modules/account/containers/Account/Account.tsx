import { useEffect, useState, SyntheticEvent } from "react";
import { FileInfo } from '@uploadcare/react-widget';

import { Input } from "modules/account/components/FormComponents";
import Uploader from 'modules/common/components/Uploader';
import useAppSelector from 'helpers/useAppSelector';
import type { ProfileProps } from 'modules/common/types';
// import type { ItemProps } from 'modules/account/types';
import { 
  // WalletIcon, 
  IconUserCircle, 
  IconMessage, 
  IconImagePlus, 
  IconUserCapture } from "modules/common/components/Icons";
import { updateProfile, getBoughtItems } from "../../apis";
import { getProfile } from "modules/common/apis";
import { UserNameModal, EmailModal, PasswordModal } from "./AccountModals";
import MySignature from './MySignature';
import MyNFTs from './MyNFTs';

let initialState = {
  firstName: '',
  lastName: '',
  bio: '',
  photo: '',
  signature: '',
}

const Account = () => {
  const [state, setState] = useState(initialState);
  const [isUpload, setIsUpload] = useState(false);
  const [isUse, setIsUse] = useState(false);
  const [openNFT, setOpenNFT] = useState(false);

  const profile: ProfileProps = useAppSelector('common.profile');
  // const boughtList: Array<ItemProps> = useAppSelector('account.boughtList');

  useEffect(() => {
    setState({
      ...state,
      firstName: profile.first_name || '',
      lastName: profile.last_name || '',
      photo: profile.photo || '',
      bio: profile.bio || '',
      signature: profile.signature || '',
    })
    // eslint-disable-next-line
  }, [profile])

  useEffect(() => {
    getBoughtItems()
  }, [])

  const handleChange = (e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setState({
      ...state,
      [name]: value,
    })
  }

  const onUploadImage = (fileInfo: FileInfo) => {
    setState({
      ...state,
      photo: fileInfo.cdnUrl || '',
    });
  };

  const handleNFT= (url: string) => {
    setState({
      ...state,
      photo: url,
    });
    setOpenNFT(false)
  }

  const onUploadSignature = (fileInfo: FileInfo) => {
    setState({
      ...state,
      signature: fileInfo.cdnUrl || '',
    });
  };

  const handleType = (url: string) => {
    setState({
      ...state,
      signature: url,
    });
  }

  const handleSave = () => {
    let obj = {
      first_name: state?.firstName || profile.first_name,
      last_name: state?.lastName || profile.last_name,
      bio: state?.bio || profile.bio,
      photo: state?.photo || profile.photo,
      signature: state?.signature || profile.signature
    }
    updateProfile(obj, () => getProfile());
  }
  
  return(
    <>
      <div className="flex flex-row mb-2">
        <h1 className="text-c-darkgray font-semibold text-base md:text-2xl ml-2">
          My Account
        </h1>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full lg:w-1/3 md:pr-3 mb-5 lg:mb-0 relative">
          {isUse &&
          <div className="absolute -left-20 -top-8">
            <div className="relative mx-2">
              <div className="bg-black text-white text-xs rounded py-1 px-4 right-0 bottom-full">
                Set NFTs as profile picture
                <svg className="absolute text-black h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255">
                  <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
                </svg>
              </div>
            </div>
          </div>}
          {isUpload &&
          <div className="absolute -left-14 -top-8">
            <div className="relative mx-2">
              <div className="bg-black text-white text-xs rounded py-1 px-4 right-0 bottom-full">
                Upload your profile picture
                <svg className="absolute text-black h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255">
                  <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
                </svg>
              </div>
            </div>
          </div>}
          <MyNFTs setIsUse={setIsUse} handleNFT={handleNFT} open={openNFT} setOpen={setOpenNFT} />
          <Uploader
            onSuccess={onUploadImage}
            imagesOnly
            imgClassname="absolute right-20">
            <span 
              onMouseEnter={() => setIsUpload(true)}
              onMouseLeave={() => setIsUpload(false)}
              className="absolute bg-black hover:bg-gray-500 rounded-full border border-black p-0.5 left-7 cursor-pointer">
              <IconImagePlus className="text-white" />
            </span>
          </Uploader>
          <div className="pt-3">
            <div className="mx-auto w-8/12 md:w-1/2 lg:w-10/12 h-56 border-gray-200 border-2 rounded-full overflow-hidden relative">
              {state?.photo ?
                <img src={state?.photo} alt="profile-pic" className="w-full h-full object-cover" />
              : <IconUserCapture className="w-full h-full text-gray-200" />}
            </div>
          </div>
          <MySignature handleType={handleType} onUploadSignature={onUploadSignature} signature={state?.signature || ''} />
        </div>  
        <div className="flex flex-col w-full md:w-2/3 space-y-4 md:border-l border-gray-100 md:pl-3">
          <h1 className="text-c-darkgray font-semibold text-base md:text-base ml-2">
            Account Info
          </h1>
          {/* <p className="text-sm">TF Wallet Account Address</p>
          {(profile?.tf_wallets || []).map((item, i) => {
            return(
              <Input
                type="text"
                name="name"
                label={item?.network === 'algo' ? 'Algorand' : 'BSC'}
                icon={<WalletIcon />}
                disabled={true}
                value={item?.address || ''}
                handleChange={handleChange}
                />
            )
          })} */}
            <div className="flex flex-row space-x-2">
              <Input
                type="text"
                name="name"
                width="w-full"
                label="User Name"
                icon={<IconUserCircle />}
                disabled={true}
                value={profile?.username || ''}
                handleChange={handleChange}
                />
              <UserNameModal />
            </div> 
            <div className="flex flex-row space-x-2">
              <Input
                type="email"
                name="email"
                width="w-full"
                label="Email"
                icon={<IconMessage />}
                disabled={true}
                value={profile?.email || ''}
                handleChange={handleChange}
                />
              <EmailModal />
            </div>
            <div className="flex">
              <PasswordModal />
            </div>
          <div className="border-t border-gray-100 p-3 pt-6 space-y-3">
            <Input
              type="text"
              name="firstName"
              label="First Name"
              value={state.firstName}
              handleChange={handleChange}
              />
            <Input
              type="text"
              name="lastName"
              label="Last Name"
              value={state.lastName}
              handleChange={handleChange}
              />
            <Input
              type="text"
              name="bio"
              label="Bio"
              value={state.bio}
              handleChange={handleChange}
              />
            <div className="w-full">
              <button 
                type="button"
                onClick={handleSave}
                className="bg-blue-900 text-white font-semibold text-sm py-1 px-3 rounded float-right w-1/2 lg:w-2/12">
                  Save
              </button>
            </div>
          </div>  
        </div>
      </div>
      {/* {isType && <TypeSignature handleType={handleType} close={() => setIsType(false)} />} */}
    </>
  )
}
export default Account;