import React from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { Outlet } from 'react-router-dom'
import HeroPage from './HeroPage'


const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <HeroPage />
      <Footer />
    </div>
  )
}

export default MainLayout
