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
  const test = new Audio(MainTheme)
  return (
    <div>
      <BrowserRouter>
      <MusicPlayer theme={test}/>
      <Routes>
        <Route path='/' element={<HomePage theme={test}/>}/>
        <Route path='/KaynBase' element={<PresentationBase/>}/>
        <Route path='/Assassin' element={<Assassin/>}/>
        <Route path='/Rhaast' element={<Rhaast/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
