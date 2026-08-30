import Culture from '@/components/app/Culture'
import Hero from '@/components/app/Hero'
import Instructions from '@/components/app/Instructions'
import Philosophy from '@/components/app/Philosophy'
import Roadmap from '@/components/app/Roadmap'

const page = () => {
  return (
    <>
      <Hero />
      <Instructions />
      <Philosophy />
      <Roadmap />
      <Culture />
    </>
  )
}

export default page