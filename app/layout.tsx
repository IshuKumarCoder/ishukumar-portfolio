import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnimatedCursor } from "@/components/ui/AnimatedCursor";
import { WaterRippleBackground } from "@/components/ui/WaterRippleBackground";
import { Preloader } from "@/components/ui/Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ishu Kumar | Full Stack Java & AI Developer",
  description: "Modern portfolio of Ishu Kumar. Showcasing expertise in Full Stack Development, Java, Next.js, and Agentic AI Systems.",
  keywords: ["Ishu Kumar", "Full Stack Developer", "Java Developer", "AI Engineer", "Next.js", "React"],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Changed overflow-x-hidden to overflow-x-clip to fix CSS position: sticky bug */}
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground overflow-x-clip">
        <AnimatedCursor />
        <WaterRippleBackground />
        <Preloader />
        
        <Navbar />
        <main className="flex-1 w-full overflow-x-clip">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
