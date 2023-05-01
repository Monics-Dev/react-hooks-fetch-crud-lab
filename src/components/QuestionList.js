import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions") // Removed duplicate fetch call
      .then((response) => response.json())
      .then((questions) => setQuestions(questions));
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((deletedQuestion) => {
        // Remove the deleted question from the list of questions
        const updatedQuestions = questions.filter(
          (q) => q.id !== deletedQuestion.id
        );
        setQuestions(updatedQuestions);
      });
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((response) => response.json())
      .then((updatedQuestion) => {
        // Update the question with the new correctIndex
        const updatedQuestions = questions.map((q) => {
          if (q.id === updatedQuestion.id) {
            return updatedQuestion;
          }
          return q;
        });
        setQuestions(updatedQuestions);
      });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDelete}
            onAnswerChange={handleAnswerChange}
          />
        ))}
      </ul>
      </section>
  );
}

export default QuestionList;