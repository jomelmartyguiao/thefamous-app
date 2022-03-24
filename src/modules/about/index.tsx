import { GiftIcon, CoinsIcon, RocketIcon } from 'modules/common/components/Icons'
import nftIcon from 'images/nft-icon-white.png'
import panda from 'images/panda-white.png';
import leafIcon from 'images/leaf-bulb.png';

const index = () => {
  return (
    <div className="relative px-5 flex justify-center pt-32 pb-14 bg-contain bg-famous bg-fixed bg-opacity-10 bg-no-repeat">
      <div className="w-full lg:max-w-7xl flex flex-col items-center">
        <div className="w-full flex flex-col space-y-2 px-5 lg:px-16">
          <h1 className="text-3xl text-c-darkgray font-bold text-center">About</h1>
          <p className="text-base font-medium text-gray-600 text-center">
            The Famous is an NFT platform that leverages the relation between creators, celebrities, brands and fans like never seen before. The platform helps creators and brands to create and launch NFTs while protecting their IPs. At the same time, fans can access rewards and generate incomes by acquiring and trading their favorite NFT projects. The Famous is developing the go-to Metaverse for the creators, brands and fans community.
          </p>
        </div>
        <div className="grid grid-flow-row lg:grid-cols-3 gap-5 lg:gap-9 w-full mt-8">
          <div className="border p-5 px-9 space-y-2 rounded-md transform duration-200 ease-in-out hover:scale-105 hover:shadow-md bg-blue-900 opacity-70 h-72 flex flex-col items-center shadow-sm w-full">
            <RocketIcon className="w-16 h-16 text-white" />
            <h1 className="text-xs font-semibold text-white text-current text-center">The NFT launchpad for Famous creators and brands</h1>
            <p className="text-sm text-white font-medium text-justify">
              The team assists creators and brands on protecting IP 
              and original work in blockchain while creating NFTs using
              its multimedia NFT studio, with customized right and royalty 
              licenses. We collaborate with creatives, artists, and rights 
              holders to launch NFT collections across a variety of mediums: 
              art, entertainment, music, fashion, sport and more.
            </p>
          </div>
          <div className="border p-5 px-9 space-y-2 rounded-md transform duration-200 ease-in-out hover:scale-105 hover:shadow-md bg-blue-900 opacity-70 h-72 flex flex-col items-center shadow-sm w-full">
            <img src={nftIcon} alt="Nft Icon" className="w-16 h-16" />
            <h1 className="text-sm font-semibold text-white text-current text-center">The Marketplace Built for Fans </h1>
            <p className="text-sm text-white font-medium text-justify">
              Fans can receive, earn, buy and trade NFTs with a simple and  easy to use account while benefiting from tutorials to manage NFTs.
            </p>
          </div>
          <div className="border p-5 px-9 space-y-2 rounded-md transform duration-200 ease-in-out hover:scale-105 hover:shadow-md bg-blue-900 opacity-70 h-72 flex flex-col items-center shadow-sm w-full">
            <GiftIcon className="w-16 h-16 text-white" />
            <h1 className="text-sm font-semibold text-white text-current text-center">A Reward Program Dedicated to Fans</h1>
            <p className="text-sm text-white font-medium text-justify">
              Fans can join the reward program to support their favorite celebrities with daily social task, bounties and referrals while earning tokens to buy more NFTs.
            </p>
          </div>
          <div className="border p-5 px-9 space-y-2 rounded-md transform duration-200 ease-in-out hover:scale-105 hover:shadow-md bg-blue-900 opacity-70 h-72 flex flex-col items-center shadow-sm w-full">
            {/* <GiftIcon className="w-16 h-16 text-white" /> */}
            <img src={leafIcon} alt="Nft Icon" className="w-16 h-16" />
            <h1 className="text-sm font-semibold text-white text-current text-center">A Green Program for Celebrities and Fans</h1>
            <p className="text-sm text-white font-medium text-justify">
              The Famous is built on a carbon neutral blockchain and will support green projects, endorsed by celebrities, and tokenized to allow fans to also support them by buying dedicated NFTs.
            </p>
          </div>
          <div className="border p-5 px-9 space-y-2 rounded-md transform duration-200 ease-in-out hover:scale-105 hover:shadow-md bg-blue-900 opacity-70 h-72 flex flex-col items-center shadow-sm w-full">
            <CoinsIcon className="w-16 h-16 text-white" />
            <h1 className="text-xs md:text-sm font-semibold text-white text-current text-center">A Token Economy for a Frictionless Platform</h1>
            <p className="text-xs md:text-sm text-white font-medium text-justify">
              Fans can buy and trade NFTs using a custodial 
              account or their own wallets. They can store and 
              manage their NFTs directly on their platform account 
              (an easy way to start for not-yet crypto savvy fans) or 
              link a wallet to store their NFTs.
              An NFT staking program will also reward NFT holders
            </p>
          </div>
          <div className="border p-5 px-9 space-y-2 rounded-md transform duration-200 ease-in-out hover:scale-105 hover:shadow-md bg-blue-900 opacity-70 h-72 flex flex-col items-center shadow-sm w-full">
          <img src={panda} alt="Nft Icon" className="w-16 h-16" />
            <h1 className="text-sm font-semibold text-white text-current text-center">The Famous Genesis NFT Collection</h1>
            <p className="text-sm text-white font-medium text-justify">
              The first NFT collection for the early adopters of the Famous platform: The Famous NFTs will act as a member badge offering NFT holders, a series of exclusive privileges and personal experiences with celebrities.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index
