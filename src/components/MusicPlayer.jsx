import React, { useEffect, useState } from 'react'
import MainTheme from '../media/audio/MainTheme.mp3'

export default function MusicPlayer() {
  const [sound, setSound] = useState(new Audio(MainTheme));
  const [soundState, setSoundState] = useState(1);

  useEffect(() => {
    if(soundState === 1){
      sound.play()
    }
  }, [])

  //Play--Pause audio
  function play() {
    if (soundState === 1) {
      sound.pause()
      setSoundState(2)
    } else if (soundState === 2) {
      sound.play()
      setSoundState(1)
    }
  }
  //reset audio
  function reset() {
    sound.load()
    setSoundState(1)
    sound.play()
  }

  return (
    <div className='absolute bg-stone-500 z-40 top-2 border right-0 w-1/5 text-center'>
      <div>Music</div>
      <div className='flex justify-center gap-2'>
        <div className='cursor-pointer border border-black bg-stone-300' onClick={play}>
          {soundState === 1 ? (<span>PAUSE</span>) : (<span>PLAY</span>)}
        </div>
        <div className='cursor-pointer border border-black bg-stone-300' onClick={reset}>RESTART</div>
      </div>
    </div>
  )
}
