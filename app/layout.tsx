import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Perfumes JD",

  description:
    "Perfumes originales para hombres y mujeres. Envíos a toda Venezuela.",

  keywords: [
    "perfumes",
    "perfumes originales",
    "perfumes venezuela",
    "perfumes jd",
    "armaf",
    "lattafa",
    "afnan",
    "rasasi",
    "perfumes arabes",
  ],

  openGraph: {
    title: "Perfumes JD",
    description:
      "Perfumes originales para hombres y mujeres. Envíos a toda Venezuela.",

    url: "https://perfumes-jd.vercel.app",

    siteName: "Perfumes JD",

    images: [
      {
        url: "https://perfumes-jd.vercel.app/logo/jd-logo.jpg",
        width: 1200,
        height: 630,
        alt: "Perfumes JD",
      },
    ],

    locale: "es_VE",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Perfumes JD",

    description:
      "Perfumes originales para hombres y mujeres. Envíos a toda Venezuela.",

    images: [
      "https://perfumes-jd.vercel.app/logo/jd-logo.jpg",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}