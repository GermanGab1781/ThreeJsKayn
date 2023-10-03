import React from 'react';
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import MusicPlayer from './components/MusicPlayer';
import MainTheme from './media/audio/MainTheme.mp3';
import HomePage from './pages/Home';
import KaynBase from './pages/KaynBase';
import Assassin from './pages/Assassin';
import Rhaast from './pages/Rhaast';
import PortfolioButton from './components/PortfolioButton';

function App() {
  const mainTheme = new Audio(MainTheme)
  mainTheme.volume = 0.3
  console.log(mainTheme.volume)
  mainTheme.loop = true
  return (
    <div className='font-cinzel'>
      <BrowserRouter>
        <MusicPlayer theme={mainTheme} />
        <PortfolioButton />
        <Routes>
          <Route path='/' element={<HomePage theme={mainTheme} />} />
          <Route path='/KaynBase' element={<KaynBase />} />
          <Route path='/Assassin' element={<Assassin />} />
          <Route path='/Rhaast' element={<Rhaast />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
