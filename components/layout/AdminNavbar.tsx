"use client";

import { LogOut, Home, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export const AdminNavbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
            Admin Portal
          </h1>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          
          <Link 
            href="/"
            className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 text-sm font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="hidden md:inline">Website</span>
          </Link>
          
          <div className="w-px h-6 bg-neutral-800 mx-1 hidden md:block"></div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
