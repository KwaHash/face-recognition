import type { Metadata } from "next";
import NavBar from "@/components/organisms/NavBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Facial Recognition",
  description: "Facial Recognition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body className="flex flex-col min-h-screen bg-m-light-yellow">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
