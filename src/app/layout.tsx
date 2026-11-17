import type { Metadata } from "next";
import { Inter, Stack_Sans_Headline } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

// Figma: Inter (body/UI) + Stack Sans Headline (large landing headings).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const stackHeadline = Stack_Sans_Headline({
  variable: "--font-stack-headline",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Royal Creative",
  description: "Describe your business and see an AI homepage concept in minutes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${stackHeadline.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
