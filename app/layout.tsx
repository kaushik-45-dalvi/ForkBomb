import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ForkBomb | Code. Clone. Conquer.",
  description: "The digital colosseum for high-stakes competitive coding. Turn the grind into a spectator sport.",
  openGraph: {
    title: "ForkBomb | Code. Clone. Conquer.",
    description: "The digital colosseum for high-stakes competitive coding.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} font-sans min-h-full flex flex-col antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
