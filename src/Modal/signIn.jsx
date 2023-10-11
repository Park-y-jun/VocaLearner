import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./signIn.css";

const Modal = ({ handleClose }) => {
  const [isRegister, setIsRegister] = useState(false);

  const handleSwitch = () => {
    setIsRegister(!isRegister);
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit=" ">
          <h1>VocaLearner</h1>
          {!isRegister ? (
            <>
              <input type="id" placeholder="id" />
              <input type="password" placeholder="password" />
              <button onClick={handleClose}>로그인</button>
            </>
          ) : (
            <>
              <input type="id" placeholder="id" />
              <input type="password" placeholder="password" />
              <input type="passwordCheck" placeholder="passwordCheck" />
              <button onClick={handleClose}>회원가입</button>
            </>
          )}
          {!isRegister ? (
            <>
              <div className="register-link">
                <p>처음이시라면</p>
                <a href="#" onClick={handleSwitch}>
                  가입하기
                </a>
              </div>
            </>
          ) : (
            <>
              <div className="register-link">
                <p>회원이시라면</p>
                <a href="#" onClick={handleSwitch}>
                  돌아가기
                </a>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default Modal;
