import About from './components/About'
import { json, LoaderFunction } from '@remix-run/node';
import getTotalUser from '~/utils/getTotaluser';

export const loader: LoaderFunction = async ({ request }) => {
    const url = process.env.API_ENDPOINT + "/user/list";
  const totalUser = await getTotalUser(url);
  return json({ totalUser });
}
export default function route() {
  return (
      <div className='bg-primary-50 min-h-[calc(100vh-90px)]'>
          <About />
    </div>
  )
}
