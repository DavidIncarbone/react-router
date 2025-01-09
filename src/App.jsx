import DefaultLayout from "./pages/DefaultLayout";
import Main from "./pages/Main";
import Home from "./pages/Home";
import About from "./pages/About";
import PostInfo from "./pages/PostInfo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
function App() {

  // const myPosts = posts
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route path="/" Component={Home} />
            <Route path="/about" Component={About} />
            <Route path="/posts">
              <Route index Component={Main} />
              <Route path=":id" Component={PostInfo} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
