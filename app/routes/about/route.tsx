import About from './components/About'
import { json, LoaderFunction } from '@remix-run/node';
import getTotalUser from '~/utils/getTotaluser';

export const loader: LoaderFunction = async ({ request }) => {
    const url = process.env.API_ENDPOINT + "/get_all_users";
  const totalUser = await getTotalUser(url);
  console.log("total user ;:::: ",totalUser)
  return json({ totalUser });
}
export default function route() {
  return (
      <div className='bg-primary-50 h-[calc(100vh-90px)]'>
          <About />
    </div>
  )
}
