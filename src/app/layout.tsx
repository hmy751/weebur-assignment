import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "@/styles/globals.css";

import QueryProvider from "@/components/layout/QueryProvider";
import Header from "@/components/layout/Header";

const noto_sans_kr = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Weebur Assignment",
  description: "Weebur Assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={noto_sans_kr.className}>
        <QueryProvider>
          <Header />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
