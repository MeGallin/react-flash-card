import React, { useState, useEffect, Fragment, useRef } from 'react';
import FlashCardList from './FlashCardList';
import Footer from './Footer';
import './app.css';
import axios from 'axios';

function App() {
  const [flashcards, setFlashCards] = useState([]);
  const [categories, setCategories] = useState([]);

  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php').then((res) => {
      // console.log(res.data);
      setCategories(res.data.trivia_categories);
    });
  }, []);

  function decodeString(str) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get('https://opentdb.com/api.php', {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value,
        },
      })
      .then((res) => {
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
          }),
        );
      });
  }

  return (
    <Fragment>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input
            type="number"
            id="amount"
            min="1"
            step="1"
            defaultValue={10}
            ref={amountEl}
          />
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>
      <div className="container">
        <FlashCardList flashcards={flashcards}></FlashCardList>
      </div>
      <Footer></Footer>
    </Fragment>
  );
}

// const SAMPLE_FLASH_CARDS = [
//   {
//     id: 1,
//     question: "What is 2 plus 2?",
//     answer: "4",
//     options: ["2", "3", "4", "5"],
//   },
//   {
//     id: 2,
//     question: "Question 2",
//     answer: "answer",
//     options: ["answer 1", "answer 3", "answer 4", "answer 5"],
//   },
// ];

export default App;
