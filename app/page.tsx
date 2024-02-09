'use client'

import Live from "@/components/Live";
import Topbar from "@/components/Topbar";

export default function Page() {
  return (
      <main className="overflow-hidden">
        <Topbar />
        <section>
          <Live/>
        </section>
      </main>
  );
}