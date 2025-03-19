"use client";
import { PropesType } from "@/types/user.types";
import axios from "axios";

export async function storeData({ parseResult, userInfo }: PropesType) {
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

export async function fetchData({ id }: { id: string }) {
  console.log("userInfo : ", id);
  const response = await axios.get(`http://localhost:3000/api/user/${id}`);
  return response.data;
}
