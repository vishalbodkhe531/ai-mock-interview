"use client";
import { Button } from "@/components/ui/button";
import { ParseResultType } from "@/types/user.types";
import { chatSession } from "@/utils/gemeniAIMode";
import { Mic } from "lucide-react";
import { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import toast from "react-hot-toast";

type QuestionFeedback = {
  currentQuestion: {
    answer: string;
    question: string;
    isCompleted: boolean;
    question_number: number;
  };
  feedback: string;
  rating: number;
};

const SpeechToTextComponent = ({
  currentQuestion,
}: {
  currentQuestion?: ParseResultType;
}) => {
  const [userAns, setUserAns] = useState("");
  const [_, setTranscripts] = useState<string[]>([]);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    timeout: 10000000,
    speechRecognitionProperties: {
      lang: "en-US",
      interimResults: true,
    },
  });

  useEffect(() => {
    if (results && Array.isArray(results)) {
      const newTranscripts = results.map((result: any) => {
        if (typeof result === "string") return result;
        return result.transcript || "";
      });

      setUserAns(newTranscripts.join(" "));
      setTranscripts(newTranscripts);
    }
  }, [results]);

  const handleStartRecording = async () => {
    try {
      await startSpeechToText();
    } catch (err) {
      console.error("Error starting recording:", err);
    }
  };

  const handleStopRecording = () => {
    try {
      stopSpeechToText();
    } catch (err) {
      console.error("Error stopping recording:", err);
    }
  };

  const handleClickAns = async () => {
    if (currentQuestion) currentQuestion.isCompleted = true;
    results.length = 0;

    if (userAns.trim().split(" ").length < 10) {
      return toast.error("Speak at least 10 words");
    }

    const questionText = currentQuestion?.question || "Unknown question";

    const feedbackPromt = `Question: "${questionText}"\nAnswer: "${userAns}"\n\nBased on the answer, give feedback and a rating out of 10. Respond in JSON format like:\n{\n  "rating": 8,\n  "feedback": "Your answer was clear but could include more real-world examples."\n}`;

    try {
      const result = await chatSession.sendMessage(feedbackPromt);

      if (!result || !result.response) {
        toast.error("Something went wrong..!! Please try again.");
        return;
      }

      const textResponse = await result.response.text();

      const formattedResponse = textResponse
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsed = JSON.parse(formattedResponse);

      if (currentQuestion) {
        currentQuestion.aifeed = parsed;
        currentQuestion.isCompleted = true;
      }

      console.log("currentQuestion : ", currentQuestion);
      setUserAns("");
    } catch (err) {
      console.error("Error parsing AI response:", err);
      toast.error("Failed to parse AI response. Please try again.");
    }
  };

  if (error) {
    console.error("Speech to text error:", error);
  }

  return (
    <div className="flex justify-center item-center mt-10 shadow-2xl my-7 border-l-2 p-10">
      <div className="flex flex-col gap-4 w-full">
        <Button
          disabled={currentQuestion?.isCompleted}
          className={`mt-10 w-full cursor-pointer shadow-xl border-2 ${
            isRecording && "py-7"
          }`}
          variant={"outline"}
          onClick={isRecording ? handleStopRecording : handleStartRecording}
        >
          {isRecording ? (
            <div className="flex flex-col justify-between items-center text-red-600">
              <Mic />
              Recording..
            </div>
          ) : (
            "Record Answer"
          )}
        </Button>

        <Button
          disabled={currentQuestion?.isCompleted}
          onClick={handleClickAns}
          className="w-full"
          variant="outline"
        >
          Show Answer
        </Button>

        {interimResult && (
          <div className="mt-4 p-4 border rounded-md bg-gray-50">
            <p className="text-gray-600">Current: {interimResult}</p>
          </div>
        )}

        {currentQuestion?.isCompleted && currentQuestion?.aifeed && (
          <div className="mt-6 p-4 border rounded-md bg-green-50 shadow">
            <p className="font-semibold">
              Rating: {currentQuestion?.aifeed?.rating} / 10
            </p>
            <p className="text-gray-700 mt-2">
              {currentQuestion?.aifeed?.feedback}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeechToTextComponent;
