import FollowOnInsta from '@/components/homeComponents/FollowOnInsta'
import HeroSection from '@/components/homeComponents/HeroSection'
import HomeCategoryBox from '@/components/homeComponents/HomeCategoryBox'
import NewArrivals from '@/components/homeComponents/NewArrivals'
import PopularThisWeek from '@/components/homeComponents/PopularThisWeek'
import SmallNotice from '@/components/homeComponents/SmallNotice'
import React from 'react'

function Home() {
  return (
    <div className='items-center justify-center'>
      <HeroSection />
      <HomeCategoryBox />
      <NewArrivals />
      <PopularThisWeek />
      <SmallNotice />
      <FollowOnInsta />
    </div>
  )
}

export default Home