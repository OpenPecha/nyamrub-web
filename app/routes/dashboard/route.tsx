import React, {useEffect} from 'react'
import ContactUs from '../_index/components/ContactUs'
import Footer from '../_index/components/Footer'
import Sidebar from './components/Sidebar'
import { json, LoaderFunction } from "@remix-run/node";
import { getUserSession } from '~/services/session.server';

export const loader: LoaderFunction = async ({request}) => {
  const user = await getUserSession(request);
  const user_id = user?.user_id;
  console.log(user_id);
  // Fetch user data using the user_id
  const response = await fetch(
    `http://localhost:8000/user-speak-contributions/${user_id}`
  );
  const userData = await response.json();

  return json({ user: userData });
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
