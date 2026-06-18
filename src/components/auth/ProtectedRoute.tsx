import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        window.location.href = "/login";
        return;
      }

      setAuthenticated(true);
      setLoading(false);
    }

    checkAuth();
  }, []);

  if (loading) {
    return null;
  }

  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
}