
import { Link, useLocation } from 'react-router-dom';
import { IconInstagram, IconTelegram, IconTwitter } from 'modules/common/components/Icons';
import doclogo from 'images/doconchain.png';

const FooterHome = () => {
  const location = useLocation();
  return(
    <div className="py-8 bg-blue-900 flex flex-col md:flex-row justify-center items-center z-10">
      <div className="w-full md:max-w-screen-xl 2xl:max-w-screen-2xl md:px-10">
        <div className="md:justify-between lg:space-x-8 space-y-4 md:space-y-0 flex flex-col-reverse md:flex-row">
          <div className="lg:w-4/12 flex items-center md:items-start flex-col">
            {location.pathname === "/" &&
            <h1 className="text-white text-sm font-medium flex items-center">
              Powered by: <img src={doclogo} alt="doc logo" className="h-3 md:h-4 filter invert px-1"/> 
              <a href="https://doconchain.com/" className="hover:underline" rel="noreferrer" target="_blank">Doconchain</a>
            </h1>}
            <div className="text-white text-sm font-medium flex items-center pt-2">
              <Link to="/terms" className="cursor-pointer hover:underline mr-1">Terms of use</Link>
              <p>-</p>
              <Link to="/privacy" className="hover:underline ml-1">Privacy Policy</Link>
          </div>
          </div>
          <div className="lg:w-8/12 flex md:items-end flex-col space-y-1">
            <div className='flex flex-col-reverse md:flex-row md:space-x-4 mb-3 md:mb-0'>
              <div className="flex justify-center lg:justify-start">
                <a 
                  href="https://discord.gg/CgxKg6QbU4" 
                  rel="noopener noreferrer" 
                  target="_blank" 
                  className="text-lg lg:text-xl text-white bg-blue-600 hover:bg-blue-700 font-bold w-72 rounded-xl 
                    text-center p-2">
                    Join the community
                </a>
              </div>
              <div className="flex space-x-3 mb-2 md:mb-0 md:mt-3 justify-center lg:justify-start">
                <a href="https://twitter.com/TheFamous_NFTs" rel="noopener noreferrer" target="_blank">
                  <IconTwitter className="text-xl md:text-2xl text-white transform duration-200 hover:scale-125" />
                </a>
                <a href="https://www.instagram.com/thefamous_nfts/" rel="noopener noreferrer" target="_blank">
                  <IconInstagram className="text-xl md:text-2xl text-white transform duration-200 hover:scale-125" />
                </a>
                <a href="https://t.me/TheFamousNFTs" rel="noopener noreferrer" target="_blank">
                  <IconTelegram className="text-xl md:text-2xl text-white transform duration-200 hover:scale-125" />
                </a>
              </div>
            </div>
            <div className="md:grid hidden grid-cols-2 md:grid-flow-col md:auto-cols-max">
              <Link to="/about" className="text-white text-center text-sm md:text-right p-2 px-3 hover:bg-white hover:text-blue-900 rounded-md transform duration-200 ease-in-out">About</Link>
              <Link to="/explore" className="text-white text-center text-sm md:text-right p-2 px-3 hover:bg-white hover:text-blue-900 rounded-md transform duration-200 ease-in-out">Explore</Link>
              <h1 className="text-white text-center text-sm md:text-right p-2 px-3 hover:bg-white hover:text-blue-900 rounded-md transform duration-200 ease-in-out">Stats</h1>
              <h1 className="text-white text-center text-sm md:text-right p-2 px-3 hover:bg-white hover:text-blue-900 rounded-md transform duration-200 ease-in-out">Buy</h1>
              <h1 className="text-white text-center text-sm md:text-right p-2 px-3 hover:bg-white hover:text-blue-900 rounded-md transform duration-200 ease-in-out">Trade</h1>
              <h1 className="text-white text-center text-sm md:text-right p-2 px-3 hover:bg-white hover:text-blue-900 rounded-md transform duration-200 ease-in-out">Rewards</h1>
              <h1 className="text-white text-center text-sm md:text-right p-2 px-3 hover:bg-white hover:text-blue-900 rounded-md transform duration-200 ease-in-out">Resources</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterHome;
