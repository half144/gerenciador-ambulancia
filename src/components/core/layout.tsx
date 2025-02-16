import Sidebar from "./sidebar";
import TopNav from "./top-nav";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full flex flex-1 flex-col">
        <header className="h-16 border-b border-gray-200 dark:border-[#1F1F23]">
          <TopNav />
        </header>
        <main className="flex-1 overflow-auto p-6 bg-white dark:bg-[#0F0F12] container mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
