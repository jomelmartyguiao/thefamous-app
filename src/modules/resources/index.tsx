import graffiti from 'images/graffiti.png';
import thefamousHome from 'images/thefamous-home.png';
import resourcesJan28 from 'images/resources-jan28.png';
import banner from 'images/thefamousbanner.jpg';

const Resources = () => {
  return(
    <>
      <div className="h-auto bg-contain bg-center bg-famous bg-fixed bg-opacity-10 bg-no-repeat pt-28 pb-16">
        <div className='max-w-6xl mx-auto space-y-4'>
          <h1 className='text-center md:text-left'><span className='text-2xl'>More about</span><span className='gangcrime text-c-blue text-xl ml-4'>The Famous</span></h1>
          <div className="flex flex-col md:flex-row md:space-x-10 bg-white border border-gray-50 rounded-md shadow-sm p-7">
            <div className="w-full md:w-5/12">
              <span className="text-xs lg:text-sm font-extralight">February 19, 2022</span>
              <h1 className="text-lg lg:text-2xl font-semibold mb-2 mt-2">TheFamous Founder Club</h1>
              <img src={banner} alt="graffiti" className='w-full h-9/12' />
            </div>
            <div className="w-full md:w-7/12 pt-2 md:pt-8">
              <p className="text-sm md:text-base lg:text-xl md:mb-5 lg:leading-9">
              Update on TheFamous venture and the exclusive offers from the Founder Club. In January 2022, TheFamous brand and NFT marketplace was launched by its creators, TheFamous Lab. The project is based on 3 layers ...
              </p>
              <a 
                href="https://thefamous.medium.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-extralight text-green-500">
                  Read more
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-10 bg-white border border-gray-50 rounded-md shadow-sm p-7">
            <div className="w-full md:w-5/12">
              <span className="text-xs lg:text-sm font-extralight">January 28, 2021</span>
              <h1 className="text-lg lg:text-2xl font-semibold mt-2">Getting started with TheFamous Marketplace</h1>
              <img src={resourcesJan28} alt="graffiti" className='w-full h-9/12' />
            </div>
            <div className="w-full md:w-7/12 pt-2 md:pt-8">
              <p className="text-sm md:text-base lg:text-xl md:mb-5 lg:leading-9">
              The purpose of this article is to provide detailed instructions on how fans can take advantage of TheFamous NFT marketplace and how users can sign up, buy and trade NFTs and do more using just their account (custodial) wallet on the platform or connecting their own (non-custodial) wallet account. 
              </p>
              <a 
                href="https://thefamous.medium.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-extralight text-green-500">
                  Read more
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-10 bg-white border border-gray-50 rounded-md shadow-sm p-7">
            <div className="w-full md:w-5/12">
              <span className="text-xs lg:text-sm font-extralight">December 20, 2021</span>
              <h1 className="text-lg lg:text-2xl font-semibold mt-2">“The Famous”, an NFT launchpad for artists, connected to a Fan Guild</h1>
              <img src={graffiti} alt="graffiti" className='w-full h-9/12' />
            </div>
            <div className="w-full md:w-7/12 pt-2 md:pt-8">
              <p className="text-sm md:text-base lg:text-xl md:mb-5 lg:leading-9">
                NFT’s, or non-fungible tokens, have taken on the media by storm. It’s become the Web3’s representative for all things of value that can be sold or traded on the Web3 and the Metaverse — now widely popular in the art community. Although a lot still needs to be unlocked in…
              </p>
              <a 
                href="https://thefamous.medium.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-extralight text-green-500">
                  Read more
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-10 bg-white border border-gray-50 rounded-md shadow-sm p-7">
            <div className="w-full md:w-5/12">
              <span className="text-xs lg:text-sm font-extralight">December 20, 2021</span>
              <h1 className="text-lg lg:text-2xl font-semibold mb-2 mt-2">The NFT marketplace expected by celebrities and fans to connect in the metaverse</h1>
              <img src={thefamousHome} alt="graffiti" className='w-full h-9/12' />
            </div>
            <div className="w-full md:w-7/12 pt-2 md:pt-8">
              <p className="text-sm md:text-base lg:text-xl md:mb-5 lg:leading-9">
                Today The Famous and Doconchain, a leading provider of NFTs solutions, announce an upcoming NFT marketplace, that will be developed in collaboration with entertainment company partners, to leverage the relation between celebrities and fans. …
              </p>
              <a 
                href="https://thefamous.medium.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-extralight text-green-500">
                  Read more
              </a>
            </div>
          </div>
        </div>  
      </div>
    </>
  )
}
export default Resources;