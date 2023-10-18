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

  return (
    <main className="list">
      {questionCreateModal && (
        <QuestionCreate
          handleClose={closeQuestionCreateModal}
          userData={userData}
          itemKey={selectedItemKey}
        />
      )}
      {error ? (
        <>
          <h1>단어장을 추가 하세요</h1>
        </>
      ) : (
        <>
          <ul>
            {currentItems.map((item) => {
              return (
                <>
                  <li key={item.key}>{item.name}</li>
                  <button
                    onClick={() => {
                      setQuestionCreateModal(true);
                      setSelectedItemKey(item.key);
                    }}
                  >
                    단어 추가
                  </button>
                  <button onClick={() => navigate('/VocaLearn')}>공부 시작</button>
                </>
              );
            })}
          </ul>
        </>
      )}
      {listName.length > itemsPerPage && (
        <>
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
            이전
          </button>
          <button
            onClick={goToNextPage}
            disabled={currentPage * itemsPerPage > listName.length}
          >
            다음
          </button>
        </>
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