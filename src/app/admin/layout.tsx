"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Icons from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  // Exclude sidebar from login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Icons.LayoutDashboard },
    { name: "Resources", href: "/admin/resources", icon: Icons.Files },
    { name: "Media", href: "/admin/media", icon: Icons.Image },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] font-sans text-white flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-border/20 bg-[#121214] flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border/20">
          <Link href="/admin/dashboard" className="font-bold text-lg tracking-tight">
            Percepta CMS
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border/20">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full text-left text-muted-foreground hover:text-white hover:bg-white/5 rounded-md transition-colors"
          >
            <Icons.LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-[#09090b]">
        {children}
      </div>
    </div>
  );
}
