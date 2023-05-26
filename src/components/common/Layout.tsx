import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ConnectContextProvider } from "@/contexts/connector";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ConnectContextProvider>
        <Navbar />
        <div className="w-full min-h-[50vh] bg-[#0C0F1A] py-10">{children}</div>
        <Footer />
      </ConnectContextProvider>
    </>
  );
};

export default Layout;
