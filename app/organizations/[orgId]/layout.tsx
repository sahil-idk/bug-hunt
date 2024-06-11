import { Inter } from "next/font/google";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Organisation Page",
    description: "Generated by create next app",
};



export default function OrgLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

            <section className={inter.className}>
                <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange>
                    <div className="m-10">
                        {children}
                    </div>
                </ThemeProvider>
            </section>
      
    );
}
