import React, { SyntheticEvent, useState } from 'react'

import FamousLogo from 'images/dashboard-bluebg.jpg'
import Shirt from 'images/shirt.jpg'
import Board from 'images/board.png'
import Ball from 'images/ball.jpg'
import { emailSubscribe } from './apis'

interface StateProps {
  email: string;
  source: string;
} 

const Brand = () => {

  const [state, setState ] = useState<StateProps>({email: "", source: "Brand"});

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    emailSubscribe(state, () => {
      setState({
        ...state,
        email: ""
      })
    })

  }

  const onChange = (e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setState({
      ...state,
      [name]: value,
    })
    // console.log(name);
    // console.log(value);
  }

  return (
    <div className="relative px-5 flex justify-center pt-24 lg:pt-36 pb-14 bg-opacity-10 bg-no-repeat">
      <div className="w-full flex flex-col max-w-7xl items-center py-7 space-y-6 md:space-y-12">
        <div className="flex items-center justify-center py-2 px-9 bg-blueklein">
          <img src={FamousLogo} alt="FamousLogo" className="object-contain w-44 md:w-52" />
        </div>
        <h1 className="text-xs md:text-sm italic text-center">
          Our Aim is to develop collaborations and capsules, based on limited series, <br className="hidden md:block"/>
          that pay tribute to artists and brand teams who embody the street and cyber cultures.
        </h1>
        <div className="flex items-center justify-center space-x-4 md:space-x-9 relative">
          <img src={Board} alt="Shirt Illustration" className="w-24 h-24 md:w-64 md:h-64"/>
          <img src={Shirt} alt="Board Illustration" className="w-24 h-24 md:w-64 md:h-64 object-cover"/>
          <img src={Ball} alt="Ball Illustration" className="w-24 h-24 md:w-64 md:h-64 object-cover"/>
        </div>
        <div className="flex flex-col space-y-7 md:space-y-20 w-full md:max-w-3xl">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <h1 className="text-xs md:text-sm">
              A metaverse store is coming <br />
              Subscribe to our mailling list to be updated
            </h1>
            <form onSubmit={onSubmit} className="flex items-center space-x-2 relative">
              <input
                type="email"
                onChange={onChange}
                value={state.email}
                name="email"
                placeholder="Email"
                className="p-2 w-56 md:w-80 border rounded-md border-gray-700 text-xs md:text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-900 rounded-md text-xs md:text-sm text-white p-2"
              >
                Subscribe
              </button>
            </form>
          </div>
          <p className="text-xs text-justify md:text-left md:text-sm">
              In Jan 2022 TheFamous was launched with a first NFT collection that pays tribute to artists, quotes, 
              and brands that made who we are. The aim was to initiate a Founder Club who can develop the venture with us.
              <br /><br />
              TheFamous core team is fed by street art & cyber punk cultures and its aim is to represent them playing an 
              integral part in the ecosystem while developing collaborations that bridge the real life to the metaverse.
              <br /><br />
              We are working with artists, photographers, designers, musicians and brands to develop NFT series, 
              while protecting creator IP, and capsules with limited series for the real word and the metaverse. 
              In short, we are connecting our brand with creators who are recognized for being part of the street 
              culture.
            </p>
        </div>
      </div>
    </div>
  )
}

export default Brand