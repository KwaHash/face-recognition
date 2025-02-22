import type { Metadata } from "next";
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
        {children}
      </body>
    </html>
  );
}
