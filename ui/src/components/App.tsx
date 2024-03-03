import React from 'react';
import {  Route, Routes  } from 'react-router';
import Login from './login/login-page';
import defaultTheme from './Themes';
import { ThemeProvider } from '@mui/material/styles';
import Home from './home/home-page';

function App() {
  return (
    <>
    <ThemeProvider  theme={defaultTheme}>
      <Routes>
        <Route path='/auth/login' element={<Login/>} />
        <Route path='/' element={<Home/>} />
      </Routes>  
      </ThemeProvider >
    </>
  );
}

export default App;
