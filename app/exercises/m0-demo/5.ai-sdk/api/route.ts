import { after, NextResponse } from "next/server";

export const GET = async () => {
  after(async () => {
    await runAfterPromise();
  });
  return NextResponse.json({ message: "Hello" });
};

const runAfterPromise = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return "Hello";
};
