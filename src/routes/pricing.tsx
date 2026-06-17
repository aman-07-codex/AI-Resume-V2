import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PlanCard } from "./index";

export const Route = createFileRoute("/pricing")({
  head: () => ({ meta: [{ title: "Pricing — ResumeAI" }, { name: "description", content: "Simple plans for ResumeAI. Free tier and ATS Resume Pro for serious job seekers." }] }),
  component: Pricing,
});

function Pricing() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="px-6 pt-20 pb-12 text-center">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Pricing</div>
        <h1 className="mx-auto max-w-2xl text-4xl font-bold sm:text-5xl">Plans that pay for themselves</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Start free. Upgrade when you're ready to land more interviews.</p>
      </section>
      <section className="mx-auto grid max-w-5xl gap-4 px-6 pb-24 md:grid-cols-2">
        <PlanCard name="Free" price="₹0" period="forever" features={["5 analyses / month", "ATS score", "Keyword matching", "Basic AI suggestions"]} cta="Get started" />
        <PlanCard name="ATS Resume Pro" price="₹99" period="per month" featured features={["Unlimited analyses", "Resume Builder with live preview", "PDF & DOCX export", "Premium AI Suggestions", "Full analysis history", "Priority processing"]} cta="Upgrade Now" />
      </section>
      <Footer />
    </div>
  );
}