"use client";

import { Button } from "@/components/ui/button";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import Webcam from "react-webcam";

function Interview() {
  const params = useParams();
  const [webCamEnable, setWebCamEnable] = useState(false);

  return (
    <div className="mt-10  p-5 select-none">
      <h1 className="text-center">Let get started</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 px-5 gap-6 ">
        <div className="flex h-[65%]  flex-col gap-2 text-sm border-2 bg-yellow-100 text-slate-600 font-semibold p-4 rounded-lg">
          <h2 className="flex text-lg text-black">
            <Lightbulb />
            Information
          </h2>
          Enable vidio web cam and Microphone to start your AI genereted mock
          interview , It has 7 question which you can answer and at the last you
          will get the report on the basics of your answer.
          <p>
            NOTE : we never record your vidio Web cam access you can disable at
            any time if you want{" "}
          </p>
        </div>
        <div className="">
          {webCamEnable ? (
            <div className=" flex justify-center flex-col items-center">
              <Webcam
                mirrored={true}
                onUserMedia={() => setWebCamEnable(true)}
                onUserMediaError={() => setWebCamEnable(true)}
                style={{ height: 300 }}
              />
              <Button
                onClick={() => setWebCamEnable(false)}
                className="cursor-pointer"
              >
                Disable Web Cam and Microphone
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 rounded-lg">
              <WebcamIcon className="h-64 border-2  p-5 rounded-xl w-full text-[10rem]" />
              <Button
                onClick={() => setWebCamEnable(true)}
                className="cursor-pointer"
                variant={"link"}
              >
                Enable Web Cam and Microphone
              </Button>
              <Link href={`/dashboard/interview/${params.interviewId}/start`}>
                <Button className="w-full cursor-pointer bg-red-400">
                  Start Interview
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Interview;
