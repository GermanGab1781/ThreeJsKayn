import React from 'react';
import {Route, Routes} from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import HomePage from './pages/Home';
import PresentationBase from './pages/PresentationBase';
import MusicPlayer from './components/MusicPlayer';
import MainTheme from './media/audio/MainTheme.mp3'
import Assassin from './components/threejs/Assassin';
import Rhaast from './components/threejs/Rhaast';

function App() {
  const mainTheme = new Audio(MainTheme)
  mainTheme.volume = 0.6
  mainTheme.loop = true
  return (
    <div className='font-cinzel'>
      <BrowserRouter>
      <MusicPlayer theme={mainTheme}/>
      <Routes>
        <Route path='/' element={<HomePage theme={mainTheme}/>}/>
        <Route path='/KaynBase' element={<PresentationBase/>}/>
        <Route path='/Assassin' element={<Assassin/>}/>
        <Route path='/Rhaast' element={<Rhaast/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
