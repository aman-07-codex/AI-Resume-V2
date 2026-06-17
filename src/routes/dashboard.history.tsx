import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/dashboard/history")({
  head: () => ({ meta: [{ title: "Analysis History — ResumeAI" }] }),
  component: History,
});

const history = [
  { role: "Senior Frontend Engineer", company: "Stripe", score: 92, match: 88, date: "Today, 2:14 PM" },
  { role: "Product Designer", company: "Linear", score: 81, match: 79, date: "Yesterday" },
  { role: "Data Scientist", company: "Notion", score: 74, match: 70, date: "3 days ago" },
  { role: "Staff Engineer", company: "Vercel", score: 88, match: 84, date: "Last week" },
  { role: "ML Engineer", company: "Perplexity", score: 69, match: 65, date: "2 weeks ago" },
];

function History() {
  return (
    <DashboardLayout>
      <h1 className="mb-2 text-3xl font-bold">Analysis History</h1>
      <p className="mb-8 text-muted-foreground">Every resume analysis you've run, neatly archived.</p>
      <div className="glass overflow-hidden rounded-3xl">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4 hidden md:table-cell">Company</th>
              <th className="px-6 py-4">ATS</th>
              <th className="px-6 py-4 hidden sm:table-cell">Match</th>
              <th className="px-6 py-4 hidden lg:table-cell">Date</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {history.map((h) => (
              <tr key={h.role} className="border-t border-border/40 transition hover:bg-muted/20">
                <td className="px-6 py-4 font-medium">{h.role}</td>
                <td className="px-6 py-4 hidden md:table-cell text-muted-foreground">{h.company}</td>
                <td className="px-6 py-4 font-bold gradient-text">{h.score}</td>
                <td className="px-6 py-4 hidden sm:table-cell">{h.match}%</td>
                <td className="px-6 py-4 hidden lg:table-cell text-muted-foreground">{h.date}</td>
                <td className="px-6 py-4 text-right">
                  <Link to="/results" className="inline-flex items-center text-primary hover:underline">View <ArrowRight className="ml-1 h-3 w-3" /></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}