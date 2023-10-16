import React, { useState} from "react";
import { Routes, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";


import "./signIn.css";
import axios from "axios";

const Modal = ({ handleClose, handleData }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSwitch = () => {
    setIsRegister(!isRegister);
    setId("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const api = import.meta.env.VITE_API_URL;
    const signInData = {
      id: Id,
      password: Password,
    };

    if (isRegister) {
      if (Password !== confirmPassword) {
        alert("비밀번호 불일치!");
        return;
      }

      sendRequest(`${api}/user/sign-up`, signInData);
    } else {
      sendRequest(`${api}/user/sign-in`, signInData);
    }
  };

  const sendRequest = (url, data) => {
    axios
      .post(url, data)
      .then((response) => {
        
        if (isRegister) {
          setIsRegister(false)
        } else {
          handleData(response);
          handleClose();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h1>VocaLearner</h1>
          {!isRegister ? (
            <>
              <input
                type="id"
                name="id"
                value={Id}
                onChange={(e) => setId(e.target.value)}
                placeholder="id"
              />
              <input
                type="password"
                name="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
              />
              {/* <button onClick={handleClose}>로그인</button> */}
              <button>로그인</button>
            </>
          ) : (
            <>
              <input
                type="id"
                name="id"
                value={Id}
                onChange={(e) => setId(e.target.value)}
                placeholder="아이디"
              />
              <input
                type="password"
                name="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
              />
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="비밀번호 확인"
              />
              {/* <button onClick={handleClose}>회원가입</button> */}
              <button>회원가입</button>
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
  handleData: PropTypes.func.isRequired,
};

export default Modal;
