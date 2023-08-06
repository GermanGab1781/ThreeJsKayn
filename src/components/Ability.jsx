import React from 'react'

export default function Ability({ name, desc, img, onC }) {
  return (
    <div className='border border-slate-700 cursor-pointer'>
      <span onClick={onC}>
        <div className='bg-black'>{name}</div>
        <img src={img} alt={name}></img>
      </span>
      <div className='group border-t-2 bg-black border-slate-700'>
        <span className='font-bold'>?</span>
        <div className='absolute hidden group-hover:flex bg-black p-3 md:w-fit w-full h-fit max-h-[140%] md:overflow-hidden overflow-y-auto md:min-h-[15rem] -top-1/2 left-1/2 transform -translate-x-1/2 md:-translate-y-full -translate-y-[80%]'>
          <span className='m-auto'>{desc}</span>
        </div>
      </div>
    </div>
  )
}
