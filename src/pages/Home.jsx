import React, { useEffect, useState } from 'react'
import bgImg from '../media/images/BackgroundMain.jpg'
import { NavLink } from 'react-router-dom'
import KaynSelect from '../media/audio/Kayn_Select.mp3'
import { motion } from 'framer-motion'

export default function Home({ theme }) {

  const [greeting, setGreeting] = useState(new Audio(KaynSelect));
  const [start, setStart] = useState(1)

  function startPage() {
    setStart(2)
    greeting.play()
    theme.play()
  }

  return (
    <div>
      <div className={start === 1 ? (" absolute text-white opacity-0") : (" absolute text-white opacity-1 transition-all ease-in-out duration-[7s]")} style={{ backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', height: '100vh', width: '100vw' }}>
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
      <motion.div onClick={startPage}
        className={start === 1
          ? 'absolute bg-black opacity-1 z-50  w-screen h-screen cursor-pointer'
          : 'absolute bg-black opacity-0 -z-10  w-screen h-screen transition-all ease-in-out duration-[5s]'
        }>
        <span className='absolute text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>Start the reaping</span>
      </motion.div>
    </div>
  )
}