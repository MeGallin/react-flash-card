import React, { useState, useEffect } from "react";
import FlashCardList from "./FlashCardList";
import "./app.css";
import axios from "axios";

function App() {
  const [flashcards, setFlashCards] = useState(SAMPLE_FLASH_CARDS);

  useEffect(() => {
    axios.get("https://opentdb.com/api.php?amount=10").then((res) => {
      setFlashCards(
        res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer);
          const options = [
            ...questionItem.incorrect_answers.map((a) => decodeString(a)),
            answer,
          ];
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - 0.5),
          };
        })
      );
    });
  }, []);

  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  return <FlashCardList flashcards={flashcards}></FlashCardList>;
}

const SAMPLE_FLASH_CARDS = [
  {
    id: 1,
    question: "What is 2 plus 2?",
    answer: "4",
    options: ["2", "3", "4", "5"],
  },
  {
    id: 2,
    question: "Question 2",
    answer: "answer",
    options: ["answer 1", "answer 3", "answer 4", "answer 5"],
  },
];

export default App;
