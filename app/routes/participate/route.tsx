import React from 'react'
import ContactUs from '../_index/components/ContactUs'
import Footer from '../_index/components/Footer'
import Dashboard from './components/Dashboard'

export default function route() {
  return (
      <div className='bg-white'>
          <Dashboard />
          <ContactUs />
          <Footer />
    </div>
  )
}
