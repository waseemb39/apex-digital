import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Graft Digital â€” We connect. You grow.",
  description:
    "We help small business owners get more qualified leads in 90 days with a proven digital marketing system. Book your free strategy call today.",
  openGraph: {
    title: "Graft Digital â€” We connect. You grow.",
    description:
      "We help small business owners get more qualified leads in 90 days with a proven digital marketing system.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

