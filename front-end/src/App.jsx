// App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Universe from './Universe';
import Dashboard from './menu-component/Dashboard';
import ExportData from './menu-component/ExportData';
import Province from './menu-province/Province';
import Survey from './menu-province/Survey';
import MBU from './menu-province/MBU';

function App() {
  const [dashboardKey, setDashboardKey] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/universe' element={<Universe />} />
        <Route path='/dashboard' element={<Universe />} />
        {/* Add other routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
