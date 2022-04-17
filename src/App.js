import React, { useState, useEffect } from 'react';
import { wordList } from './Constants/data';

function App() {
  const [boardData, setBoardData] = useState(JSON.parse(localStorage.getItem("board-data")));
  const [charArray, setCharArray] = useState([]);

  useEffect(() => {
    //Generate new word
    if (!boardData || !boardData.solution) {
      //Generate random alphabet
      var alphabetIndex = Math.floor(Math.random() * 26);
      //We are converting the integer(alphabetIndex to char(a-z), In ASCII alphabet starts from 97
      var wordIndex = Math.floor(Math.random() * wordList[String.fromCharCode(97 + alphabetIndex)].length);
      let newBoardData = {
        ...boardData, "solution": wordList[String.fromCharCode(97 + alphabetIndex)][wordIndex],
        "rowIndex": 0,
        "boardWords": [],
        "boardRowStatus": [],
        "presentCharArray": [],
        "absentCharArray": [],
        "correctCharArray": [],
        "status": "IN_PROGRESS"
      };
      setBoardData(newBoardData);
      //Save data in local storage
      localStorage.setItem("board-data", JSON.stringify(newBoardData));
    }
  }, []);

  return (
    <div className="text-center w-screen h-screen text-white bg-gray-900" >
      <nav className="h-16 w-full m-0 border-gray-200 border-b grid place-items-center">
        <h1 className="m-0 text-white text-4xl font-sans">React Wordle</h1>
      </nav>
    </div>
  );
}

export default App;
