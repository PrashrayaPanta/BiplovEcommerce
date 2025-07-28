import ExclusiveOffer from '@/components/Home2/ExclusiveOffer'
import FAQSection from '@/components/Home2/FAQ'
import Footer from '@/components/Home2/Footer'
import InfoCard from '@/components/Home2/InfoPage'
import Header, { HeroSection } from '@/components/Home2/Navbar'
import NewArrivals from '@/components/Home2/NewArrivals'
import NewsletterSubscription from '@/components/Home2/NewsLetterSubscription'
import HomeCategoryBox from '@/components/homeComponents/HomeCategoryBox'
// import NewArrivals from '@/components/homeComponents/NewArrivals'
import React from 'react'
import "../App.css"

export default function Home2() {
  return (
    <div className='bg-red-500 flex flex-col gap-y-16'>
        <HeroSection />
        <div className='bg-gray-100 flex flex-col gap-y-16 mx-2 md:mx-8'>
        <HomeCategoryBox />
        <NewArrivals />
        <InfoCard />
        <ExclusiveOffer />
        <FAQSection />
        <NewsletterSubscription />
    
        </div>
    </div>
  )
}
