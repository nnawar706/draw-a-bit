'use client'

import Live from "@/components/Live";
import Topbar from "@/components/Topbar";
import SidebarLeft from "@/components/sidebar/SidebarLeft";
import SidebarRight from "@/components/sidebar/SidebarRight";

export default function Page() {
  return (
      <main className="overflow-hidden h-screen">
        <Topbar />
        <section className="flex flex-row h-full">
          <SidebarLeft/>
          <Live/>
          <SidebarRight/>
        </section>
      </main>
  );
}