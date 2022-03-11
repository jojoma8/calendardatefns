import React from "react";
import Footer from "./footer/Footer";
import Header from "./Header";

function Layout({ children }) {
  return (
    <div className="">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
