import React, {useEffect} from 'react'
import ContactUs from '../_index/components/ContactUs'
import Footer from '../_index/components/Footer'
import Sidebar from './components/Sidebar'
import { json, LoaderFunction, ActionFunction } from "@remix-run/node";
import { fetchSpeakSources, createSpeakSources } from "~/routes/api.tsx"

export const loader: LoaderFunction = async () =>  {
  const speaksource = await fetchSpeakSources()
  return json(speaksource);
}

export const action: ActionFunction = async () => {
  
}

export default function route() {
  
  return (
      <div className='bg-white'>
          <Sidebar />
          <ContactUs />
          <Footer />
    </div>
  )
}
