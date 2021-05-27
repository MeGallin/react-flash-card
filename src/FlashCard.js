import React, { useState } from "react";

export default function FlashCard({ flashCard }) {
  const [flip, setFlip] = useState(false);

  return (
    <div
      className={`card ${flip ? "flip" : ""}`}
      onClick={() => {
        setFlip(!flip);
      }}
    >
      <div className="front">
        {flashCard.question}
        <div className="flashcard-options">
          {flashCard.options.map((option) => {
            return (
              <div className="flashcard-option" key={option}>
                {option}
              </div>
            );
          })}
        </div>
      </div>
      <div className="back">{flip ? flashCard.answer : flashCard.question}</div>
    </div>
  );
}
