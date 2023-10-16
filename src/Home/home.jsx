import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./home.css";

const Home = ({ listName, error }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5;

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listName.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <main className="list">
      {error ? (
        <>
          <h1>단어장을 추가 하세요</h1>
        </>
      ) : (
        <>
          <ul>
            {currentItems.map((item, index) => {
              return <li key={index}>{item.name}</li>; // return 추가
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
};
 
export default Home;