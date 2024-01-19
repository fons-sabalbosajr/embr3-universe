import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Universe from './Universe';

function App() {
  return(
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/home' element={<Home />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/universe' element={<Universe />}></Route>
      </Routes>
      </BrowserRouter>
  )
}

export default App
