import { Routes, Route, Link} from "react-router-dom";
import React, { useState, useEffect } from "react";

import Home from "./Home/home";
import About from "./List/list";
import Modal from "./Modal/signIn";


import "./app.css"

export default function App() {
 
 const [showModal, setShowModal] = useState(false);

 useEffect(() => {
   setShowModal(true);
 }, []);

 const handleClose = () => {
   setShowModal(false);
 };

  return (
    <div>
      {showModal && <Modal handleClose={handleClose} />}
      
      <header>
        <Link to="/" className="header-list">
          Home
        </Link>
        <Link to="/" className="header-list">
          Create VocaList
        </Link>
        <Link to="/about" className="header-list">
          Daily Check
        </Link>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}






