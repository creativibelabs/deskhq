import { Inter } from "next/font/google";
import { ToastProvider } from "@/components/common/Toast";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: "DeskHQ - The Ultimate Software Solution",
  description: "DeskHQ is the ultimate software solution for businesses of all sizes. With a wide range of features and tools, DeskHQ helps you manage your projects, tasks, and teams more efficiently. Whether you're a small startup or a large enterprise, DeskHQ has everything you need to succeed.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
