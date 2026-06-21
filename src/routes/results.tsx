import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight, Check, AlertTriangle, Sparkles, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/results")({
  head: () => ({ meta: [{ title: "Analysis Results — ResumeAI" }, { name: "description", content: "Your resume's ATS score, keyword match, missing skills and AI recommendations." }] }),
  component: Results,
});

function Results() {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadAnalysis() {

      const params = new URLSearchParams(
        window.location.search
      );

      const analysisId =
        params.get("analysisId");

      if (!analysisId) {
        setLoading(false);
        return;
      }

      const { data, error } =
        await supabase
          .from("analyses")
          .select("*")
          .eq("id", analysisId)
          .single();

      if (!error) {
        setAnalysis(data);
      }

      setLoading(false);
    }

    loadAnalysis();
  }, []);
  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading analysis...</p>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Analysis complete</div>
          <h1 className="text-3xl font-bold">Resume Analysis Results</h1>
          <p className="mt-1 text-muted-foreground">Senior Frontend Engineer · Stripe</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="glass"><Download className="mr-1 h-4 w-4" /> Download Report</Button>
          <Button asChild className="gradient-primary text-primary-foreground glow-primary">
            <Link to="/resume-builder">Build Better Resume <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <BigScore
          label="ATS Score"
          value={analysis?.ats_score ?? 0}
        />
        <BigScore label="Job Match" value={82} suffix="%" tint="from-blue-500 to-cyan-500" />
        <BigScore
          label="Keyword Match"
          value={analysis?.keyword_match ?? 0}
          suffix="%"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-3xl p-6">
          <h2 className="mb-4 font-semibold">Skills Match</h2>
          {[
            { s: "React", v: 95 }, { s: "TypeScript", v: 90 }, { s: "Next.js", v: 80 },
            { s: "GraphQL", v: 60 }, { s: "AWS", v: 45 }, { s: "Kubernetes", v: 20 },
          ].map(({ s, v }) => (
            <div key={s} className="mb-3">
              <div className="mb-1 flex justify-between text-sm"><span>{s}</span><span className="text-muted-foreground">{v}%</span></div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full gradient-primary" style={{ width: `${v}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <PanelList icon={AlertTriangle} title="Missing Skills" tone="warn" items={analysis?.missing_skills ?? []} />
          <PanelList icon={Check} title="Resume Strengths" tone="ok" items={["Strong React & TypeScript depth", "Quantified impact in bullets", "Clear progression of responsibility"]} />
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <PanelList
          icon={TrendingUp}
          title="Improvement Suggestions"
          items={analysis?.suggestions ?? []}
        />
        <PanelList
          icon={Sparkles}
          title="AI Recommendations"
          items={analysis?.suggestions ?? []}
        />
      </div>
    </DashboardLayout>
  );
}

function BigScore({ label, value, suffix = "", tint = "from-indigo-500 to-blue-500" }: { label: string; value: number; suffix?: string; tint?: string }) {
  return (
    <div className="glass relative overflow-hidden rounded-3xl p-6">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tint}`} />
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-5xl font-bold gradient-text">{value}</span>
        <span className="text-xl text-muted-foreground">{suffix || "/100"}</span>
      </div>
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full gradient-primary" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function PanelList({ icon: Icon, title, items, tone }: { icon: typeof Check; title: string; items: string[]; tone?: "ok" | "warn" }) {
  const color = tone === "warn" ? "text-amber-400" : tone === "ok" ? "text-emerald-400" : "text-primary";
  return (
    <div className="glass rounded-3xl p-6">
      <div className="mb-4 flex items-center gap-2">
        <Icon className={`h-4 w-4 ${color}`} />
        <h2 className="font-semibold">{title}</h2>
      </div>
      <ul className="space-y-3 text-sm">
        {items.map((t) => (
          <li key={t} className="flex items-start gap-2">
            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${tone === "warn" ? "bg-amber-400" : tone === "ok" ? "bg-emerald-400" : "bg-primary"}`} />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}