import React from "react";
import Header from "../components/landing/Landingheader";
import Footer from "../components/layout/Footer";
import Main from "../components/landing/Main";

const Landing = () => {
  return (
    <div className="bg-surface min-h-screen flex flex-col items-center justify-between gap-6">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default Landing;
