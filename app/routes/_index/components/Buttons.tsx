import { Link, useLoaderData } from '@remix-run/react'
function ParticipateBtn({ setLoginModalOpen }: { setLoginModalOpen: (open: boolean) => void }) {
  const { user } = useLoaderData();
  return (
    <>
      {user ? (
        <Link
          to="/dashboard"
          className="inline-block mt-8 bg-primary-700 text-white py-4 px-6 rounded-md shadow-md hover:bg-primary-800 text-sm font-medium"
        >
          {/* Start Participating */}
          ལས་འགོ་འཛུགས།
        </Link>
      ) : (
        <div className="inline-block mt-8 bg-primary-700 text-white py-4 px-6 rounded-md shadow-md hover:bg-primary-800 text-sm font-medium" onClick={()=>setLoginModalOpen(true)}>
          {/* Start Participating */}
          ལས་འགོ་འཛུགས།
        </div>
      )}
    </>
  );
}

const RegisterBtn = () => {
  return (
    <button className="inline-block mt-8 py-4 px-6 rounded-md border border-neutral-900 text-sm font-medium hover:bg-primary-200">
      {/* Register/login */}
      ཐོ་འགོད་ཡང་ན་ནང་འཛུལ་གྱིས།
    </button>
  )
}


export {ParticipateBtn, RegisterBtn}