"use client";

import { usePathname, useRouter } from "next/navigation";
import { useRole } from "~/hooks/useRole";
import { useEffect, useState } from "react";
import Navbar from "~/components/navbars/Navbar";
import AdminNavbar from "~/components/navbars/AdminNavbar";

export default function NavbarSelector() {
  const pathname = usePathname();
  const router = useRouter();
  const role = useRole();
  const [isAllowed, setIsAllowed] = useState(false);

  const isAdminRoute = pathname.startsWith("/admin");
  const isGalleryRoute = pathname === "/admin/gallery";

  useEffect(() => {
    if (!isAdminRoute) {
      setIsAllowed(true); // Always allow non-admin pages
      return;
    }

    if (!role) return; // Wait for role to be available

    if (role === "PHOTOGRAPHER" && !isGalleryRoute) {
      router.replace("/unauthorized");
    } else if (!["ADMIN", "DEVELOPER", "PHOTOGRAPHER"].includes(role)) {
      router.replace("/unauthorized");
    } else {
      setIsAllowed(true);
    }
  }, [role, pathname, router, isAdminRoute, isGalleryRoute]);

  if (!isAllowed) return null; // Prevent unauthorized flicker

  return isAdminRoute ? <AdminNavbar /> : <Navbar />;
}
