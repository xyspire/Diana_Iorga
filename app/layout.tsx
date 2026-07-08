import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import '@/app/globals.css';
import LenisProvider from '@/components/LenisProvider';
import CustomCursor from '@/components/CustomCursor';
import PageTransition from '@/components/PageTransition';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: ' Diana Iorga — Portfolio',
  description: 'Graphic Designer — portfolio.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("bg-black", "antialiased", "font-sans", geist.variable)}>
      <body suppressHydrationWarning className="bg-black text-white relative bg-grain min-h-screen selection:bg-white selection:text-black">
        <LenisProvider>
          <CustomCursor />
          <PageTransition>
            {children}
          </PageTransition>
        </LenisProvider>
      </body>
    </html>
  );
}
