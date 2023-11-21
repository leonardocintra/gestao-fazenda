import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Metric, Divider, Text } from "@tremor/react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gestão Fazenda",
  description: "Gestão de Fazenda - Cristo Rei",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <main className="p-4 sm:p-10">
          <Link href={"/"}>
            <Metric>Fazenda Cristo Rei</Metric>
            <Text>Produtor: Isac Tanja Cintra</Text>
          </Link>

          <Divider />
          {children}
        </main>
      </body>
    </html>
  );
}
