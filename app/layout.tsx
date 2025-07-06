import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "./QueryProvider";
import { ToastContainer } from "react-toastify";
import { Edit } from "lucide-react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Beluga | Modern E-Commerce Platform",
  description:
    "Beluga is a full-featured e-commerce platform built with Next.js, Go (Fiber), and PostgreSQL. Includes secure checkout, product variants, admin dashboard, and real-time order tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ToastContainer />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
