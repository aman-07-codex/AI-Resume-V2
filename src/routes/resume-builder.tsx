import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Download, FileText, Sparkles, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/resume-builder")({
  head: () => ({ meta: [{ title: "Resume Builder — ResumeAI" }, { name: "description", content: "Build an ATS-optimized resume with live preview and AI suggestions." }] }),
  component: Builder,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Builder() {
  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Resume Builder</h1>
          <p className="mt-1 text-muted-foreground">AI-assisted, ATS-optimized, recruiter-ready.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="glass"><Download className="mr-1 h-4 w-4" /> PDF</Button>
          <Button variant="outline" className="glass"><Download className="mr-1 h-4 w-4" /> DOCX</Button>
          <Button className="gradient-primary text-primary-foreground glow-primary"><Sparkles className="mr-1 h-4 w-4" /> Generate Resume</Button>
        </div>
      </div>

      <div className="glass-strong mb-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl gradient-primary glow-primary"><TrendingUp className="h-5 w-5 text-primary-foreground" /></span>
          <div>
            <div className="text-sm text-muted-foreground">ATS Score Improvement</div>
            <div className="font-semibold">Original 62 → <span className="gradient-text">Optimized 89</span></div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="rounded-full bg-amber-400/10 px-3 py-1 text-amber-300">Before 62</span>
          <span>→</span>
          <span className="rounded-full gradient-primary px-3 py-1 font-semibold text-primary-foreground">After 89</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <Section title="Personal Information">
            <div className="grid gap-3 sm:grid-cols-2">
              <div><Label>Full Name</Label><Input defaultValue="Alex Morgan" /></div>
              <div><Label>Title</Label><Input defaultValue="Senior Frontend Engineer" /></div>
              <div><Label>Email</Label><Input defaultValue="alex@morgan.dev" /></div>
              <div><Label>Phone</Label><Input defaultValue="+91 98xxx xxxxx" /></div>
            </div>
          </Section>
          <Section title="Professional Summary"><Textarea rows={4} defaultValue="Senior frontend engineer with 7+ years building performant React applications used by millions." /></Section>
          <Section title="Skills"><Input defaultValue="React, TypeScript, Next.js, GraphQL, AWS, Node.js, Testing, CI/CD" /></Section>
          <Section title="Experience">
            <Input defaultValue="Senior Frontend Engineer — Stripe (2022 – Present)" />
            <Textarea rows={3} defaultValue="• Led migration to Next.js App Router, cutting TTI by 38%.\n• Mentored 4 engineers and built component system used across 5 teams." />
          </Section>
          <Section title="Projects">
            <Input defaultValue="ResumeAI — AI-powered resume optimizer" />
            <Textarea rows={2} defaultValue="React, TypeScript, AI Gateway. 10k+ users in first month." />
          </Section>
          <Section title="Education"><Input defaultValue="B.Tech in Computer Science — IIT Madras" /></Section>
          <Section title="Certifications"><Input defaultValue="AWS Certified Developer · Google UX Design" /></Section>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="glass-strong rounded-3xl p-8">
            <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground"><FileText className="h-3 w-3" /> Live Preview</div>
            <div className="rounded-2xl bg-white/95 p-8 text-slate-900 shadow-2xl">
              <h2 className="text-2xl font-bold">Alex Morgan</h2>
              <div className="text-sm text-slate-600">Senior Frontend Engineer · alex@morgan.dev · +91 98xxx xxxxx</div>
              <hr className="my-4 border-slate-200" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Summary</h3>
              <p className="mt-1 text-sm">Senior frontend engineer with 7+ years building performant React applications used by millions.</p>
              <h3 className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">Skills</h3>
              <p className="mt-1 text-sm">React, TypeScript, Next.js, GraphQL, AWS, Node.js, Testing, CI/CD</p>
              <h3 className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">Experience</h3>
              <p className="mt-1 text-sm font-semibold">Senior Frontend Engineer — Stripe (2022 – Present)</p>
              <ul className="mt-1 list-disc pl-5 text-sm">
                <li>Led migration to Next.js App Router, cutting TTI by 38%.</li>
                <li>Mentored 4 engineers and built component system used across 5 teams.</li>
              </ul>
              <h3 className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">Education</h3>
              <p className="mt-1 text-sm">B.Tech in Computer Science — IIT Madras</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}