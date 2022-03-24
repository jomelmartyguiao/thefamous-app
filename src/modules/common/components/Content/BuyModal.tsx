import React from 'react'

import Connect from '../../../../images/Connect.png'
import Create from '../../../../images/Create.png'
import Signup from '../../../../images/Signup.png'

interface props {
  close: () => void
}

const BuyModal = ({close}:props) => {

  return (
    <div className="bg-gray-700 bg-opacity-80 absolute inset-0 flex items-center justify-center h-screen p-5 z-50 transform duration-200 ease-out">
      <div className="bg-gray-800 p-5 md:p-7 rounded-lg shadow-md flex flex-col space-y-2 z-50 border border-gray-900">
        <h1 className="text-xl md:text-3xl text-white bg-blueklein w-full shadow-md rounded-md text-center uppercase font-extrabold tracking-wider py-4">How to buy</h1>
        <div className="grid grid-rows md:grid-cols-3 gap-2 h-72 md:h-auto overflow-y-auto">
          <div className="rounded-md px-2 py-2 flex space-y-4 shadow-sm transform duration-200 ease-in-out flex-col w-auto md:h-auto md:w-72 relative">
            <h1 className="text-lg text-bold text-center md:h-20 w-full bg-gray-700 flex font-bold justify-center px-2 items-center py-2 rounded-md text-white">Connect a wallet to TheFamous</h1>
            <img src={Connect} alt="Connect Wallet" className="object contain rounded-md" />
            <p className="text-sm text-gray-300 text-justify md:h-52">
              To connect your wallet, tap “Connect Wallet” here on the site. Select a wallet, amount the options offered, 
              and your wallet will connect. After that, you can start buying and trading NFTs. <br /> 
              If you bought a TheFamous NFT on another platform, connecting your wallet will allow you to 
              synchronize your NFT and update its passport while receiving the NFT ‘verified’ label
            </p>
            <a 
              target="_blank" 
              rel="noopener noreferrer" 
              href="https://thefamous.xyz/signup"
              className="text-sm bg-gray-700 hover:bg-gray-600 p-2 rounded-md text-white text-center"
            > 
                Connect
            </a>
          </div>
          <div className="rounded-md px-2 py-2 flex space-y-4 shadow-sm transform duration-200 ease-in-out flex-col w-auto md:h-auto md:w-72">
            <h1 className="text-lg text-bold text-center md:h-20 w-full bg-gray-700 flex font-bold justify-center px-2 items-center py-2 rounded-md text-white">No yet crypto wallet? Signup with your email to start </h1>
            <img src={Signup} alt="Connect Wallet" className="object contain rounded-md" />
            <p className="text-sm text-gray-300 text-justify md:h-52">
              If you have no wallet yet, Signup with your email and create your login / password. <br />
              You can start to receive free NFTs on your custodial account and trade them to initiate activities on 
              the platform while getting your first tokens and you can participate to the (coming soon) reward 
              program to earn more tokens and use them to purchase NFTs. 
            </p>
            <a 
              target="_blank" 
              rel="noopener noreferrer" 
              href="https://thefamous.xyz/signup"
              className="text-sm bg-gray-700 hover:bg-gray-600 p-2 rounded-md text-white text-center"
            > 
                Sign up
            </a>
          </div>
          <div className="rounded-md px-2 py-2 flex space-y-4 shadow-sm transform duration-200 ease-in-out flex-col w-auto md:h-auto md:w-72">
            <h1 className="text-lg text-bold text-center md:h-20 w-full bg-gray-700 flex font-bold justify-center px-2 items-center py-2 rounded-md text-white">Create your Own wallet</h1>
            <img src={Create} alt="Connect Wallet" className="object contain rounded-md" />
            <p className="text-sm text-gray-300 text-justify md:h-52">
              Our tutorial will help you to create and load your own wallet (we recommend Metamask) that you can 
              connect to your account. It will allow you to export your platform NFTs to it while having more funds 
              to purchase and trade NFTs.
            </p>
            <a 
              target="_blank" 
              rel="noopener noreferrer" 
              href="https://tutorial.thefamous.xyz/"
              className="text-sm bg-gray-700 hover:bg-gray-600 p-2 rounded-md text-white text-center"
            > 
                Learn more
            </a>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={close}
            className="p-2 px-8 border border-white w-full md:w-28 transform duration-200 ease-out text-white hover:bg-white hover:text-gray-800 text-sm font-bold rounded-md">
              Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default BuyModal