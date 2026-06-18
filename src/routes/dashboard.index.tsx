import { useEffect, useState } from "react";
import { getCurrentProfile } from "@/lib/profile";
import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, FileText, Sparkles, ArrowRight, Zap } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [{ title: "Dashboard — ResumeAI" }, { name: "description", content: "Upload your resume and a job description to get instant AI analysis." }] }),
  component: Dashboard,
});

const recent = [
  { role: "Senior Frontend Engineer", company: "Stripe", score: 92, date: "2h ago" },
  { role: "Product Designer", company: "Linear", score: 81, date: "Yesterday" },
  { role: "Data Scientist", company: "Notion", score: 74, date: "3d ago" },
];

function Dashboard() {
  const [name, setName] = useState("");
  useEffect(() => {
    async function loadProfile() {
      const profile = await getCurrentProfile();

      if (profile) {
        setName(profile.full_name);
      }
    }

    loadProfile();
  }, []);
  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {name || "User"}
          </h1>
          <p className="mt-1 text-muted-foreground">Let's get your resume interview-ready.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="glass rounded-3xl p-6 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Current Plan</div>
              <div className="mt-1 text-2xl font-bold">Free</div>
            </div>
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <div className="mt-6">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-muted-foreground">Analyses used</span>
              <span className="font-medium">2 / 5</span>
            </div>
            <Progress value={40} className="h-2" />
          </div>
          <Button className="mt-6 w-full gradient-primary text-primary-foreground">Upgrade to Pro</Button>
        </div>

        <div className="glass rounded-3xl p-6 lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <Upload className="h-4 w-4 text-primary" />
            <h2 className="font-semibold">Upload Resume</h2>
          </div>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/60 bg-muted/20 p-10 text-center transition hover:border-primary/50 hover:bg-primary/5">
            <span className="mb-3 grid h-12 w-12 place-items-center rounded-xl gradient-primary glow-primary">
              <Upload className="h-5 w-5 text-primary-foreground" />
            </span>
            <p className="text-sm font-semibold">Drag & drop your resume</p>
            <p className="mt-1 text-xs text-muted-foreground">PDF or DOCX, up to 5MB</p>
            <input type="file" className="hidden" accept=".pdf,.docx" />
          </label>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="glass rounded-3xl p-6 lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <h2 className="font-semibold">Job Description</h2>
          </div>
          <Textarea placeholder="Paste the full job description here..." className="min-h-[200px] resize-none" />
        </div>

        <div className="glass rounded-3xl p-6">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="font-semibold">Analysis Options</h2>
          </div>
          <div className="space-y-3 text-sm">
            {["ATS Score", "Keyword Match", "Missing Skills", "AI Suggestions"].map((o) => (
              <label key={o} className="flex items-center gap-3 rounded-xl p-2 hover:bg-muted/30">
                <Checkbox defaultChecked /> {o}
              </label>
            ))}
          </div>
          <Button asChild className="mt-6 w-full gradient-primary text-primary-foreground glow-primary">
            <Link to="/results">Analyze Resume <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Analyses</h2>
          <Link to="/dashboard/history" className="text-sm text-primary hover:underline">View all</Link>
        </div>
        <div className="grid gap-3">
          {recent.map((r) => (
            <Link to="/results" key={r.role} className="glass flex items-center justify-between rounded-2xl p-4 transition hover:border-primary/30">
              <div>
                <div className="font-semibold">{r.role}</div>
                <div className="text-xs text-muted-foreground">{r.company} · {r.date}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">ATS Score</div>
                  <div className="text-xl font-bold gradient-text">{r.score}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}