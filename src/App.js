import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
//import Footer from './components/Footer';
import Home from "./views/Home";
import Footer from './components/Footer';
import injectContext from "./store/context";


const App = () => {
  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
  )
}

export default injectContext(App);