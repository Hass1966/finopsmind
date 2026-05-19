import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinOpsMind — AI-Powered Cloud Cost Intelligence Platform",
  description: "Reduce cloud waste by 30%+ with AI-powered cost analysis, 56+ detection rules, automated remediations, and multi-cloud visibility. Supports AWS, Azure, and GCP.",
  keywords: ["FinOps", "cloud cost management", "cloud optimization", "AWS cost", "Azure cost", "GCP cost", "AI FinOps"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
