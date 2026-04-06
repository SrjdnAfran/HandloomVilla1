"use client"; // Add this since we need to use usePathname

import { Inter, Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] });

// Note: metadata doesn't work in client components
// If you need metadata, you'll need a separate server layout
// But for now, we'll keep it as client component

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  
  // Check if current route is admin or login
  const isAdminRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/login');
  
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body 
        suppressHydrationWarning
        className={`${inter.className} bg-[var(--background)] text-[var(--foreground)] antialiased`}
      >
        {!isAdminRoute && <Header />}
        <main className={!isAdminRoute ? "min-h-[calc(100vh-4rem)]" : "min-h-screen"}>
          {children}
        </main>
        {!isAdminRoute && <Footer />}
      </body>
    </html>
  );
}