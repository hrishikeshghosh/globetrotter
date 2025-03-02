import type { Metadata } from "next";
import { Bangers } from 'next/font/google'
import "./globals.css";
import { DialogProvider } from "@/contexts/dialogProvider";
import { UserProvider } from "@/contexts/userProvider";

const Bangers_font = Bangers({
  weight: "400",
  variable: "--font-Bangers",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "The Globetrotter Challenge!",
  description: "The Ultimate Travel Guessing Game!",
  openGraph: {
    title: "The Globetrotter Challenge!",
    description: "The Ultimate Travel Guessing Game!",
    url: "/",
    siteName: "The Globetrotter Challenge",
    images: [
      {
        url: "/appImg.jpg",
        width: 1200,
        height: 630,
        alt: "A preview image for social sharing",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Globetrotter Challenge!",
    description: "The Ultimate Travel Guessing Game!",
    images: ["/appImg.jpg"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <DialogProvider>
          <body
            className={`${Bangers_font.className} antialiased`}
          >
            {children}
          </body>
        </DialogProvider>
      </UserProvider>


    </html>
  );
}
