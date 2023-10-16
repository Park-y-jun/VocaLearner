import { Routes, Route, Link} from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Home from "./Home/home";
import About from "./List/list";
import Modal from "./Modal/signIn";


import "./app.css"

export default function App() {
 const [showModal, setShowModal] = useState(false);
 const [userData, setUserData] = useState(null);
 const [listData, setListData] = useState([]);
 const [error, setError] = useState(false);

 useEffect(() => {
   setShowModal(true);
 }, []);

useEffect(() => {
  if (userData) {
    const userInfo = userData.data.data;
    const token = userInfo.accessToken;
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const api = import.meta.env.VITE_API_URL;
    axios
      .get(`${api}/list/user_key/${userInfo.key}`, config)
      .then((response) => {
       console.log(response);
       setListData(response.data.data);
       setError(false);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      });
  }
}, [userData]);


 const handleClose = () => {
   setShowModal(false);
 };

 const handleData = (Data) => {
   setUserData(Data)
}
 
  return (
    <div>
      {showModal && <Modal handleClose={handleClose} handleData={handleData} />}

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
        <Route path="/" element={<Home listName={listData} error={error} />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}






