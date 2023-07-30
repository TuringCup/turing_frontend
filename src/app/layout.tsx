import { Content } from "@/app/Content";
import { config } from "@/config/config";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: config.Title,
    description: config.Description,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Content elements={children} />
            </body>
        </html>
    );
}
