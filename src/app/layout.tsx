import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
// import StoreProvider from '../components/StoreProvider';
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

// import { Toaster } from "@/components/ui/toaster";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });
const SessionWrapper = dynamic(() => import("@/components/SessionWrapper"), {
  ssr: false,
});
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const toastConfig = { 
  autoClose: 1000, 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.className} w-screen overflow-x-hidden`}>
        <SessionWrapper>
          {/* <StoreProvider> */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader
              color="#22DD99"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={true}
              easing="ease"
              speed={200}
              shadow="0 0 8px #22DD99,0 0 3px #22DD99"
            />
            <Header />
            {/* <Navbar /> */}
            <div className="pt-14">{children}</div>
            <ToastContainer {...toastConfig} />
            {/* <Toaster /> */}
          </ThemeProvider>
          {/* </StoreProvider> */}
        </SessionWrapper>
      </body>
    </html>
  );
}
