import "./globals.css";
import Navigation from "@/components/ui/Navigation";

export const metadata = {
  title: "PC Parts Store - Computer Components & Hardware",
  description: "Browse high-quality computer parts including processors, graphics cards, memory, storage, and more. Build your dream PC with our premium components.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
