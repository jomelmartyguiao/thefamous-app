import { useState, SyntheticEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { FileInfo } from '@uploadcare/react-widget';

import { Input, TextArea } from "../components/FormComponents";
import Uploader from 'modules/common/components/Uploader';
import { 
  IconWebsite, 
  IconTwitter, 
  IconTelegram, 
  IconInstagram, 
  IconDiscord,
  IconImage,
  IconArrowBack
} from "modules/common/components/Icons";
import { createCollection } from '../apis';

let initialState = {
  name: '',
  details: '',
  logoName: '',
  logo: '',
  bannerName: '',
  banner: '',
  website: '',
  twitter: '',
  instagram: '',
  telegram: '',
  discord: '',
}

const AddCollection = () => {
  const [state, setState] = useState(initialState);

  const history = useHistory();

  const handleChange = (e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setState({
      ...state,
      [name]: value,
    })
  }

  const onUploadLogo = (fileInfo: FileInfo) => {
    setState({
      ...state,
      logoName: fileInfo.name || '',
      logo: fileInfo.cdnUrl || '',
    });
    // setLoadingUploadcare(false)
  };

  const onUploadBanner = (fileInfo: FileInfo) => {
    setState({
      ...state,
      bannerName: fileInfo.name || '',
      banner: fileInfo.cdnUrl || '',
    });
    // setLoadingUploadcare(false)
  };

  const handleSubmit = () => {
    createCollection(state, () => {
      setState({
        ...state,
        name: '',
        details: '',
        logoName: '',
        logo: '',
        bannerName: '',
        banner: '',
        website: '',
        twitter: '',
        instagram: '',
        telegram: '',
        discord: '',
      })
      history.push("/profile/mynfts")
    });
  }

  return(
    <>
      <div className="w-full md:w-3/4 border rounded-md px-5 md:px-10 py-6 relative shadow-md">
        <div className="flex flex-row">
          <Link to="/profile/mynfts" className="text-base my-auto"><IconArrowBack /></Link> 
          <h1 className="text-c-darkgray font-semibold text-base md:text-2xl ml-2">
            Add Collection
          </h1>
        </div>
        <div className="flex flex-col space-y-4 mt-4">
          {/* <Input
            type="text"
            name="code"
            label="Code"
            value={state.code}
            handleChange={handleChange}
           /> */}
          <Input
            type="text"
            name="name"
            label="Collection Name"
            value={state.name}
            handleChange={handleChange}
            />
          <TextArea 
            name="details"
            label="Details"
            value={state.details}
            handleChange={handleChange}
          />
          <Input
            type="text"
            name="website"
            label="Website"
            value={state.website}
            icon={<IconWebsite />}
            handleChange={handleChange}
            />
          <Input
            type="text"
            name="twitter"
            label="Twitter"
            value={state.twitter}
            icon={<IconTwitter />}
            handleChange={handleChange}
            />
          <Input
            type="text"
            name="instagram"
            label="Instagram"
            value={state.instagram}
            icon={<IconInstagram />}
            handleChange={handleChange}
            />
          <Input
            type="text"
            name="telegram"
            label="Telegram"
            value={state.telegram}
            icon={<IconTelegram />}
            handleChange={handleChange}
            />
          <Input
            type="text"
            name="discord"
            label="Discord"
            value={state.discord}
            icon={<IconDiscord />}
            handleChange={handleChange}
            />
          <div>
            <label className="text-gray-900 tracking-wider px-1 uppercase text-xs">Logo</label>
            {state.logo ? 
            <p className="text-sm text-c-blue cursor-pointer">
              <a href={state.logo} target="_blank" rel="noopener noreferrer" className="truncate">
                <IconImage /> {state.logoName}
              </a>
            </p>
            : 
            <div className="flex">
              <Uploader
                onSuccess={onUploadLogo}
                imagesOnly
                imgClassname="m-auto"
                className="text-white px-2 py-2 w-1/2 md:w-1/4 text-sm font-semibold bg-blue-500 rounded-md text-center cursor-pointer">
                {/* // crop="free, 16:9, 4:3, 5:4, 1:1"
                // inputAcceptTypes="application/pdf" */}
                Upload Image
              </Uploader>
              </div>
            }
          </div>
          <div>
            <label className="text-gray-900 tracking-wider px-1 uppercase text-xs">Banner</label>
            {state.banner ? 
            <p className="text-sm text-c-blue cursor-pointer">
              <a href={state.banner} target="_blank" rel="noopener noreferrer" className="truncate">
                <IconImage /> {state.bannerName}
              </a>
            </p>
            : 
            <div className="flex">
              <Uploader
                onSuccess={onUploadBanner}
                imagesOnly
                imgClassname="m-auto"
                className="text-white px-2 py-2 w-1/2 md:w-1/4 text-sm font-semibold bg-blue-500 rounded-md text-center cursor-pointer">
                {/* // crop="free 16:9, 4:3, 5:4, 1:1"
                // inputAcceptTypes="application/pdf" */}
                Upload Image
              </Uploader>
              </div>
            }
          </div>
          <div className="w-full">
            <button 
              type="button"
              onClick={handleSubmit}
              className="bg-blue-900 text-white font-semibold py-2 px-4 rounded float-right w-1/4">
                Submit
            </button>
          </div>
        </div> 
      </div>
    </>
  )
}
export default AddCollection;