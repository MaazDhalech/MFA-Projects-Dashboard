import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppHeader } from "@/components/AppHeader";
import { EnvWarning } from "@/components/EnvWarning";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project Dashboard",
  description: "Public read-only dashboard for project milestones and updates.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <EnvWarning />
        <div className="min-h-screen bg-slate-50">
          <AppHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
