"use client";

import { fetchData } from "@/lib/user.action";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

function Interview() {
  const params = useParams();

  console.log("params.interviewId:", params.interviewId);

  useEffect(() => {
    if (params.interviewId) {
      const res = fetchData({ id: params.interviewId as string });
      console.log("res : ", res);
    }
  }, [params.interviewId]);

  return <div>Interview ID: {params.interviewId}</div>;
}

export default Interview;
