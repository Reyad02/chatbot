import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Drawer from "@/components/ui/drawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chatbot",
  description: "An AI chatbot utilizing the EchoGPT model for conversations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="flex lg:justify-between bg-[#0F0E11]">
          <div className="lg:w-[20%] z-50 fixed lg:relative">
            <div className="lg:fixed ">
              <Drawer />
            </div>
          </div>
          <div className="flex-1 flex-grow overflow-auto lg:w-[70%] h-full mt-12 lg:mt-0">{children}</div>
        </main>
      </body>
    </html>
  );
}
