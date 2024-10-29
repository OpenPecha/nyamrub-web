import React from 'react'

export default function ContactUs() {
    return (
       <div className="flex flex-col md:flex-row justify-between items-center bg-primary-900 p-10 text-white">
          <div className="mb-8 md:mb-0">
            <h2 className="text-3xl font-bold">Need More Information?</h2>
            <p className="text-lg mt-4">
              Write your concern to us, we will respond back to you.
            </p>
          </div>
          <button className="bg-[#c1a45f] text-black px-6 py-3 rounded-md">
            Contact Us
          </button>
        </div>
  )
}
