import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RazorGrowth AI — Autonomous AI Revenue Agent for Merchants",
  description: "Autonomous AI revenue agent for merchants. Identifies revenue opportunities, proposes bounded campaigns, gates money actions via approval, and executes via Razorpay.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#09090B] text-zinc-100 flex min-h-screen antialiased`}>
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
          <main className="flex-1 p-8 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
