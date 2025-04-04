"use client";

import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/user.action";
import { ParseResultType } from "@/types/user.types";
import { Lightbulb, LightbulbOffIcon, Volume2, VolumeOff } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

function QuestionSection({
  setCurrentQuestion,
}: {
  setCurrentQuestion: (item: ParseResultType) => void;
}) {
  const params = useParams();
  const [interviewData, setInterviewData] = useState<ParseResultType[]>([]);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hint, setHint] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  console.log(interviewData);

  useEffect(() => {
    if (!params.interviewId) return;

    const fetchAPI = async () => {
      try {
        setLoading(true);
        const res = await fetchData({ id: params.interviewId as string });
        const { jsonMockResp } = res?.result;
        if (jsonMockResp) {
          setInterviewData(jsonMockResp);
          setCurrentQuestion(jsonMockResp[0]);
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
    <div className="flex flex-col mt-10 shadow-2xl my-7 border-r-2 p-6 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 text-center border p-5 md:p-7 rounded-lg ">
        {interviewData.map((item, idx) => (
          <div
            key={idx}
            className={`cursor-pointer rounded-xl  flex flex-col justify-center items-center text-center 
            `}
            onClick={() => {
              speechSynthesis.cancel();
              setCurrentQuestion(item);
              setActiveQuestionIdx(idx);
            }}
          >
            <div className="flex">
              {item.isCompleted ? (
                <>
                  <Button className="bg-green-700 text-white">
                    Question {idx + 1}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className={`cursor-pointer ${
                      activeQuestionIdx === idx
                        ? "bg-gray-600  text-white "
                        : "border-gray-300"
                    }`}
                  >
                    Question {idx + 1}
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {interviewData.length > 0 && (
        <div className="mt-3 font-medium ">
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

          <p>
            {!interviewData[activeQuestionIdx].isCompleted &&
              interviewData[activeQuestionIdx]?.question}
          </p>

          {hint && (
            <div className="bg-yellow-100 mt-4  rounded-lg">
              {interviewData[activeQuestionIdx]?.answer}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default QuestionSection;
