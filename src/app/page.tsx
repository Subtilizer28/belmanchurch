"use client";
// import { auth } from "~/server/auth";
// import { api } from "~/trpc/server";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Button from "~/components/Button";

export default function Home() {
  //const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden bg-[url('/bg/home.jpg')] bg-cover bg-center">
      <div className="flex h-screen w-full items-end justify-center bg-black/50 backdrop-blur-sm">
        <div className="mb-5 flex h-[81%] w-[90%] flex-col items-center justify-center text-center">
          <div className="-mt-24">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-primary md:text-6xl"
            >
              St. Joseph Church Belman
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="mt-4 max-w-2xl text-lg italic text-primary md:text-xl"
            >
              “In Joseph … heads of the household are blessed with the
              unsurpassed model of fatherly watchfulness and care.”
              <br />
              <span className="text-primary">— Pope Leo XIII</span>
            </motion.p>
          </div>

          <div className="mt-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 flex space-x-6 md:space-x-10"
            >
              <Button onClick={() => signIn()}>Login</Button>
              <Button onClick={() => router.push("/donate")}>Donate</Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
