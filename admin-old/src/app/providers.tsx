"use client";

import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // <ThemeProvider defaultTheme="light" attribute="class">
    //   <SidebarProvider>{children}</SidebarProvider>
    // </ThemeProvider>
    <AuthProvider>

        {children}

    </AuthProvider>
  );
}
