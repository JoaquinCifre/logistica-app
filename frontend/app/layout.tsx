import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistema Logística",
  description: "Gestión de reparto y recorridos",
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
     <body
  className="min-h-screen"
  style={{
    background: "#F8FAFC",
    color: "#0F172A",
  }}
>
        <div
  className="
  flex
  flex-col
  md:flex-row
  min-h-screen
  "
>
          <Sidebar />

          <main
  className="
  flex-1
  p-4
  md:p-8
  mt-6
  md:mt-0
  md:mb-4
  overflow-y-auto
  "
>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}