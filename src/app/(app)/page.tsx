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
      <Instructions />
      <Philosophy />
      <Roadmap />
      <Culture />
      <Footer />
    </div>
  )
}

export default page