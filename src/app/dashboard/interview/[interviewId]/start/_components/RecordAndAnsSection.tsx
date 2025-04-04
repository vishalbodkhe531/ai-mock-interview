"use client";
import { Button } from "@/components/ui/button";
import { ParseResultType } from "@/types/user.types";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const SpeechToTextComponent = dynamic(
  () => {
    return import("./SpeechToTextComponent");
  },
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center item-center mt-10 shadow-2xl my-7 border-l-2 p-10">
        <Button
          variant="outline"
          className="mt-10 w-full cursor-pointer shadow-xl border-2"
        >
          Loading...
        </Button>
      </div>
    ),
  }
);

const RecordAndAnsSection = ({
  currentQuestion,
}: {
  currentQuestion?: ParseResultType;
}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SpeechToTextComponent currentQuestion={currentQuestion} />
    </Suspense>
  );
};

export default RecordAndAnsSection;
