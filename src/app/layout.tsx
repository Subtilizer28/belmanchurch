import "~/styles/globals.css";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "~/components/Navbar";
//import { SessionProvider } from "next-auth/react";
import TransitionWrapper from "~/components/Loader";

export const metadata: Metadata = {
  title: "Belman Church",
  description: "Main Website of St. Joseph Church, Belman",
  icons: [{ rel: "icon", url: "/favicon.webp" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex max-h-screen flex-col">
        {/* <SessionProvider> */}
          <TransitionWrapper>
            <Navbar />
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </TransitionWrapper>
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
