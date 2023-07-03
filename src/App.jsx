import React from 'react';
import {Route, Routes} from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import HomePage from './pages/Home';
import PresentationBase from './pages/PresentationBase';
import MusicPlayer from './components/MusicPlayer';

function App() {
  return (
    <div>
      <BrowserRouter>
      <MusicPlayer/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/KaynBase' element={<PresentationBase/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
