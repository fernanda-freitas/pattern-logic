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

export const metadata = {
  metadataBase: new URL("https://fernanda-freitas.github.io/pattern-logic/"),
  title: "Pattern Logic",
  description:
    "Transforma texto em padrões de tecelagem (weave drawdowns) gerados a partir da sequência de letras.",
  openGraph: {
    title: "Pattern Logic",
    description:
      "Transforma texto em padrões de tecelagem (weave drawdowns) gerados a partir da sequência de letras.",
    url: "https://fernanda-freitas.github.io/pattern-logic/",
    siteName: "Pattern Logic",
    locale: "pt_PT",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Pattern Logic",
    description:
      "Transforma texto em padrões de tecelagem (weave drawdowns) gerados a partir da sequência de letras.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
