"use client";
import axios from "axios";

export interface UserDataType {
  userId: string;
  userName: string;
  profilePic: string;
}

interface PropesType {
  parseResult: any[];
  userInfo: UserDataType;
}

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
