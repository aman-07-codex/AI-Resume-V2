import { supabase } from "@/lib/supabase";
import { getCurrentUser } from "@/lib/auth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
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
  const handleAnalyzeResume = async () => {
  try {
    if (!selectedResumeId) {
      alert("Please select a resume");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please paste a job description");
      return;
    }

    const user = await getCurrentUser();

    if (!user) {
      alert("Please login again");
      return;
    }

    // Save Job Description
    const { data: jdData, error: jdError } = await supabase
      .from("job_descriptions")
      .insert({
        user_id: user.id,
        title: "Job Description",
        content: jobDescription,
      })
      .select()
      .single();

    if (jdError) throw jdError;

    // Create Mock Analysis
    const { data: analysisData, error: analysisError } = await supabase
      .from("analyses")
      .insert({
        user_id: user.id,
        resume_id: selectedResumeId,
        job_description_id: jdData.id,

        ats_score: 78,
        keyword_match: 75,

        missing_skills: [
          "Kubernetes",
          "Terraform",
          "CI/CD"
        ],

        suggestions: [
          "Add quantified achievements",
          "Add cloud experience",
          "Improve ATS keywords"
        ]
      })
      .select()
      .single();

    if (analysisError) throw analysisError;

    window.location.href =
      `/results?analysisId=${analysisData.id}`;

  } catch (error) {
    console.error(error);
    alert("Analysis failed");
  }
};
  const [jobDescription, setJobDescription] = useState("");
  const [selectedResumeId, setSelectedResumeId] = useState("");
  const handleDeleteResume = async (
    resumeId: string,
    filePath: string
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmed) return;

    try {
      const { error: storageError } = await supabase.storage
        .from("resumes")
        .remove([filePath]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from("resumes")
        .delete()
        .eq("id", resumeId);

      if (dbError) throw dbError;

      await loadResumes();

      alert("Resume deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };
  const handleViewResume = async (filePath: string) => {
    const { data, error } = await supabase.storage
      .from("resumes")
      .createSignedUrl(filePath, 60);

    if (error) {
      console.error(error);
      alert("Unable to open resume");
      return;
    }

    window.open(data.signedUrl, "_blank");
  };
  useEffect(() => {
    loadResumes();
  }, []);
  const loadResumes = async () => {
    const user = await getCurrentUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("resumes")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setResumes(data);

      if (data.length > 0) {
        setSelectedResumeId(data[0].id);
      }
    }
  };
  const [uploading, setUploading] = useState(false);
  const [resumes, setResumes] = useState<any[]>([]);
  const handleResumeUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const user = await getCurrentUser();

      if (!user) {
        alert("Please login first");
        return;
      }

      const filePath = `${user.id}/${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("resumes")
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from("resumes")
        .insert({
          user_id: user.id,
          file_name: file.name,
          file_url: data.publicUrl,
          file_path: filePath,
        });

      if (dbError) throw dbError;

      await loadResumes();
      alert("Resume uploaded successfully!");
    } catch (error) {
      console.error("UPLOAD ERROR:", error);
      alert(JSON.stringify(error));
    } finally {
      setUploading(false);
    }
  };
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
    <ProtectedRoute>
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
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
              />
            </label>
          </div>
          <div className="glass rounded-3xl p-6 lg:col-span-2">
            <h2 className="mb-4 font-semibold">My Uploaded Resumes</h2>

            {resumes.length === 0 ? (
              <p className="text-muted-foreground">
                No resumes uploaded yet.
              </p>
            ) : (
              <div className="space-y-3">
                {resumes.map((resume) => (
                  <div
                    key={resume.id}
                    className="flex items-center justify-between rounded-xl border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="selectedResume"
                        checked={selectedResumeId === resume.id}
                        onChange={() => setSelectedResumeId(resume.id)}
                      />

                      <p className="font-medium">
                        {resume.file_name}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleViewResume(resume.file_path)}
                      >
                        View
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          handleDeleteResume(
                            resume.id,
                            resume.file_path
                          )
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="glass rounded-3xl p-6 lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <h2 className="font-semibold">Job Description</h2>
            </div>
            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here..."
              className="min-h-[200px] resize-none"
            />
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
            <Button
              className="mt-6 w-full gradient-primary text-primary-foreground glow-primary"
              onClick={handleAnalyzeResume}
            >
              Analyze Resume <ArrowRight className="ml-1 h-4 w-4" />
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
    </ProtectedRoute>
  );
}