import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "sweetalert2/dist/sweetalert2.css";
import NavbarWrapper from "@/components/navbarWrapper";
import "leaflet/dist/leaflet.css";
import Footer from "@/components/footer";
import "bootstrap-icons/font/bootstrap-icons.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Tech Elite",
  description: "E-commerce application",
  icons: {
    icon: "/hp.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <Spinner /> */}
        <NavbarWrapper />
        {children}
        <Footer />
      </body>
    </html>
  );
}
