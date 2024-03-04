import React from 'react';
import {  Route, Routes  } from 'react-router';
import Login from './login/login-page';
import defaultTheme from './themes';
import { ThemeProvider } from '@mui/material/styles';
import Home from './home-page/home-page';
import ProfilePage from './profile-page/profile-page';
import NotFoundPage from './not-found-page/not-found-page';
import Layout from '../containers/layout';
import { CssBaseline } from '@mui/material';
import Header from '../containers/header';

function App(){
  return (
    <>
    <ThemeProvider  theme={defaultTheme}>
      <CssBaseline />
      <Header />
      <Layout>
        <Routes>
          <Route path='/auth/login' element={<Login />} />
          <Route path='/' element={<Home/>} />
          <Route path='/profile' element={<ProfilePage/>} />
          <Route path='*' element={<NotFoundPage/>} />
        </Routes>  
      </Layout>
      </ThemeProvider >
    </>
  );
}

export default App;
