import React, {useEffect} from 'react'
import ContactUs from '../_index/components/ContactUs'
import Footer from '../_index/components/Footer'
import Sidebar from './components/Sidebar'
import { json, LoaderFunction } from "@remix-run/node";
import { getUserSession } from '~/services/session.server';


export const loader: LoaderFunction = async ({request}) => {
  const API_ENDPOINT = process.env.API_ENDPOINT
  const user = await getUserSession(request);
  const user_id = user?.user_id;
  const url= new URL(request.url)

  let SourceType =url.searchParams.get('q')
  let res
  switch(SourceType) {
    case 'Speak': 
      const speakType = ["user-speak-contributions"];
      res = await api_call(speakType, API_ENDPOINT, user_id);
      break;
      case 'Listen': 
      const listenType = ["user-listen-contributions"];
      res = await api_call(listenType, API_ENDPOINT, user_id);
      break;
      
  }
  
  return json({ user : res });
}

const api_call  = async (type: [string], endpoint: string, user_id: string) => {
  console.log(">>>>>>>>>>>>", type, endpoint )
  const apis = type.map(t => {
    return `${endpoint}/${t}/${user_id}`
  })
  
  const responses = await Promise.all(apis.map(endpoint =>
    fetch(endpoint).then(res => {
      if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
      return res.json();
    })
  ));
  return responses;
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
