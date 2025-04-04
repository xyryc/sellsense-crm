import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React from "react";
import { Toaster } from "react-hot-toast";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-6 bg-gray-100 overflow-y-auto dark:bg-gray-900 flex-1">
          {children}
          <Toaster />
        </main>
      </div>
    </div>
  );
};

export default layout;
