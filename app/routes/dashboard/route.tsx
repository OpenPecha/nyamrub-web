import React from 'react'
import ContactUs from '../_index/components/ContactUs'
import Footer from '../_index/components/Footer'
import Sidebar from './components/Sidebar'

export default function route() {
  return (
      <div className='bg-white'>
          <Sidebar />
          <ContactUs />
          <Footer />
    </div>
  )
}
