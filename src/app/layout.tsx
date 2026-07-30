import { Outfit } from 'next/font/google';
import './globals.css';
import "flatpickr/dist/flatpickr.css";
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import type { Metadata } from "next";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "B2B Marketplace Admin",
    template: "%s | B2B Marketplace Admin",
  },
  description: "Administration Portal for B2B Marketplace",
  applicationName: "B2B Marketplace Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
