"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function TransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1500); // ⏳ 1-second loader
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <div className="relative h-24 w-24 animate-spin rounded-full border-2 border-gray-800 shadow-[0px_-10px_10px_#6359f8,10px_-10px_10px_#f36896,10px_0_10px_#ff0b0b,10px_10px_10px_#ff5500,0_10px_10px_#ff9500,-10px_10px_10px_#ffb700]">
              <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gray-800"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ensures content only appears after the loader fades out */}
      <motion.div
        key="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: loading ? 0.5 : 0 }}
        className="min-h-screen bg-black"
      >
        {children}
      </motion.div>
    </div>
  );
}
