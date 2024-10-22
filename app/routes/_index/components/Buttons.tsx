import { Link } from '@remix-run/react'
 function ParticipateBtn() {
  return (
    <button className="inline-block mt-8 bg-primary-700 text-white py-4 px-6 rounded-md shadow-md hover:bg-primary-800 text-sm font-medium">
      <Link to="/participate">Start Participating</Link>
    </button>
  )
}

const RegisterBtn = () => {
  return (
    <button className="inline-block mt-8 py-4 px-6 rounded-md border border-neutral-900 text-sm font-medium hover:bg-primary-200">
      Register/login
    </button>
  )
}


export {ParticipateBtn, RegisterBtn}