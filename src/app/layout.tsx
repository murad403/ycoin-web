import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/shared/CustomCursor";
import { LanguageProvider } from "@/i18n/LanguageContext";
import ReduxProvider from "@/components/provider/ReduxProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YCOIN AI",
  description: "ycoin ai crypto project",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-black no-scrollbar`}
    >
      <body className="min-h-full flex flex-col no-scrollbar">
        <ReduxProvider>
          <LanguageProvider>
            <CustomCursor />
            <Toaster position="top-center" richColors duration={1000} closeButton />
            {children}
          </LanguageProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}


