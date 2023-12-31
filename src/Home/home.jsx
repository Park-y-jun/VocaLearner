import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import QuestionCreate from "../Modal/questionCreate";
import "./home.css";

const Home = ({ listName, error, userData}) => {
  const navigate = useNavigate();
  const [questionCreateModal, setQuestionCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedItemKey, setSelectedItemKey] = useState(null);
  
  const closeQuestionCreateModal = () => {
    setQuestionCreateModal(false)
  } 
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listName.slice(indexOfFirstItem, indexOfLastItem);
  const userInfo = userData ? userData.data.data : null;

  return (
    <main className="list">
      {questionCreateModal && userInfo && (
        <QuestionCreate
          handleClose={closeQuestionCreateModal}
          userData={userData}
          itemKey={selectedItemKey}
        />
      )}
      {error ? (
        <div className="noList">
          <h1>&#x2191;</h1>
          <br /> <p>단어장을 추가 하세요</p>
        </div>
      ) : (
        <>
          <ul>
            {currentItems.map((item) => {
              return (
                <div className="singleList" key={item.key}>
                  <li>{item.name}</li>
                  <button
                    onClick={() => {
                      setQuestionCreateModal(true);
                      setSelectedItemKey(item.key);
                    }}
                  >
                    단어 추가
                  </button>
                  <button
                    onClick={() => {
                      navigate("/VocaLearn", {
                        state: {
                          itemKey: item.key,
                          token: userInfo.accessToken,
                        },
                      });
                    }}
                  >
                    공부 시작
                  </button>
                </div>
              );
            })}
          </ul>
        </>
      )}
      {listName.length > itemsPerPage && (
        <div className="goToBtn">
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
            이전
          </button>
          <button
            onClick={goToNextPage}
            disabled={currentPage * itemsPerPage > listName.length}
          >
            다음
          </button>
        </div>
      )}
    </main>
  );
};

Home.propTypes = {
  listName: PropTypes.array,
  error: PropTypes.bool,
  userData: PropTypes.object,
};
 
export default Home;