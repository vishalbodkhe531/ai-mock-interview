"use client";
import { PropesType } from "@/types/user.types";
import axios from "axios";

export async function fetchPost({ parseResult, userInfo }: PropesType) {
  console.log("userInfo : ", userInfo);
  const response = await axios.post(
    "http://localhost:3000/api/user",
    { parseResult, userInfo },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}
