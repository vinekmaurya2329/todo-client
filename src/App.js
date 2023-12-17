import React from 'react';
import './App.css';
import {BrowserRouter,Route,Link, useParams} from 'react-router-dom'
import { Routes } from 'react-router-dom';
import Register from './Component/Register';
import Login from './Component/Login';
import Lists from './Component/Lists';
import LandingPage from './Component/LandingPage';

function App() {
  return (
    <>
     <BrowserRouter>
    <Routes>
  <Route path='/register' element={<Register/>}/> 
  <Route path='/login' element={<Login/>}/>
  <Route path='/lists' element={<Lists/>}/>
  <Route path='/' element={<LandingPage/>}/>

    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
