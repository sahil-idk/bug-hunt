import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Manrope } from "next/font/google";
import "./globals.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Providers from "@/utils/Providers";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProviders } from "./providers";
const inter = Inter({ subsets: ["latin"] });

const manrope = Manrope({ 
  subsets: ["latin"],
  weight: '700'
})

export const metadata: Metadata = {
  title: "opensource.build",
  description: "codeforces but for openSource devs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <ClerkProviders>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          {/* <Navbar /> */}
          {/* <NavigationMenuDemo/> */}
          <Providers>
          {children}
          </Providers>
       </ThemeProvider>
        </ClerkProviders>
      </body>
    </html>
  );
}
