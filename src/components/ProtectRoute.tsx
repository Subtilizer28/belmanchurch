import { useRole } from "~/hooks/useRole";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

type UserRole = "DEVELOPER" | "ADMIN" | "PHOTOGRAPHER" | "PARISHONER" | "USER";

interface ProtectedRouteProps {
  allowedRoles: ("DEVELOPER" | "ADMIN" | "PHOTOGRAPHER" | "PARISHONER" | "USER")[];
  children: React.ReactNode;
}

export default function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const { status } = useSession(); // Only to track loading state
  const role = useRole();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Wait for session

    if (!role) {
      router.push("/api/auth/signin"); // Redirect to login
    } else if (!allowedRoles.includes(role as UserRole)) {
      router.push("/unauthorized");
    }
  }, [role, status, router, allowedRoles]);

  if (status === "loading") return <p>Loading...</p>;

  return <>{children}</>;
}
