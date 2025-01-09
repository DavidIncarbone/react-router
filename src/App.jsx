
import Main from "./pages/Main";
import Home from "./pages/Home";
import About from "./pages/About";
import DefaultLayout from "./pages/DefaultLayout";

import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  // const myPosts = posts
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route path="/" Component={Home} />
            <Route path="/posts" Component={Main} />
            <Route path="/about" Component={About} />
          </Route>
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
