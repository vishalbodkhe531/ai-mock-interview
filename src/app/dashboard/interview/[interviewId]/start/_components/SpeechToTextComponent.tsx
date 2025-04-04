"use client";
import { Button } from "@/components/ui/button";
import { ParseResultType } from "@/types/user.types";
import { chatSession } from "@/utils/gemeniAIMode";
import { Mic } from "lucide-react";
import { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import toast from "react-hot-toast";

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
    console.log("currentQuestion : ", currentQuestion);
    if (currentQuestion) currentQuestion.isCompleted = true;
    setUserAns("");
    results.length = 0;
    if (userAns.length < 10) {
      return toast.error("Speak atleast 10 words");
    }

    const feedbackPromt = `Question ${currentQuestion} : ${userAns}, Depen on the question and answer, give me the feedback or rating out of 10 on the answer as area of improvement or good points in just 2-3 lines to improve the answer in JSON format with rating field and feedback field`;

    const result = await chatSession.sendMessage(feedbackPromt);

    if (!result || !result.response) {
      toast.error("Something went wrong..!! Please try again.");
      return;
    }

    let parseResult;
    try {
      const textResponse = await result.response.text();
      const formattedResponse = textResponse
        .replace("```json", "")
        .replace("```", "");
      parseResult = JSON.parse(formattedResponse);
      console.log("parseResult : ", parseResult);
    } catch (jsonError) {
      console.error("Error parsing AI response:", jsonError);
      toast.error("Failed to parse AI response. Please try again.");
      return;
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
      </div>
    </div>
  );
};

export default SpeechToTextComponent;
