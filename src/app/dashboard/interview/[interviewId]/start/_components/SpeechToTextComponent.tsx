"use client";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";

const SpeechToTextComponent = () => {
  const [userAns, setUserAns] = useState("");
  const [transcripts, setTranscripts] = useState<string[]>([]);

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

  const handleClickAns = () => {
    console.log("Recorded Answer:", userAns);
  };

  if (error) {
    console.error("Speech to text error:", error);
  }

  return (
    <div className="flex justify-center item-center mt-10 shadow-2xl my-7 border-l-2 p-10">
      <div className="flex flex-col gap-4 w-full">
        <Button
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

        <Button onClick={handleClickAns} className="w-full" variant="outline">
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
