import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthCard } from "@/components/site/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — ResumeAI" }, { name: "description", content: "Sign up for ResumeAI and start landing more interviews." }] }),
  component: Signup,
});

function Signup() {
  return (
    <AuthCard
      title="Create your account"
      subtitle="Start analyzing resumes in under a minute."
      footer={<>Already have an account? <Link to="/login" className="font-semibold text-primary hover:underline">Login</Link></>}
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2"><Label htmlFor="name">Full Name</Label><Input id="name" placeholder="Alex Morgan" /></div>
        <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" placeholder="you@example.com" /></div>
        <div className="space-y-2"><Label htmlFor="password">Password</Label><Input id="password" type="password" placeholder="••••••••" /></div>
        <div className="space-y-2"><Label htmlFor="confirm">Confirm Password</Label><Input id="confirm" type="password" placeholder="••••••••" /></div>
        <Button type="submit" className="w-full gradient-primary text-primary-foreground glow-primary">Create Account</Button>
        <div className="relative my-4 text-center text-xs text-muted-foreground">
          <span className="relative z-10 px-2">or</span>
          <span className="absolute left-0 top-1/2 h-px w-full bg-border" />
        </div>
        <Button type="button" variant="outline" className="w-full glass">Continue with Google</Button>
      </form>
    </AuthCard>
  );
}