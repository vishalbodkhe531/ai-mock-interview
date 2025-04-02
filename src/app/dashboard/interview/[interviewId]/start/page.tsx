"use client";

import QuestionSection from "./_components/QuestionSection";
import RecordAndAnsSection from "./_components/RecordAndAnsSection";

function StartInterview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 ">
      <QuestionSection />
      <RecordAndAnsSection />
    </div>
  );
}

export default StartInterview;
