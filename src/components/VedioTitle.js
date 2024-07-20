import React from 'react'

const VedioTitle = ({title, overview}) => {
  return (
    <div className='w-screen aspect-video absolute pt-40 px-24 text-white bg-gradient-to-r from-black'>   
   <h1 className='text-6xl font-bold'>{title}</h1>
   <p className='py-6 text-lg w-1/3'>{overview}</p>
   <div className='my-4'>
      <button className='bg-white p-4 px-16 text-lg text-black rounded-lg hover:bg-opacity-90'>Play</button>
      <button className='mx-2 bg-gray-500  p-4 px-16 text-lg text-white rounded-lg'>More Info</button>
   </div>
    </div>
  )
}

export default VedioTitle
