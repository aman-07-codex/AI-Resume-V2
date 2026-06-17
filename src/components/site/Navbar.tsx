import { Link } from "@tanstack/react-router";
import { Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/#features", label: "Features" },
    { href: "/#how", label: "How It Works" },
    { href: "/pricing", label: "Pricing" },
  ];
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-strong mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-3xl px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl gradient-primary glow-primary">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="text-lg font-bold tracking-tight">
            Resume<span className="gradient-text">AI</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground transition hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" size="sm">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild size="sm" className="gradient-primary text-primary-foreground hover:opacity-90">
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="glass mx-4 mt-2 flex flex-col gap-3 rounded-2xl p-4 md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm text-muted-foreground">
              {l.label}
            </a>
          ))}
          <Link to="/login" className="text-sm">Login</Link>
          <Button asChild size="sm" className="gradient-primary text-primary-foreground">
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      )}
    </header>
  );
}