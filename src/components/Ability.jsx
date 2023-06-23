import React from 'react'

export default function Ability({name,img,onC}) {
  return (
    <div onClick={onC} className='border cursor-pointer '>
      <div>{name}</div>
      <img src={img} alt={name}></img>
    </div>
  )
}
