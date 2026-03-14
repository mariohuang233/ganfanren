import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "干饭雷达 - 大学生干饭指南",
  description: "发现身边美食，避开踩雷餐厅，拼饭找人一起",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <div className="mx-auto max-w-md w-full min-h-screen bg-gray-50 relative">
          {children}
        </div>
      </body>
    </html>
  );
}
