import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getCollections } from 'modules/explore/apis'
import type { CollectionProps } from 'modules/account/types';
import useAppSelector from 'helpers/useAppSelector';

import { Badge } from 'modules/common/components/Icons';

const Explore = () => {
  useEffect(() => {
    getCollections();
  }, [])
  const collectionList: Array<CollectionProps> = useAppSelector('noAuth.collectionList');
  // const [collections] = useState([
  //   {background: Panda, dp: Famous, title: 'The Famous', content: 'The Famous is a NFT platform that leverage the relation between celebrities and fans like never seen before. The platform helps celebrities to create NFTs while protecting their IP'},
  //   {background: TheFamous, dp: Doclogo, title: 'Doconchain', content: 'The Famous is a NFT platform that leverage the relation between celebrities and fans like never seen before. The platform helps celebrities to create NFTs while protecting their IP'},
  //   {background: Panda, dp: Famous, title: 'The Famous', content: 'The Famous is a NFT platform that leverage the relation between celebrities and fans like never seen before. The platform helps celebrities to create NFTs while protecting their IP'},
  //   {background: Panda, dp: Famous, title: 'The Famous', content: 'The Famous is a NFT platform that leverage the relation between celebrities and fans like never seen before. The platform helps celebrities to create NFTs while protecting their IP'},
  // ])
  return (
    <div className="flex flex-col pb-12 bg-contain bg-famous bg-fixed min-h-screenFooter bg-opacity-10 bg-no-repeat">
      <h1 className="pt-32 text-center text-5xl text-gray-800 font-semibold">Explore Collections</h1>
      {/* <h5 className="text-center text-sm font-me dium text-c-darkgray">The NFT marketplace for artists and fans</h5> */}
      <div className="flex flex-col items-center">
        <div className="w-full max-w-3xl relative mt-12 flex justify-center filter drop-shadow-lg">
          <div className="w-24 p-2 text-center text-sm border-b text-white bg-blue-900 text-blue transform duration-200 ease-in-out hover:text-white border-t border-l rounded-l-full border-blue-900">All</div>
          <div className="w-24 p-2 text-center text-sm text-blue-900 border-b bg-white hover:bg-blue-900 text-blue transform duration-200 ease-in-out hover:text-white border-t border-blue-900">Music</div>
          <div className="w-24 p-2 text-center text-sm text-blue-900 border-b bg-white hover:bg-blue-900 text-blue transform duration-200 ease-in-out hover:text-white border-t border-blue-900">Cinema</div>
          <div className="w-24 p-2 text-center text-sm text-blue-900 border-b bg-white hover:bg-blue-900 text-blue transform duration-200 ease-in-out hover:text-white border-t border-blue-900">Tv Shows</div>
          <div className="w-24 p-2 text-center text-sm text-blue-900 border-b bg-white hover:bg-blue-900 text-blue transform duration-200 ease-in-out hover:text-white border-t border-blue-900">Sports</div>
          <div className="w-24 p-2 text-center text-sm text-blue-900 border-b bg-white hover:bg-blue-900 text-blue transform duration-200 ease-in-out hover:text-white border-t border-blue-900">Art</div>
          <div className="w-24 p-2 text-center text-sm text-blue-900 border-b bg-white hover:bg-blue-900 text-blue transform duration-200 ease-in-out hover:text-white border-t border-blue-900">Brand</div>
          <div className="w-24 p-2 text-center text-sm text-blue-900 border-b bg-white hover:bg-blue-900 text-blue transform duration-200 ease-in-out hover:text-white border-t border-r rounded-r-full border-blue-900">Special</div>
        </div>
        <div className="grid grid-cols-3 mt-12 justify-center max-w-7xl gap-5">
          {collectionList.map((item, i) => (
            <Link to={`/collection/${item.code}`} key={i}>
              <div className="relative transform duration-200 ease-in-out hover:shadow-lg">
                <img src={item.banner} alt="Display" className="absolute w-16 h-16 border-4 border-white rounded-full p-2 bg-gray-200 top-44 inset-x-0 mx-auto" />
                <img src={item.logo} alt="Display" className="w-96 h-52 object-cover object-center rounded-t-lg" />
                <div className="w-96 rounded-t-lg bg-white shadow-md h-52 rounded-b-lg p-10 flex flex-col items-center space-y-2">
                  <div className="flex space-x-1">
                    <h1 className="text-lg text-c-gray text-center font-semibold">{item.name}</h1>
                    <Badge />
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    {item.details}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Explore
