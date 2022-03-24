import { Link } from 'react-router-dom';

import Header from 'modules/common/components/Content/Header';
import { IconInstagram, IconTelegram, IconTwitter } from 'modules/common/components/Icons';
import { vision, version1, version2 } from './contants/vision';
// import famousTitle from 'images/TheFamousTitle.png';
import famousTitle from 'images/dashboard-bluebg.jpg';
import panda from 'images/dashboard-panda.jpeg';
import visionImg from 'images/landing-vision.png';
import explorePage from 'images/landing-explore-page.jpg';
import connect from 'images/landing-connect.png';
import version1Img from 'images/landing-version1.png';
import version2Img from 'images/landing-version2.png';

const Landing = () => {

  return (
    <>
      <div className="relative h-screen bg-party bg-cover bg-no-repeat flex flex-col items-center justify-center">
        <Header />
        <div className="flex flex-col max-w-4xl -mt-48 lg:-mt-54 2xl:-mt-80 md:bg-transparent md:py-0 items-center">
          <img src={famousTitle} alt="The Favmous Title" className="object-contain w-80 md:w-96 lg:w-lgHomeLogo 2xl:w-2xlHomeLogo famoustitle"/>
          <h1 className="font-bold text-xs md:text-2xl text-center text-black p-1 rubic tracking-wider famous">
            The NFT marketplace awaited by artists, celebrities, <br />
              brands and fans, to join the metaverse 
          </h1>
        </div>
      </div>
      <div className="w-full flex justify-center bg-black px-5">
        <div className="relative flex flex-col lg:flex-row w-full lg:max-w-screen-xl 2xl:max-w-screen-2xl space-y-12 
          lg:space-y-0 space-x-0 lg:space-x-5 justify-between pb-10 md:pb-28">
          <div className="lg:w-1/2 px-4 lg:p-0 -mt-24 lg:-mt-0">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold lg:text-left text-center">THE FAMOUS</h1>
            <p className="text-sm md:text-base 2xl:text-lg text-white leading-snug lg:text-left text-justify mb-10 tracking-wider">
              The Famous is a NFT platform that leverages the relation between celebrities, artists and fans like never 
              seen before. The platform is a Launchpad for celebrity and brand NFTs that also help to protect IP. 
              Fans can join the Famous Fan Guild to access exclusive rewards while connecting with their favorite 
              artists and brands for new experiences. The Famous is developing the go-to Metaverse for celebrities, 
              brands and fans.
            </p>
            <div className='flex flex-col lg:flex-row lg:space-x-10'>
              <div className="flex justify-center lg:justify-start">
                <a 
                  href="https://discord.gg/CgxKg6QbU4" 
                  rel="noopener noreferrer" 
                  target="_blank" 
                  className="text-lg lg:text-xl text-white bg-blue-600 hover:bg-blue-700 font-bold w-72 rounded-xl text-center p-2">
                    Join the community
                </a>
              </div>
              <div className="flex flex-row space-x-4 justify-center items-center mt-4 lg:mt-0">
                <a href="https://twitter.com/TheFamous_NFTs" rel="noopener noreferrer" target="_blank">
                  <IconTwitter className="text-base md:text-2xl text-white transform duration-200 hover:scale-125" />
                </a>
                <a href="https://www.instagram.com/thefamous_nfts/" rel="noopener noreferrer" target="_blank">
                  <IconInstagram className="text-base md:text-2xl text-white transform duration-200 hover:scale-125" />
                </a>
                <a href="https://t.me/TheFamousNFTs" rel="noopener noreferrer" target="_blank">
                  <IconTelegram className="text-base md:text-2xl text-white transform duration-200 hover:scale-125" />
                </a>
              </div>
            </div>
          </div>
          <div className="hidden md:flex md:flex-col lg:w-1/2 justify-center">
            {/* <video width="500" height="240" controls>
              <source src="https://ucarecdn.com/77a2d2d6-adcc-4dc4-98dc-e56de53adbab/Thefamousv1.mp4"  />
            </video> */}
            <img src={panda} alt="explore" className='w-5/12 h-48 md:h-auto mx-auto rounded-2xl' loading="lazy" />
            <Link to="/collection/TF00001">
              <h1 className="text-white hover:text-blue-500 hover:underline text-2xl font-bold text-center">Get your Famous PFP NFT now!</h1>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center bg-black px-5">
        <div className="relative flex flex-col lg:flex-row w-full lg:max-w-screen-xl 2xl:max-w-screen-2xl space-y-12 
          lg:space-y-0 space-x-0 lg:space-x-5 justify-between pb-10 md:pb-28">
          <div className="lg:w-7/12 px-4 lg:p-0">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold lg:text-left text-center">VISION</h1>
            <p className="text-sm md:text-base 2xl:text-lg text-white font-medium leading-snug lg:text-left text-justify
              tracking-wider mb-2">
              We are providing Web3 solutions and education to participate to the NFT revolution with the aim to:
            </p>
            <ul className='list-disc ml-8'>
              {vision.map((item, i) => (
                <li key={i} className="text-sm md:text-base 2xl:text-lg text-white font-medium leading-snug text-left mb-2 tracking-wider">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden md:flex lg:w-5/12 justify-center">
            <img src={visionImg} alt="vision" className='w-5/12 h-auto' loading="lazy" />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center bg-black px-5">
        <div className="relative flex flex-col-reverse lg:flex-row w-full lg:max-w-screen-xl 2xl:max-w-screen-2xl space-y-12 
          lg:space-y-0 space-x-0 lg:space-x-5 justify-between pb-10 md:pb-28">
          <div className="lg:w-7/12 flex justify-center mt-5 lg:mt-0">
            <img src={explorePage} alt="explore" className='w-10/12 h-48 md:h-auto' loading="lazy" />
          </div>
          <div className="lg:w-5/12 px-4 lg:p-0 space-y-3">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold lg:text-left text-center">EXCLUSIVE NFT COLLECTIONS</h1>
            <p className="text-sm md:text-base 2xl:text-lg text-white font-medium leading-snug text-justify lg:text-left tracking-wider">
              The Famous collaborates with artists, institutions, organizations and brands, from music and art to design and sport, to organize each year a program of new NFT collections curated by an experienced advisory board.
            </p>
            <p className="text-sm md:text-base 2xl:text-lg text-white font-medium leading-snug text-justify lg:text-left tracking-wider">
              The goal is to enable fans to access new projects from their favorite artists and brands while discovering a new generation of digital artists.
            </p>
            <p className="text-sm md:text-base 2xl:text-lg text-white font-medium leading-snug text-justify lg:text-left tracking-wider">
              The Famous will also invest in artworks and NFTs with the goal to tokenize them for the benefit of the community.
            </p>
            <p className="text-sm md:text-base 2xl:text-lg text-white font-medium leading-snug text-justify lg:text-left tracking-wider">
              The Genesis (first and limited) unique collection, "The Famous Founder Club" is built by the Famous. The NFTs act as member badges to join the 'Famous Founder Club' and benefit from exclusive privileges (yield, rewards, airdrop and more).
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center bg-black px-5">
        <div className="relative flex flex-col lg:flex-row w-full lg:max-w-screen-xl 2xl:max-w-screen-2xl space-y-12 
          lg:space-y-0 space-x-0 lg:space-x-5 justify-between pb-10 md:pb-28">
          <div className="lg:w-5/12 px-4 lg:p-0 space-y-3">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold lg:text-left text-center">THE FAMOUS ORGANIZATION</h1>
            <p className="text-sm md:text-base 2xl:text-lg text-white font-medium leading-snug md:text-left 
              tracking-wider text-justify">
              The Famous is a Web3 platform that bring together artists, celebrities, brands and a community of fans (The Fan Guild) to develop new experiences and incomes, taking advantage of a blockchain based economy. The platform is a bridge to the metaverse.
            </p>
            <p className="text-sm md:text-base 2xl:text-lg text-white font-medium leading-snug md:text-left 
              tracking-wider text-justify">
              The platform is organized around a founder/ management team, an advisory board, an art fund and a DAO.
            </p>
            <p className="text-sm md:text-base 2xl:text-lg text-white font-medium leading-snug md:text-left 
              tracking-wider text-justify">
              The Fan community can access different membership levels, selecting one that fit their expectations.
            </p> 
            <p className="text-sm md:text-base 2xl:text-lg text-white font-medium leading-snug md:text-left 
              tracking-wider text-justify">
              You can be a fan and contribute to the growth of the community while thriving on you own. If you want more, you can join the Founder Club, the VIP Club, holding the appropriate NFT and you can also be a limited partner and participate to our art investment funds.
            </p>
          </div>
          <div className="lg:w-7/12 flex justify-center">
            <img src={connect} alt="explore" className='w-9/12 h-48 md:h-auto' loading="lazy" />
          </div>
        </div>
      </div>
      <div className="hidden md:flex w-full justify-center bg-black">
        <div className='mx-auto w-full lg:w-9/12'>
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold lg:text-left text-center ml-8 2xl:ml-24 mb-2">THE ROADMAP</h1>
          <div className="relative flex flex-col lg:flex-row w-full lg:max-w-screen-xl 2xl:max-w-screen-2xl pb-20">
            <div className="w-full lg:w-7/12 flex mb-4 md:mb-0">
              <div className='flex flex-row pl-5 md:mx-auto'>
                <img src={version1Img} alt="explore" className='w-8 md:w-12 h-64 md:h-96' loading="lazy" />
                <div className='w-11/12 space-y-5 md:space-y-5 ml-3'>
                  {version1.map((item, i) => (
                    <p key={i} className="text-xs md:text-base 2xl:text-lg text-white font-medium leading-snug text-left py-1 md:py-3">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-5/12 flex">
              <div className='flex flex-row md:mt-5 lg:mt-0 pl-5 md:pl-44 xl:pl-0'>
                <img src={version2Img} alt="explore" className='w-8 md:w-12 h-64 md:h-96' loading="lazy" />
                <div className='w-11/12 space-y-5 md:space-y-5 ml-3'>
                  {version2.map((item, i) => (
                    <p key={i} className="text-xs md:text-base 2xl:text-lg text-white font-medium leading-snug text-left py-1 md:py-3">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>  
      </div>
    </>
  )
}

export default Landing
