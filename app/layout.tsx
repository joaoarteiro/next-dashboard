import { inter } from "./ui/fonts";
import "./ui/global.css";
// or import using the "@" alias, which points the the root directory. This is usefull in deeply nested components, to shorten the import path
// import '@/app/ui/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
