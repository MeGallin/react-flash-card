import React from "react";
import FlashCard from "./FlashCard";

export default function FlashCardList({ flashcards }) {
  return (
    <div className="card-grid">
      {flashcards.map((flashCard) => {
        return <FlashCard flashCard={flashCard} key={flashCard.id} />;
      })}
    </div>
  );
}
