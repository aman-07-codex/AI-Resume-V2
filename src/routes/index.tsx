import { supabase } from "@/lib/supabase";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  PlayCircle,
  Sparkles,
  Target,
  Search,
  Lightbulb,
  FileText,
  Download,
  Upload,
  ClipboardCheck,
  Wand2,
  Check,
  Star,
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ResumeAI — Land More Interviews with AI Resume Analysis" },
      { name: "description", content: "Analyze your resume against any job description, improve ATS compatibility, identify missing skills, and generate optimized resumes in seconds." },
      { property: "og:title", content: "ResumeAI — AI-Powered Resume Analysis" },
      { property: "og:description", content: "Beat the ATS. Match jobs faster. Land more interviews." },
    ],
  }),
  component: Index,
});

function Index() {
  console.log(import.meta.env.VITE_SUPABASE_URL);
  console.log("Supabase Client:", supabase);
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <PricingPreview />
      <FinalCTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-32 sm:pt-28">
      <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="mx-auto max-w-5xl text-center">
        <div className="glass mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground">
          <Sparkles className="h-3 w-3 text-primary" />
          Powered by next-gen AI models
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Land More Interviews with
          <br />
          <span className="gradient-text">AI-Powered Resume Analysis</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Analyze your resume against any job description, improve ATS compatibility, identify missing skills, and generate optimized resumes in seconds.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="gradient-primary text-primary-foreground glow-primary hover:opacity-95">
            <Link to="/dashboard">Analyze Resume Free <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="glass border-border/60">
            <a href="#how"><PlayCircle className="mr-1 h-4 w-4" /> Watch Demo</a>
          </Button>
        </div>
        <HeroPreview />
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="relative mx-auto mt-16 max-w-5xl">
      <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-primary/20 blur-3xl" />
      <div className="glass-strong rounded-3xl p-4 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <ScoreCard label="ATS Score" value="92" tint="from-indigo-500 to-blue-500" />
          <ScoreCard label="Job Match" value="88%" tint="from-blue-500 to-cyan-500" />
          <ScoreCard label="Keywords" value="34/40" tint="from-violet-500 to-indigo-500" />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="glass rounded-2xl p-5">
            <div className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">Skill Coverage</div>
            {["React", "TypeScript", "AWS", "Docker", "GraphQL"].map((s, i) => (
              <div key={s} className="mb-3">
                <div className="mb-1 flex justify-between text-xs">
                  <span>{s}</span><span className="text-muted-foreground">{[95, 88, 72, 65, 50][i]}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full gradient-primary" style={{ width: `${[95, 88, 72, 65, 50][i]}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="glass rounded-2xl p-5">
            <div className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">AI Suggestions</div>
            <ul className="space-y-3 text-sm">
              {["Add measurable impact to bullets", "Include 'Kubernetes' in skills", "Strengthen leadership phrasing", "Use action verbs in summary"].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-1 grid h-4 w-4 place-items-center rounded-full gradient-primary"><Check className="h-3 w-3 text-primary-foreground" /></span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreCard({ label, value, tint }: { label: string; value: string; tint: string }) {
  return (
    <div className="glass relative overflow-hidden rounded-2xl p-5">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tint}`} />
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-2 text-3xl font-bold">{value}</div>
    </div>
  );
}

const FEATURES = [
  { icon: Target, title: "ATS Score Analysis", desc: "Get an instant readiness score with line-by-line feedback." },
  { icon: Search, title: "Keyword Match Detection", desc: "See which job-critical keywords are missing from your resume." },
  { icon: Lightbulb, title: "Missing Skills Identification", desc: "Spot skill gaps and prioritize what to learn next." },
  { icon: Sparkles, title: "AI Resume Suggestions", desc: "Concrete bullet rewrites tailored to the job description." },
  { icon: FileText, title: "Resume Builder", desc: "Compose an ATS-optimized resume with live preview." },
  { icon: Download, title: "PDF & DOCX Export", desc: "Download polished documents ready to send to recruiters." },
] as const;

function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow="Features" title="Everything you need to beat the ATS" desc="A toolkit that turns your resume into an interview magnet." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="glass group rounded-3xl p-6 transition hover:-translate-y-1 hover:border-primary/30">
              <span className="grid h-11 w-11 place-items-center rounded-xl gradient-primary glow-primary transition group-hover:scale-110">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { icon: Upload, title: "Upload Resume", desc: "Drag & drop your PDF or DOCX." },
  { icon: ClipboardCheck, title: "Paste Job Description", desc: "Drop in the job you're targeting." },
  { icon: Sparkles, title: "Get AI Analysis", desc: "Receive scores, keyword gaps, and suggestions." },
  { icon: Wand2, title: "Generate Optimized Resume", desc: "Export an ATS-ready resume in one click." },
] as const;

function HowItWorks() {
  return (
    <section id="how" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow="How It Works" title="From upload to offer in 4 steps" desc="No fluff. Just a faster path to interviews." />
        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={s.title} className="glass rounded-3xl p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl gradient-primary"><s.icon className="h-5 w-5 text-primary-foreground" /></span>
                <span className="text-3xl font-bold text-muted-foreground/30">0{i + 1}</span>
              </div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  { name: "Priya Sharma", role: "Senior Frontend Engineer", quote: "Went from 1 callback per 20 applications to 5. ResumeAI rewired how I think about resumes." },
  { name: "Marcus Chen", role: "Product Manager", quote: "The keyword analysis alone is worth it. I landed three interviews in a week after optimizing." },
  { name: "Elena Ruiz", role: "Data Scientist", quote: "Cleanest AI tool I've used. The ATS score gave me clear, actionable changes — not vague advice." },
] as const;

function Testimonials() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow="Loved by job seekers" title="Real results from real professionals" />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="glass rounded-3xl p-6">
              <div className="mb-3 flex gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-sm leading-relaxed">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full gradient-primary text-sm font-semibold text-primary-foreground">{t.name[0]}</div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingPreview() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHead eyebrow="Pricing" title="Simple plans that pay for themselves" />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <PlanCard
            name="Free"
            price="₹0"
            period="forever"
            features={["5 analyses / month", "ATS score", "Keyword matching", "Basic suggestions"]}
            cta="Get started"
          />
          <PlanCard
            name="ATS Resume Pro"
            price="₹99"
            period="per month"
            featured
            features={["Unlimited analyses", "Resume Builder", "PDF & DOCX export", "Premium AI Suggestions", "Analysis history"]}
            cta="Upgrade Now"
          />
        </div>
      </div>
    </section>
  );
}

export function PlanCard({
  name, price, period, features, cta, featured,
}: { name: string; price: string; period: string; features: string[]; cta: string; featured?: boolean }) {
  return (
    <div className={`relative rounded-3xl p-8 ${featured ? "glass-strong border-primary/40 glow-primary" : "glass"}`}>
      {featured && (
        <span className="absolute -top-3 right-6 rounded-full gradient-primary px-3 py-1 text-xs font-semibold text-primary-foreground">Recommended</span>
      )}
      <h3 className="text-lg font-semibold">{name}</h3>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-5xl font-bold">{price}</span>
        <span className="text-sm text-muted-foreground">/ {period}</span>
      </div>
      <ul className="mt-6 space-y-3 text-sm">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-primary" /> {f}
          </li>
        ))}
      </ul>
      <Button asChild className={`mt-8 w-full ${featured ? "gradient-primary text-primary-foreground" : ""}`} variant={featured ? "default" : "outline"}>
        <Link to="/signup">{cta}</Link>
      </Button>
    </div>
  );
}

function FinalCTA() {
  return (
    <section className="px-6 py-24">
      <div className="glass-strong relative mx-auto max-w-5xl overflow-hidden rounded-3xl p-12 text-center">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-60" style={{ background: "var(--gradient-hero)" }} />
        <h2 className="text-3xl font-bold sm:text-5xl">Ready to improve your resume?</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Join thousands of professionals landing interviews with AI-optimized resumes.</p>
        <Button asChild size="lg" className="mt-8 gradient-primary text-primary-foreground glow-primary">
          <Link to="/dashboard">Start Free Analysis <ArrowRight className="ml-1 h-4 w-4" /></Link>
        </Button>
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</div>
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      {desc && <p className="mt-3 text-muted-foreground">{desc}</p>}
    </div>
  );
}
