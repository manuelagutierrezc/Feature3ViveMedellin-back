import Header from "@/components/organisms/header";
import type React from "react";

export default function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
} 