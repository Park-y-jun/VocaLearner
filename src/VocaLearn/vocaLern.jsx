import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import './vocaLearn.css' 

const VocaLearn = () => {
  const location = useLocation();
  const { itemKey, token } = location.state;

  const [wordList, setWordList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

   const navigate = useNavigate();

  useEffect(() => {
    if (itemKey && token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const api = import.meta.env.VITE_API_URL;
      axios
        .get(`${api}/word/list/${itemKey}`, config)
        .then((response) => {
          setWordList(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [itemKey, token]);

  const nextQuestion = (difficulty) => {
    const wordNumber = wordList[currentIndex].word_number;
    const listKey = wordList[currentIndex].list_key;

    const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { 
      list_key: listKey,
      word_number: wordNumber,
    }, 
  };

    const api = import.meta.env.VITE_API_URL;
    axios
      .patch(`${api}/word`, {difficulty}, config)
      .then((response) => {
        console.log(response);
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setShowAnswer(false);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  return (
    <div className="frame-VocaLearn">
      {wordList.length > currentIndex ? (
        <div
          className="VocaLearn-question"
          onClick={() => setShowAnswer(!showAnswer)}
        >
          <p>{wordList[currentIndex].question}</p>

          {showAnswer && (
            <div className="VocaLearn-answer">
              <p>{wordList[currentIndex].answer}</p>
              <button onClick={() => nextQuestion("EASY")}>
                EASY
              </button>
              <button onClick={() => nextQuestion("NORMAL")}>
                NORMAL
              </button>
              <button onClick={() => nextQuestion("HARD")}>
                HARD
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="programEnd">
          <p className="ending">오늘의 프로그램이 끝났습니다 내일봐요 ^^!</p><br/>
          <p className="startPlz">⚠️해당 단어장에 단어를 추가한적이 없으시다면 추가해서 암기를 시작하세요</p>
        </div>
      )}
      <button className="gotoHome" onClick={() => navigate("/")}>홈으로</button>
    </div>
  );
}

export default VocaLearn;