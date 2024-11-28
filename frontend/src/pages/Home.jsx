import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Flex from '../components/Flex'
import About from '../components/About'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
        <Header></Header>
        <Hero></Hero>
        <Flex/>
        <About></About>
        <Footer></Footer>
        
    </div>
  )
}

export default Home