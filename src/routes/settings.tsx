import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — ResumeAI" }, { name: "description", content: "Manage your ResumeAI profile, password, notifications and subscription." }] }),
  component: Settings,
});

function Card({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-3xl p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      {desc && <p className="mt-1 text-sm text-muted-foreground">{desc}</p>}
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Settings() {
  return (
    <DashboardLayout>
      <h1 className="mb-2 text-3xl font-bold">Settings</h1>
      <p className="mb-8 text-muted-foreground">Manage your account and preferences.</p>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Profile Information">
          <div className="grid gap-3 sm:grid-cols-2">
            <div><Label>Full Name</Label><Input defaultValue="Alex Morgan" /></div>
            <div><Label>Email</Label><Input defaultValue="alex@morgan.dev" /></div>
          </div>
          <Button className="mt-5 gradient-primary text-primary-foreground">Save changes</Button>
        </Card>
        <Card title="Change Password">
          <div className="space-y-3">
            <div><Label>Current Password</Label><Input type="password" /></div>
            <div><Label>New Password</Label><Input type="password" /></div>
          </div>
          <Button className="mt-5" variant="outline">Update password</Button>
        </Card>
        <Card title="Notification Preferences">
          {[
            { l: "Analysis completion emails", v: true },
            { l: "Weekly resume tips", v: true },
            { l: "Product updates", v: false },
          ].map((n) => (
            <div key={n.l} className="flex items-center justify-between border-t border-border/40 py-3 first:border-t-0">
              <span className="text-sm">{n.l}</span><Switch defaultChecked={n.v} />
            </div>
          ))}
        </Card>
        <Card title="Subscription" desc="You're on the Free plan.">
          <div className="flex items-center justify-between rounded-2xl bg-muted/30 p-4">
            <div>
              <div className="font-semibold">Free Plan</div>
              <div className="text-xs text-muted-foreground">2 / 5 analyses used this month</div>
            </div>
            <Button className="gradient-primary text-primary-foreground">Upgrade</Button>
          </div>
        </Card>
        <Card title="Delete Account" desc="Permanently remove your account and all associated data. This cannot be undone.">
          <Button variant="destructive">Delete my account</Button>
        </Card>
      </div>
    </DashboardLayout>
  );
}