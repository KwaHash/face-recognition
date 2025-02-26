import type { Metadata } from "next";
import Header from "@/components/molecules/Header";
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
      <body>
        <div className="flex flex-col min-h-screen bg-gray-200">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
