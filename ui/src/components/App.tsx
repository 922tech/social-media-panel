import React from 'react';
import {  Route, Routes  } from 'react-router';
import Login from './login/login-page';

function App() {
  return (
    <>
      <Routes>
        Social Media Panel
        <Route path='/auth/login' element={<Login/>} />
      </Routes>  
    </>
  );
}

export default App;
