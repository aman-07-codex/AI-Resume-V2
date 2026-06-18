import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/auth";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  History,
  FileText,
  CreditCard,
  Settings,
  LogOut,
  Search,
  Bell,
  Sparkles,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/dashboard/history", label: "Analysis History", icon: History },
  { to: "/resume-builder", label: "Resume Builder", icon: FileText },
  { to: "/pricing", label: "Pricing", icon: CreditCard },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [userEmail, setUserEmail] = useState("");
  useEffect(() => {
  async function loadUser() {
    const user = await getCurrentUser();

    if (user) {
      setUserEmail(user.email ?? "");
    }
  }

  loadUser();
}, []);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="flex min-h-screen w-full">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border/50 bg-sidebar/80 backdrop-blur-xl p-4 lg:flex">
        <Link to="/" className="mb-8 flex items-center gap-2 px-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl gradient-primary glow-primary">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="text-lg font-bold">Resume<span className="gradient-text">AI</span></span>
        </Link>
        <nav className="flex flex-1 flex-col gap-1">
          {nav.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  active
                    ? "gradient-primary text-primary-foreground glow-primary"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link to="/" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-foreground">
          <LogOut className="h-4 w-4" /> Logout
        </Link>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border/50 bg-background/60 px-4 backdrop-blur-xl sm:px-6">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search analyses, resumes..." className="pl-9" />
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button size="sm" className="gradient-primary text-primary-foreground hover:opacity-90">
              <Zap className="mr-1 h-4 w-4" /> Upgrade
            </Button>
            <Button variant="ghost" size="icon"><Bell className="h-4 w-4" /></Button>
            <div className="grid h-9 w-9 place-items-center rounded-full gradient-primary text-sm font-semibold text-primary-foreground">A</div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}