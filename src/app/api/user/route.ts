"use server";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { parseResult, userInfo } = await req.json();
    const { userId, userName, profilePic } = userInfo;
    const { interview_questions } = parseResult;

    const isUserExist = await prisma.user.findUnique({
      where: {
        uid: userId,
      },
    });

    if (isUserExist) {
      const mockResponse = await prisma.mockInterview.create({
        data: {
          jsonMockResp: interview_questions,
          userId,
        },
      });

      return NextResponse.json({
        sucess: true,
        mockId: mockResponse.id,
        message: "Data successfully store into the database",
      });
    }

    const user = await prisma.user.create({
      data: {
        uid: userId,
        userName,
        profilePic,
      },
    });

    const mockResponse = await prisma.mockInterview.create({
      data: {
        jsonMockResp: interview_questions,
        userId,
      },
    });

    return NextResponse.json({
      sucess: true,
      mockId: mockResponse.id,
      message: "Data successfully store into the database",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error while store interview data" },
      { status: 400 }
    );
  }
}


