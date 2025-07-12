import React from 'react'
import Navbar from './Navbar'
import { GridBackground } from './grid'
import SecondDiv from './SecondDiv'
import MainText from './MainText'
import Cursor from './Cursor'
import { MovingCards } from './MovingCards'
import Footer from './Footer'

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Cursor/>
      <GridBackground>
        <MainText />
      </GridBackground>
      <SecondDiv />
      <MovingCards/>
      <Footer/>
    </>
  )
}

export default LandingPage