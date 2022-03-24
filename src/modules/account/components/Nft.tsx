import PandaOne from 'images/panda1.jpg';
import PandaTwo from 'images/panda2.jpg';
import PandaThree from 'images/panda3.jpg';
import PandaFour from 'images/panda4.jpg';
import { useState } from 'react';

const Nft = () => {
  const [artwork] = useState([
    {
      illustration: PandaOne, 
      title: 'Famous Tourist',
      Code: 'Panda0001',
    },
    {
      illustration: PandaTwo, 
      title: 'Famous Cyber Punk',
      Code: 'Panda0002',
    },
    {
      illustration: PandaThree, 
      title: 'Famous YMCA',
      Code: 'Panda0003',
    },
    {
      illustration: PandaFour, 
      title: 'Famous Badboy',
      Code: 'Panda0004',
    },
  ])
  return (
    <div className="grid grid-cols-3 gap-5 p-5">
      {artwork.map((artwork, i) => (
      <div key={i} className="flex flex-col space-y-2 border rounded-md hover:shadow-lg transform duration-200 ease-in-out">
        <img 
          src={artwork.illustration} 
          alt="Collection" 
          className="bg-gray-400 object-cover h-60 w-full border-b-2 shadow-lg border-gray-100"
        />
        <div className="flex flex-col">
          <h1 className="text-semibold text-center text-lg">{artwork.title}</h1>
          <h1 className="text-semibold text-gray-400 text-sm text-center mb-3">{artwork.Code}</h1>
        </div>
      </div>
      ))}
    </div>
  )
}

export default Nft
