import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-[50vh] bg-[#0C0F1A] py-10">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
