import { div } from 'motion/react-client'
import React from 'react'
import Banner from '../../Components/Banner/Banner'
import WaveBanner from '../../Components/WaveBanner/WaveBanner'
import Faq from '../../Components/Faq/FAQ'
import Services from '../../Components/Services/Services'
import Count from '../../Components/Count/Count'
import Features from '../../Components/Features/Features'
import { useLoaderData } from 'react-router'
import AssignmentTab from '../../Components/AssignmentTab/AssignmentTab'

export default function Home() {

 const assignments = useLoaderData()
  return (
    <div>
      <Banner />
      <WaveBanner />
      <Features />
      <AssignmentTab data={assignments} />
      <Count />
      <Services />
      <Faq />
    </div>
  )
}
