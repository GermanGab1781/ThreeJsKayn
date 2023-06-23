import React from 'react'
import bgImg from '../media/images/BackgroundMain.jpg'
import { NavLink } from 'react-router-dom'

export default function home() {
  return (
    <div className="text-white" style={{backgroundImage: `url(${bgImg})`,backgroundSize: 'cover',backgroundRepeat: 'no-repeat',backgroundPosition: 'center',height: '100vh',width:'100vw'}}>
        <div className='text-center absolute top-24 left-1/2 transform -translate-x-1/2 text-xl'>
          <div>Kayn</div>
          <div>The shadow reaper</div>
        </div>
        
        <div className='text-center absolute bottom-32 left-1/2 transform -translate-x-1/2 text-lg border p-5'>
          <NavLink to="/KaynBase">
          Conquer the darkin
          </NavLink>
          
        </div>
    </div>
  )
}