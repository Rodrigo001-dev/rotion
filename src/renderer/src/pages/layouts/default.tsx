import { Outlet } from "react-router-dom";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

export function Default() {
  return (
    <div className="h-screen w-screen text-rotion-100 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col max-h-screen">
        <Header />

        {/* 
            o Outlet é como se fosse o children, passando esse Outlet informamos
            onde vai ser inserido o conteúdo especifico de cada página 
          */}
        <Outlet />
      </div>
    </div>
  );
}
