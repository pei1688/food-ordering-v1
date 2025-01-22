import "./globals.css";
import Header from "../components/layout/headNav/Header";
import { Toaster } from "sonner";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: {
    default: "DineEasy",
    //%s切換網頁時會替換掉
    template: "%s - DineEasy",
  },
  description:
    "DineEasy is an intuitive platform offering seamless menu management, real-time updates, and effortless dining solutions for both restaurants and customers.",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gradient-to-tr from-food-300 to-food-200 min-h-screen w-full pt-8 font-sans">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 tracking-[2px] ">
          <Header />
          {children}
          <Footer />
          <Toaster position="top-center" theme="dark" />
        </main>
      </body>
    </html>
  );
}
