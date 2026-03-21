import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AppLayout() {
  return (
    <div className="h-screen grid grid-rows-[60px_1fr]">
      {/* Navbar */}
      <header className="bg-gray-800 text-white flex items-center px-6">
        <Navbar />
      </header>

      {/* Main Body */}
      <div className="grid grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <aside className="bg-gray-900 text-white p-5">
          <nav className="space-y-4">
            <p className="cursor-pointer hover:text-gray-400">Dashboard</p>
            <p className="cursor-pointer hover:text-gray-400">Watchlist</p>
          </nav>
        </aside>

        {/* Page Content */}
        <main className="p-6 overflow-y-auto bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
