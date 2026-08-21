import type { Metadata } from "next";
import { Geist_Mono, Cinzel } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";

const cinzel = Cinzel({
  variable: "--font-deco",
  subsets: ["latin"],
  weight: ["400"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AVisualiser",
  description: "Beautiful visualiser for audios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cinzel.className} ${geistMono.variable} antialiased`}
      >
        <script
  src="https://webanly-dashboard.vercel.app/script.js"
  data-domain-name="funworkcycle-dashboard.render.com738"
  data-api-key="3a342f65-a05c-450e-95ca-ddb3bc5c3897">
</script>
        
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}