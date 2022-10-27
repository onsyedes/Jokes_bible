import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar ,Header,Footer} from './components';
import {Home,JokeStats} from './pages';
import './styles/App.css';

function App() {
  return (
    <>
     <BrowserRouter>

     <Navbar/>
      <Header/>
      <div className='container'>
    <Routes>
      <Route path='/'
      exact
      element={<Home/>}
      />
      <Route path='/joke-stats/:id'
      
      element={<JokeStats/>}
      />
    </Routes>
      </div>
      <Footer/>

     </BrowserRouter>
      
    </>
  );
}

export default App;
