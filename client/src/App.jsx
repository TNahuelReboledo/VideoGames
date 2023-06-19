import { Route, Routes , useLocation } from "react-router";
import { Detail, Form, Home, Landing } from './views'
import NavBar from "./components/NavBar/NavBar";
// import { useState } from "react";
// import axios from "axios";

const App = () => {

  const location = useLocation();

  return (
    <div>
      {location.pathname !== '/' && <NavBar />}
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/detail/:id' element={<Detail />} />
        <Route exact path='/form' element={<Form />} />
      </Routes>
    </div>
  )
}

export default App
