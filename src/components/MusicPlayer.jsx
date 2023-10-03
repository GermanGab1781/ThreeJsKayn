import React, { useEffect, useState } from 'react'

export default function MusicPlayer({ theme }) {
  const [soundState, setSoundState] = useState(1);

  //Play--Pause audio
  function play() {
    if (theme.paused) {
      theme.play()
      setSoundState(1)
    } else {
      theme.pause()
      setSoundState(2)
    }

  }
  //reset audio
  function reset() {
    theme.load()
    setSoundState(1)
    theme.play()
  }

  return (
    <div className='absolute w-32 text-white opacity-60 bg-slate-600 bg-opacity-50 z-50 md:top-2 top-9 border px-2 border-black right-[3%] text-center font-Pmarker cursor-pointer select-none' onClick={play}>
      <div className='cursor-pointer'>
        {soundState === 1
          ? (<span className=''>MUSIC: <span className='text-blue-700'>ON</span></span>)
          : (<span className=''>MUSIC: <span className='text-red-700'>OFF</span></span>)
        }
      </div>
      {/* Restart Button */}
      {/* <div className='cursor-pointer border border-black bg-stone-300' onClick={reset}>RESTART</div> */}
    </div>
  )
}
