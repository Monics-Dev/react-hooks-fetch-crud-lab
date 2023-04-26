

import QuestionItem from "./QuestionItem"
import React, { useEffect, useState } from "react";


function QuestionList() {
  const [Item, setItems] = useState("AllQuestions")
  
  useEffect(() => {
    fetch("http://localhost:5000/Questions")
    .then(response => response.json())
    .then(data => (data))
    .catch(error => console.error(error));
  }, []);

    return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{
      

      /* display QuestionItem components here after fetching */}</ul>
    </section>
  );
}

export default QuestionList;
