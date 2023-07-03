import React, { useEffect, useState } from 'react'

export default function MusicPlayer({theme}) {
  const [soundState, setSoundState] = useState(1);

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
    <div className='absolute bg-stone-900 text-slate-400 z-40 top-2 border right-[20%] md:w-1/5 w-1/2 text-center'>
      <div className='flex justify-center gap-2'>
        <div className='cursor-pointer border border-black bg-stone-300' onClick={play}>
          {soundState === 1 ? (<span>MUSIC: ON</span>) : (<span>MUSIC: OFF</span>)}
        </div>
        <div className='cursor-pointer border border-black bg-stone-300' onClick={reset}>RESTART</div>
      </div>
    </div>
  )
}
