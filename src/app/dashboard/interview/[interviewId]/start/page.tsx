"use client";

import { useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAndAnsSection from "./_components/RecordAndAnsSection";

function StartInterview() {
  const [currentQuestion, setCurrentQuestion] = useState("");


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
      <QuestionSection setCurrentQuestion={setCurrentQuestion} />
      <RecordAndAnsSection currentQuestion={currentQuestion} />
    </div>
  );
}

export default StartInterview;
