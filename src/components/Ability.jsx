import React from 'react'

export default function Ability({name,desc,img,onC}) {
  return (
    <div onClick={onC} className='border relative cursor-pointer '>
      <div>{name}</div>
      <img src={img} alt={name}></img>
      <span className='absolute '></span>
    </div>
  )
}
