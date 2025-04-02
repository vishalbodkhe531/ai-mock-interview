"use client";

import { fetchData } from "@/lib/user.action";
import { Lightbulb, LightbulbOffIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export type interviewDataType = {
  question: string;
  answer: string;
};

function QuestionSection() {
  const params = useParams();
  const { theme } = useTheme();
  const [interviewData, setInterviewData] = useState<interviewDataType[]>([]);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (params.interviewId) {
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
    }
  }, [params.interviewId]);

  const borderClass = !mounted
    ? "border-gray-300"
    : theme === "dark"
    ? "border-gray-300"
    : "border-gray-700";

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="flex flex-col mt-10 shadow-2xl my-7 border-r-2 p-10">
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 text-center border p-5 md:p-7 rounded-lg ${borderClass}`}
      >
        {interviewData?.map((_, idx) => (
          <div
            className={`cursor-pointer rounded-xl py-1 px-4 border flex flex-col justify-center items-center text-center ${
              activeQuestionIdx === idx
                ? mounted && theme === "dark"
                  ? "bg-slate-200 text-black border-white"
                  : "bg-gray-300 text-black"
                : mounted && theme === "dark"
                ? "border-gray-500"
                : "border-gray-400"
            }`}
            key={idx}
            onClick={() => setActiveQuestionIdx(idx)}
          >
            <div className="flex">
              Question
              <span className="font-semibold ml-1">{idx + 1}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Display question only if data is available */}
      {interviewData.length > 0 && (
        <div className="mt-10 font-medium">
          {interviewData[activeQuestionIdx]?.question}
          <div className="mt-10">
            {!hint ? (
              <div className="flex justify-center w-full">
                <Lightbulb onClick={() => setHint(true)} />
              </div>
            ) : (
              <div>
                <div className="flex justify-center">
                  <LightbulbOffIcon onClick={() => setHint(false)} />
                </div>
                <div className="bg-yellow-100 mt-4 p-2">
                  {interviewData[activeQuestionIdx]?.answer}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionSection;
