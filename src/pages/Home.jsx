import React, { useEffect, useState } from 'react'
import bgImg from '../media/images/BackgroundMain.jpg'
import { NavLink } from 'react-router-dom'
import KaynSelect from '../media/audio/Kayn_Select.mp3'
import { motion } from 'framer-motion'

export default function Home({ theme }) {

  const greeting = new Audio(KaynSelect);
  const [start, setStart] = useState(1)

  function startPage() {
    setStart(2)
    greeting.play()
    theme.play()
  }

  return (
    <div>
      {/* Welcome Screen */}
      <motion.div onClick={startPage}
        className={start === 1
          ? 'absolute bg-black opacity-1 z-50  w-screen h-screen cursor-pointer'
          : 'absolute bg-black opacity-0 -z-10  w-screen h-screen transition-all ease-in-out duration-[5s]'
        }>
        <span className='absolute text-white top-1/2 left-1/2 whitespace-nowrap transform -translate-x-1/2 -translate-y-1/2 text-xl fomt-medium'>
          Start the reaping
        </span>
      </motion.div>
      {/* Main Menu */}
      <div className={start === 1 ? (" absolute text-white opacity-0") : (" absolute text-white opacity-1 transition-all ease-in-out duration-[7s]")} style={{ backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', height: '100vh', width: '100vw' }}>
        <div className='text-center absolute top-10 left-1/2 transform w-screen -translate-x-1/2 text-xl bg-black bg-opacity-20 p-14 border-r-2 border-r-red-700 border-l-2 border-l-blue-700'>
          <div className='text-6xl font-semibold text-blue-700'>Kayn</div>
          <div className='text-xl font-medium whitespace-nowrap'>The shadow reaper</div>
        </div>

        <NavLink className={start === 1
          ? 'absolute text-center whitespace-nowrap bottom-44 left-1/2 transform -translate-x-1/2 text-lg bg-black bg-opacity-90 border p-5'
          : 'absolute text-center whitespace-nowrap bottom-20 left-1/2 transform -translate-x-1/2 text-lg bg-black bg-opacity-90 border p-5 transition-all ease-in-out duration-[8s]'}
          to="/KaynBase">
          Conquer the <span className='text-red-700 font-bold'>Darkin</span>
        </NavLink>
      </div>

    </div>
  )
}