import { useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Outlet } from "react-router-dom";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

export function Default() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Collapsible.Root
      defaultOpen
      onOpenChange={setIsSidebarOpen}
      className="h-screen w-screen text-rotion-100 flex"
    >
      <Sidebar />
      <div className="flex-1 flex flex-col max-h-screen">
        <Header isSidebarOpen={isSidebarOpen} />

        {/* 
            o Outlet é como se fosse o children, passando esse Outlet informamos
            onde vai ser inserido o conteúdo especifico de cada página 
          */}
        <Outlet />
      </div>
    </Collapsible.Root>
  );
}
