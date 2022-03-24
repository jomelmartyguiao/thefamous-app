import doclogo from 'images/doconchain.png';
import { Link } from 'react-router-dom';

const Footer = () => (
  <div className="py-11 bg-blue-900 flex justify-center items-center">
    <div className="w-full max-w-7xl">
      <div className="justify-between space-x-8 flex">
        <div className="w-full flex flex-col space-y-6">
          <div className="flex flex-col">
            <h1 className="text-white text-2xl font-semibold">THE FAMOUS</h1>
            <p className="text-white text-sm font-medium leading-relaxed">
              The Famous is a NFT platform that leverages the relation between celebrities and fans like never seen 
              before. The platform helps celebrities to create NFTs while protecting their IP. Fans can be rewarded 
              and make incomes supporting their favorite celebrities. The Famous is developing the go-to Metaverse for 
              celebrities, brands and fans
            </p>
          </div>
        </div>
        <div className="w-full flex items-end flex-col space-y-5">
          <div className="flex space-x-2">
            <input type="search" placeholder="Your email address" className="p-2 focus:outline-none rounded-md text-sm w-72"/>
            <button 
              type="submit" 
              className="p-2 border border-white bg-blue-900 px-3 text-sm text-white rounded-md transform 
              duration-200 hover:bg-white hover:text-blue-900">
              Sign Up
            </button>
          </div>
          <div className="lg:flex space-x-8 pt-5 hidden">
            <h1 className="text-white text-sm text-right p-2 px-3 hover:bg-white hover:text-blue-900 rounded-md transform duration-200 ease-in-out">Explore</h1>
            <h1 className="text-white text-sm text-right p-2 px-3 hover:bg-white hover:text-blue-900 rounded-md transform duration-200 ease-in-out">Stats</h1>
            <h1 className="text-white text-sm text-right p-2 px-3 hover:bg-white hover:text-blue-900 rounded-md transform duration-200 ease-in-out">Buy</h1>
            <h1 className="text-white text-sm text-right p-2 px-3 hover:bg-white hover:text-blue-900 rounded-md transform duration-200 ease-in-out">Trade</h1>
            <h1 className="text-white text-sm text-right p-2 px-3 hover:bg-white hover:text-blue-900 rounded-md transform duration-200 ease-in-out">Rewards</h1>
            <h1 className="text-white text-sm text-right p-2 px-3 hover:bg-white hover:text-blue-900 rounded-md transform duration-200 ease-in-out">Resources</h1>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between mt-6">
        <h1 
          className="text-white text-sm font-medium flex items-center pt-5">
          Powered by: <img src={doclogo} alt="doc logo" className="h-4 filter invert px-1"/> 
          <a href="https://doconchain.com/" rel="noreferrer" target="_blank hover:underline">Doconchain</a>
        </h1>
        <div className="text-white text-sm font-medium flex items-center pt-5">
          <Link to="/terms" className="cursor-pointer hover:underline mr-1">Terms of use</Link>
          <p>-</p>
          <Link to="/privacy" className="hover:underline ml-1">Privacy Policy</Link>
        </div>
      </div>
    </div>
    </div>
);

export default Footer;
