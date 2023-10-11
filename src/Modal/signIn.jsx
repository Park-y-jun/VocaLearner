import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./signIn.css"; 

const Modal = ({ handleClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit=" ">
          <h1>VocaLearner</h1>
          <input type="id" placeholder="id" />
          <input type="password" placeholder="password" />
          <button onClick={handleClose}>로그인</button>
          <div className="register-link">
            <p>처음이시라면</p>
            <a href="/">가입하기</a>
          </div>
        </form>
      </div>
    </div>
  );
};

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default Modal;
