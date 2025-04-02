"use client";

import { fetchData } from "@/lib/user.action";
import { Lightbulb, LightbulbOffIcon, Volume2, VolumeOff } from "lucide-react";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export type interviewDataType = {
  question: string;
  answer: string;
};

function QuestionSection() {
  const params = useParams();
  const [interviewData, setInterviewData] = useState<interviewDataType[]>([]);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hint, setHint] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (!params.interviewId) return;

    const fetchAPI = async () => {
      try {
        setLoading(true);
        const res = await fetchData({ id: params.interviewId as string });
        if (res?.result?.jsonMockResp) {
          setInterviewData(res.result.jsonMockResp);
        }
      } catch (error) {
        console.error("Error fetching interview data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAPI();
  }, [params.interviewId]);

  const textToSpeech = useCallback((text: string) => {
    if (!("speechSynthesis" in window)) {
      toast.error("Speech synthesis not supported");
      return;
    }
    const speech = new SpeechSynthesisUtterance(text);
    speech.onend = () => setIsSpeaking(false);
    speechSynthesis.speak(speech);
    setIsSpeaking(true);
  }, []);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="flex flex-col mt-10 shadow-2xl my-7 border-r-2 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 text-center border p-5 md:p-7 rounded-lg">
        {interviewData.map((_, idx) => (
          <div
            key={idx}
            className={`cursor-pointer rounded-xl py-1 px-4 border  flex flex-col justify-center items-center text-center 
              ${
                activeQuestionIdx === idx
                  ? "bg-gray-300 text-black border-white"
                  : "border-gray-400"
              }`}
            onClick={() => {
              speechSynthesis.cancel();
              setActiveQuestionIdx(idx);
            }}
          >
            <div className="flex">
              Question <span className="font-semibold ml-1  ">{idx + 1}</span>
            </div>
          </div>
        ))}
      </div>

      {interviewData.length > 0 && (
        <div className="mt-3 font-medium">
          <div className="flex justify-end my-4">
            {isSpeaking ? (
              <VolumeOff
                size={37}
                className="cursor-pointer hover:bg-slate-200 p-2 rounded-full"
                onClick={() => {
                  setIsSpeaking(false);
                  speechSynthesis.cancel();
                }}
              />
            ) : (
              <Volume2
                size={37}
                className="cursor-pointer hover:bg-slate-200 p-2 rounded-full"
                onClick={() =>
                  textToSpeech(interviewData[activeQuestionIdx].question)
                }
              />
            )}
            {hint ? (
              <LightbulbOffIcon
                size={37}
                className="cursor-pointer hover:bg-slate-200 p-2 rounded-full"
                onClick={() => setHint(false)}
              />
            ) : (
              <Lightbulb
                size={37}
                className="cursor-pointer hover:bg-slate-200 p-2 rounded-full"
                onClick={() => setHint(true)}
              />
            )}
          </div>

          <p>{interviewData[activeQuestionIdx]?.question}</p>
          {hint && (
            <div className="bg-yellow-100 mt-4 p-2 rounded-lg">
              {interviewData[activeQuestionIdx]?.answer}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default QuestionSection;
