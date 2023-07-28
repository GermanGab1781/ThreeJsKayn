import React, { useEffect, useState } from 'react'

export default function MusicPlayer({theme}) {
  const [soundState, setSoundState] = useState(1);
  useEffect(()=>{
    console.log(theme)
  },[])
  //Play--Pause audio
  function play() {
    if (soundState === 1) {
      theme.pause()
      setSoundState(2)
    } else if (soundState === 2) {
      theme.play()
      setSoundState(1)
    }
  }
  //reset audio
  function reset() {
    theme.load()
    setSoundState(1)
    theme.play()
  }

  return (
    <div className='absolute bg-black text-slate-500 z-40 top-2 border right-[20%] w-fit text-center font-Pmarker'>
      <div className='flex justify-center gap-2'>
        <div className='cursor-pointer border border-black bg-stone-300' onClick={play}>
          {soundState === 1 ? (<span className=''>MUSIC: <span className='text-blue-700'>ON</span></span>) : (<span className=''>MUSIC: <span className='text-red-700'>OFF</span></span>)}
        </div>
        {/* Restart Button */}
        {/* <div className='cursor-pointer border border-black bg-stone-300' onClick={reset}>RESTART</div> */}
      </div>
    </div>
  )
}
