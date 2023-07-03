import React, { useEffect, useState } from 'react'
import bgImg from '../media/images/BackgroundMain.jpg'
import { NavLink } from 'react-router-dom'
import KaynSelect from '../media/audio/Kayn_Select.mp3'

export default function Home({theme}) {

  const [greeting, setGreeting] = useState(new Audio(KaynSelect));
  const [start,setStart] = useState(1)
  
  function startPage(){
    setStart(2)
    greeting.play()
    theme.play()
  }

  return (
    <div className="text-white" style={{backgroundImage: `url(${bgImg})`,backgroundSize: 'cover',backgroundRepeat: 'no-repeat',backgroundPosition: 'center',height: '100vh',width:'100vw'}}>
        <div onClick={startPage} className={start === 1 ?'absolute bg-black z-50 bottom-0 top-0 left-0 right-0' :'absolute'}>Start</div>
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