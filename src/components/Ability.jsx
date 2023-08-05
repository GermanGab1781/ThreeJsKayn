import React from 'react'

export default function Ability({ name, desc, img, onC }) {
  return (
    <div onClick={onC} className='border border-slate-700 group cursor-pointer'>
      <div className='bg-black'>{name}</div>
      <img src={img} alt={name}></img>
      <div className='absolute hidden group-hover:flex bg-black p-3 w-fit min-h-[15rem] -top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full'>
        <span className='m-auto'>{desc}</span>
      </div>
    </div>
  )
}
