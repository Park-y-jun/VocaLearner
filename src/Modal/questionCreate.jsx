import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import './questionCreate.css' 

const QuestionCreate = ({ handleClose, userData, itemKey }) => {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("");

  const createQuestionReq = () => {
    const userInfo = userData.data.data;
    const token = userInfo.accessToken;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const questionData = {
      list_key: itemKey,
      question,
      answer,
    };

    const api = import.meta.env.VITE_API_URL;
    axios
      .post(`${api}/word`, questionData, config)
      .then((response) => console.log(response))
      .catch((error) => {
        console.error(error);
      });
    handleClose();  
  }
  return (
    <div className="frame-questionCreate">
      <h2>앞면:</h2>
      <input
        type="text"
        name="question"
        id="question"
        placeholder="단어를 입력해주세요"
        onChange={(e) => setQuestion(e.target.value)}
      />
      <h2>뒷면:</h2>
      <input
        type="text"
        name="answer"
        id="answer"
        placeholder="앞면의 정답을 입력해주세요"
        onChange={(e) => setAnswer(e.target.value)}
      />
      <div className="questionCreateBtn">
        <button onClick={createQuestionReq}>생성</button>
        <button onClick={handleClose}>취소</button>
      </div>
    </div>
  );
};

QuestionCreate.propTypes = {
  handleClose: PropTypes.func.isRequired,
  userData: PropTypes.object,
  itemKey: PropTypes.number,
};

export default QuestionCreate;
