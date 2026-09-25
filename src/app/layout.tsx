import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nawfs Ul Ahsun - Software Engineer | Full-Stack Developer CV",
  description:
    "Curriculum Vitae of Nawfs Ul Ahsun, Software Engineer experienced in building enterprise ERP and healthcare applications. 8+ design styles, live gradient themes, and export as DOCX or PDF.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
