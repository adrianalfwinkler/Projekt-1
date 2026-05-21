import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { PostHogProvider } from "@/components/posthog-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "IdeaForge AI – Find Your Perfect Business Idea in 60 Seconds",
    template: "%s | IdeaForge AI",
  },
  description:
    "AI-powered platform that analyzes your interests, skills, time, and budget to generate 10 personalized business ideas with a step-by-step action plan.",
  keywords: [
    "business ideas",
    "AI business generator",
    "startup ideas",
    "entrepreneurship",
    "side hustle",
    "business analysis",
  ],
  authors: [{ name: "IdeaForge AI" }],
  creator: "IdeaForge AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "IdeaForge AI",
    title: "IdeaForge AI – Find Your Perfect Business Idea in 60 Seconds",
    description:
      "AI analyzes your interests, skills, time, and budget to generate personalized business ideas and a step-by-step action plan.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "IdeaForge AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IdeaForge AI – Find Your Perfect Business Idea in 60 Seconds",
    description:
      "AI analyzes your interests, skills, time, and budget to generate personalized business ideas.",
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
