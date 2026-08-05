import Culture from '@/components/app/Culture'
import Hero from '@/components/app/Hero'
import Instructions from '@/components/app/Instructions'
import Philosophy from '@/components/app/Philosophy'
import Roadmap from '@/components/app/Roadmap'
import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <div className='space-y-16 md:space-y-24'>
        <Instructions />
        <Philosophy />
        <Roadmap />
        <Culture />
      </div>
      <Footer />
    </div>
  )
}

export default page