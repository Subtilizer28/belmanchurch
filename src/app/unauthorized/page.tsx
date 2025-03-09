"use client";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import Button from "~/components/Button";

export default function Unauthorized() {
  const router = useRouter();

  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden bg-[url('/bg/home.jpg')] bg-cover bg-center">
      <div className="flex h-screen w-full items-end justify-center bg-black/50 backdrop-blur-sm">
        <div className="mb-5 flex h-[81%] w-[90%] flex-col items-center justify-center text-center">
          {/* Locked Icon */}
          <Lock className="h-28 w-28 text-primary" />

          {/* Unauthorized Text */}
          <h1 className="mt-4 text-3xl font-bold text-primary mb-24">Unauthorized</h1>

          {/* Home Button */}
          <Button onClick={() => router.push("/")}>
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}
