'use client'

import Live from "@/components/Live";

export default function Page() {
  return (
      <div className="h-[100vh] w-full flex justify-center items-center">
        <h1 className="text-2xl text-white">draw-a-bit</h1>

        <Live/>
      </div>
  );
}