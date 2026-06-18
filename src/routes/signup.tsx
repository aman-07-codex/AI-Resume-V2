import { useState } from "react";
import { supabase } from "@/lib/supabase";
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      if (data.user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .insert({
            id: data.user.id,
            full_name: name,
          });

        if (profileError) {
          alert(profileError.message);
          return;
        }

        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthCard
      title="Create your account"
      subtitle="Start analyzing resumes in under a minute."
      footer={<>Already have an account? <Link to="/login" className="font-semibold text-primary hover:underline">Login</Link></>}
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2"><Label htmlFor="name">Full Name</Label><Input
          id="name"
          placeholder="Alex Morgan"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /></div>
        <div className="space-y-2"><Label htmlFor="email">Email</Label><Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /></div>
        <div className="space-y-2"><Label htmlFor="password">Password</Label><Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /></div>
        <div className="space-y-2"><Label htmlFor="confirm">Confirm Password</Label><Input
          id="confirm"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        /></div>
        <Button
          type="button"
          onClick={handleSignup}
          disabled={loading}
        >Create Account</Button>
        <div className="relative my-4 text-center text-xs text-muted-foreground">
          <span className="relative z-10 px-2">or</span>
          <span className="absolute left-0 top-1/2 h-px w-full bg-border" />
        </div>
        <Button type="button" variant="outline" className="w-full glass">Continue with Google</Button>
      </form>
    </AuthCard>
  );
}