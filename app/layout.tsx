import "./globals.css";
import "antd/dist/reset.css";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Diablo Damage Reduction Calculator",
  description: "Diablo Damage Reduction Calculator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        async={true}
        crossOrigin="anonymous"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5961109963651073"
      />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
