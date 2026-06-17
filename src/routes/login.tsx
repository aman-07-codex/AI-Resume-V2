import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthCard } from "@/components/site/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — ResumeAI" }, { name: "description", content: "Login to ResumeAI to analyze and optimize your resume with AI." }] }),
  component: Login,
});

function Login() {
  return (
    <AuthCard
      title="Welcome back"
      subtitle="Login to continue optimizing your resume."
      footer={<>Don't have an account? <Link to="/signup" className="font-semibold text-primary hover:underline">Create one</Link></>}
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
          </div>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>
        <Button type="submit" className="w-full gradient-primary text-primary-foreground glow-primary">Login</Button>
        <div className="relative my-4 text-center text-xs text-muted-foreground">
          <span className="relative z-10 px-2">or</span>
          <span className="absolute left-0 top-1/2 h-px w-full bg-border" />
        </div>
        <Button type="button" variant="outline" className="w-full glass">Continue with Google</Button>
      </form>
    </AuthCard>
  );
}