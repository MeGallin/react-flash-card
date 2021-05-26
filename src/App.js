import React, { useState } from "react";
import FlashCardList from "./FlashCardList";

function App() {
  const [flashcards] = useState(SAMPLE_FLASH_CARDS);
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
