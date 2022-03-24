import one from 'images/explore-one.png'
import two from 'images/explore-two.png'
import three from 'images/explore-three.png'
import four from 'images/explore-four.png'

const HowItWorks = () => {
  const card = [
    {number: one, title: 'Get your collectibles', content: 'Get in and buy limited digital NFTs from celebrities collectible and tradable'},
    {number: two, title: 'Unlock new Experiences', content: 'Got an NFT from your Favorite Celebrity? You can now unlock more experiences'},
    {number: three, title: 'Join the Community', content: 'Link your telegram and discord account and start to exchange with the community'},
    {number: four, title: 'Get NFTs Rewards and Tokens', content: 'Join the Rewards program with social tasks and bounties and start to earn tokens to buy more NFTs'},
  ]

  return (
    <div className="py-4 lg:py-8 px-5 flex flex-col items-center z-10">
      <div className="flex flex-col w-full max-w-screen-xl 2xl:max-w-screen-2xl">
        <h1 className="text-2xl fonts-sans-bold">How it works?</h1>
        <div className="flex w-full max-w-screen-xl 2xl:max-w-screen-2xl flex-col lg:flex-row justify-center items-center p-2 space-x-3">
          {card.map((card, i) =>(
          <div key={i} className="group w-full h-50 flex items-start p-1 space-x-2">
            <img src={card.number} alt="One" className="group-hover:scale-110 transform duration-200 ease-in-out h-16 md:24 lg:h-32 object-contain"/>
            <div className="flex flex-col space-y-1 mt-3">
              <h1 className="text-base md:text-lg font-semibold">{card.title}</h1>
              <p className="text-xxs md:text-xs">{card.content}</p>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>

  )
}

export default HowItWorks
