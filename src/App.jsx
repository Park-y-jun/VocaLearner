import { Routes, Route, Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Home from "./Home/home";
import Modal from "./Modal/signIn";
import ListCreate from './Modal/listCreate'
import VocaLearn from "./VocaLearn/vocaLern";

import "./app.css"

export default function App() {
 const [signInModal, setSignInModal] = useState(false);
 const [listCreateModal, setListCreateModal] = useState(false);
 const [userData, setUserData] = useState(null);
 const [listData, setListData] = useState([]);
 const [error, setError] = useState(false);

 const location = useLocation();

 useEffect(() => {
   setSignInModal(true);
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


 const handleSignInClose = () => {
   setSignInModal(false);
 };

 const listCreateClose = () => {
  setListCreateModal(false);
 }

 const handleData = (Data) => {
   setUserData(Data)
}

const refreshLists = () => {
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
};

const logOut = () => {
  setUserData(null);
  setSignInModal(true);
};

  return (
    <div>
      {signInModal && (
        <Modal handleClose={handleSignInClose} handleData={handleData} />
      )}
      {listCreateModal && (
        <ListCreate
          handleClose={listCreateClose}
          userData={userData}
          refreshLists={refreshLists}
        />
      )}

      {location.pathname !== "/VocaLearn" && (
        <header>
          <Link to="/" className="header-list">
            Home
          </Link>
          <Link
            onClick={() => setListCreateModal(true)}
            className="header-list"
          >
            Create VocaList
          </Link>
          <Link onClick={logOut} className="header-list">
            Log Out
          </Link>
        </header>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Home listName={listData} error={error} userData={userData} />
          }
        />
        <Route path="/VocaLearn" element={<VocaLearn />} />
      </Routes>
    </div>
  );
}






