"use client";
import "./index.css";
import Navbar from "./components/Navbar"
// import { Footer } from "@/components/Footer";
import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head />
      <body className="bg-white dark:bg-stone-900 min-h-screen flex flex-col">
        <ThemeProvider enableSystem={true} attribute="class">
          {/* <Navbar /> */}
          <main className="flex-grow">
            {children}
          </main>
          {/* <Footer /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
