import { useEffect, useState, SyntheticEvent, Fragment } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { FileInfo } from '@uploadcare/react-widget';

import { Input, TextArea, Select } from "../components/FormComponents";
import Uploader from 'modules/common/components/Uploader';
import type { TraitProps } from 'modules/account/types';
import useAppSelector from 'helpers/useAppSelector';
import {
  IconImage,
  IconArrowBack
} from "modules/common/components/Icons";
import { createItem, getCollectionTraits } from '../apis';

let initialState = {
  name: '',
  details: '',
  iconName: '',
  icon: '',
  imageName: '',
  image: '',
}

let traits = {
  type: '',
  hat: '',
  hair: '',
  "face-accessories": '',
  beard: '',
  clothes: '',
  "body-accessories": '',
  background: '',
  skin: '',
}

const AddItem = () => {
  const [state, setState] = useState(initialState);
  const [trait, setTrait] = useState(traits);

  const params: any = useParams();
  const history = useHistory();
  const traitList: Array<TraitProps> = useAppSelector('account.traitList');

  useEffect(() => {
    getCollectionTraits(params.code)
  }, [params.code])

  const handleChange = (e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setState({
      ...state,
      [name]: value,
    })
  }

  const handleSelect = (e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setTrait({
      ...trait,
      [name === 'face-accessories' ? 'faceAccessories' : name === 'body-accessories' ? 'bodyAccessories' : name ]: value,
    })
  }

  const onUploadIcon = (fileInfo: FileInfo) => {
    setState({
      ...state,
      iconName: fileInfo.name || '',
      icon: fileInfo.cdnUrl || '',
    });
    // setLoadingUploadcare(false)
  };

  const onUploadImage = (fileInfo: FileInfo) => {
    setState({
      ...state,
      imageName: fileInfo.name || '',
      image: fileInfo.cdnUrl || '',
    });
    // setLoadingUploadcare(false)
  };

  const handleSubmit = () => {
    createItem(params.code, 
      {
        ...state,
        traits: {
          1: +trait.type,
          2: +trait.hat,
          3: +trait.hair,
          4: +trait["face-accessories"],
          5: +trait.beard,
          6: +trait.clothes,
          7: +trait["body-accessories"],
          8: +trait.background,
          9: +trait.skin,
        }
      }
      , () => {
      setState({
        ...state,
        name: '',
        details: '',
        iconName: '',
        icon: '',
        imageName: '',
        image: '',
      })
      history.push(`/profile/my-collections/${params.code}`)
    });
  }
  
  return(
    <>
      <div className="w-full md:w-3/4 border rounded-md px-5 md:px-10 py-6 shadow-md">
        <div className="flex flex-row">
          <Link to={`/profile/my-collections/${params.code}`} className="text-base my-auto"><IconArrowBack /></Link> 
          <h1 className="text-c-darkgray font-semibold text-base md:text-2xl ml-2">
            Add Item
          </h1>
        </div>
        <div className="flex flex-col space-y-4 mt-4">
          <Input
            type="text"
            name="name"
            label="Name"
            value={state.name}
            handleChange={handleChange}
            />
          <TextArea 
            name="details"
            label="Description"
            value={state.details}
            handleChange={handleChange}
          />
          <h1 className="text-c-darkgray font-semibold text-sm">
            Trait Details
          </h1>
          {traitList.map((item, i) => {
            return(
              <Fragment key={i}>
                {item.properties.length !== 0 &&
                <Select
                  name={item.code}
                  label={item.label}
                  defaultValue="select"
                  // value={trait[item?.code || 'skin']}
                  handleChange={handleSelect}
                > 
                  <option value="select">Please select</option>
                  {item?.properties.map((property, i) => {
                    return(
                      <Fragment key={i}>
                      <option value={property.id}>{property.label}</option>
                      </Fragment>
                    )
                  })}
                </Select>}
              </Fragment>
            );
          })}
          <div>
            <label className="text-gray-900 tracking-wider px-1 uppercase text-xs">Image Reference</label>
            {state.icon ? 
            <p className="text-sm text-c-blue cursor-pointer">
              <a href={state.icon} target="_blank" rel="noopener noreferrer" className="truncate">
                <IconImage /> {state.iconName}
              </a>
            </p>
            : 
            <div className="flex">
              <Uploader
                onSuccess={onUploadIcon}
                imagesOnly
                imgClassname="m-auto"
                className="text-white px-2 py-2 w-1/2 md:w-1/4 text-sm font-semibold bg-blue-500 rounded-md text-center cursor-pointer">
                {/* // crop="free, 16:9, 4:3, 5:4, 1:1"
                // inputAcceptTypes="application/pdf" */}
                Upload
              </Uploader>
              </div>
            }
          </div>
          <div>
            <label className="text-gray-900 tracking-wider px-1 uppercase text-xs">Original Work</label>
            {state.image ? 
            <p className="text-sm text-c-blue cursor-pointer">
              <a href={state.image} target="_blank" rel="noopener noreferrer" className="truncate">
                <IconImage /> {state.imageName}
              </a>
            </p>
            : 
            <div className="flex">
              <Uploader
                onSuccess={onUploadImage}
                imagesOnly
                imgClassname="m-auto"
                className="text-white px-2 py-2 w-1/2 md:w-1/4 text-sm font-semibold bg-blue-500 rounded-md text-center cursor-pointer">
                {/* // crop="free 16:9, 4:3, 5:4, 1:1"
                // inputAcceptTypes="application/pdf" */}
                Upload
              </Uploader>
              </div>
            }
          </div>
          <div className="w-full">
            <button 
              type="button"
              onClick={handleSubmit}
              className="bg-blue-900 text-white font-semibold py-2 px-4 rounded float-right w-1/2 md:w-2/12">
                Add
            </button>
          </div>
        </div> 
      </div>
    </>
  )
}
export default AddItem;