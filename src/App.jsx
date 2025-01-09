// import Footer from "./components/Footer";
// import Header from "./components/Header";
import Main from "./pages/Main";
import Home from "./pages/Home";

import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  // const myPosts = posts
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          {/* <Route path="/" Component={Main} />
          <Route path="/" Component={Main} /> */}
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
