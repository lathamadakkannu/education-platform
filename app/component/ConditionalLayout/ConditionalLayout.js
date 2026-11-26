"use client";

import { usePathname } from "next/navigation";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export function ConditionalNavbar() {
  const pathname = usePathname();

  if (pathname.toLowerCase().startsWith("/pages/profilepage")) return null;

  return <Navbar />;
}

export function ConditionalFooter() {
  const pathname = usePathname();

  if (pathname.toLowerCase().startsWith("/pages/profilepage")) return null;

  return <Footer />;
}