import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
      {wordList.length > currentIndex && (
        <div>
          <p onClick={() => setShowAnswer(!showAnswer)}>
            {wordList[currentIndex].question}
          </p>

          {showAnswer && (
            <>
              <p>{wordList[currentIndex].answer}</p>
              <button onClick={() => nextQuestion("EASY")}>EASY</button>
              <button onClick={() => nextQuestion("NORMAL")}>NORMAL</button>
              <button onClick={() => nextQuestion("HARD")}>HARD</button>
            </>
          )}
        </div>
      )}
      <button onClick={() => navigate("/")}>홈으로</button>
    </div>
  );
}

export default VocaLearn;