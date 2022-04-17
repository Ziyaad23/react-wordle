import React, { useState, useEffect } from 'react';
import { wordList } from './Constants/data';
import Keyboard from './Components/Keyboard';

function App() {
  //Board Data
  const [boardData, setBoardData] = useState(JSON.parse(localStorage.getItem("board-data")));
  //Word for a row
  const [charArray, setCharArray] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  const handleKeyPress = (key) => {
    console.log("Key pressed:", key);
    //Check if user has already completed 5 guesses or if status is Win
    if (boardData.rowIndex > 5 || boardData.status === "WIN") return;
    //If user pressed Enter key
    if (key === "ENTER") {
      if (charArray.length === 5) {
        let word = charArray.join("").toLowerCase();
        if (!wordList[word.charAt(0)].includes(word)) {
          handleError();
          handleMessage("Not in word list");
          return;
        }
        enterBoardWord(word);
        setCharArray([]);
      } else {
        handleMessage("Not enough letters");
      }
      return;
    }
  }

  const handleMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  }

  const handleError = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 2000);
  }

  const enterBoardWord = (word) => {
    let boardWords = boardData.boardWords;
    let boardRowStatus = boardData.boardRowStatus;
    let solution = boardData.solution;
    let presentCharArray = boardData.presentCharArray;
    let absentCharArray = boardData.absentCharArray;
    let correctCharArray = boardData.correctCharArray;
    let rowIndex = boardData.rowIndex;
    let rowStatus = [];
    let matchCount = 0;
    let status = boardData.status;

    //Loop through the user input
    for (var index = 0; index < word.length; index++) {
      //Compare user input to the correct answer(solution)
      if (solution.charAt(index) === word.charAt(index)) {
        //Increment for every correct letter
        matchCount++;
        rowStatus.push("correct");
        if (!correctCharArray.includes(word.charAt(index))) {
          correctCharArray.push(word.charAt(index));
        }
        if (presentCharArray.indexOf(word.charAt(index)) !== -1) {
          presentCharArray.splice(presentCharArray.indexOf(word.charAt(index)), 1);
        }
      } else if (solution.includes(word.charAt(index))) {
        rowStatus.push("present");
        if (!correctCharArray.includes(word.charAt(index)) && !presentCharArray.includes(word.charAt(index))) {
          presentCharArray.push(word.charAt(index));
        }
      } else {
        rowStatus.push("absent");
        if (!absentCharArray.includes(word.charAt(index))) {
          absentCharArray.push(word.charAt(index));
        }
      }
    }
    if (matchCount === 5) {
      status = "WIN";
      handleMessage("YOU WON")
    }
    else if (rowIndex + 1 === 6) {
      status = "LOST";
      handleMessage(boardData.solution)
    }
    boardRowStatus.push(rowStatus);
    boardWords[rowIndex] = word;
    let newBoardData = {
      ...boardData,
      "boardWords": boardWords,
      "boardRowStatus": boardRowStatus,
      "rowIndex": rowIndex + 1,
      "status": status,
      "presentCharArray": presentCharArray,
      "absentCharArray": absentCharArray,
      "correctCharArray": correctCharArray
    };
    setBoardData(newBoardData);
    localStorage.setItem("board-data", JSON.stringify(newBoardData));
  }

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
      <Keyboard boardData={boardData}
        handleKeyPress={handleKeyPress} />
    </div>
  );
}

export default App;
