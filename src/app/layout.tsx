import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: "Catálogo Tech Line",

  description:
    "Hardware, periféricos, acessórios, produtos para setup e assistência técnica na Tech Line.",

  icons: {
    icon: [
      {
        url: "/favicon-techline.png?v=4",
        type: "image/png",
      },
    ],
    shortcut: "/favicon-techline.png?v=4",
    apple: "/favicon-techline.png?v=4",
  },

  openGraph: {
    title: "Catálogo Tech Line",
    description:
      "Hardware, periféricos, acessórios e tecnologia. Confira os produtos disponíveis na Tech Line.",
    type: "website",
    locale: "pt_BR",
    siteName: "Tech Line",
    images: [
      {
        url: "/Banner%20futurista%20Techline.png",
        width: 1200,
        height: 630,
        alt: "Catálogo Tech Line",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Catálogo Tech Line",
    description:
      "Hardware, periféricos, acessórios e tecnologia. Confira os produtos disponíveis na Tech Line.",
    images: ["/Banner%20futurista%20Techline.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <CartProvider>{children}</CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}