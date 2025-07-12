import React from 'react'
import Navbar from './Navbar'
import { GridBackground } from './grid'
import SecondDiv from './SecondDiv'
import MainText from './MainText'
import Cursor from './Cursor'
import { MovingCards } from './MovingCards'
import Footer from './Footer'
import SideCard from './SideCard'

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Cursor/>
      <GridBackground>
        <MainText />
        <SideCard/>
      </GridBackground>
      <SecondDiv />
      <MovingCards/>
      <Footer/>
    </>
  )
}

export default LandingPage