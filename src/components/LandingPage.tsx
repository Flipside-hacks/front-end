import React from "react";
import Layout from "./common/Layout";
import Hero from "./home/Hero";
import ThreeAnys from "./home/ThreeAnys";
import NewsLetter from "./home/NewsLetter";
import BeforeFooter from "./home/BeforeFooter";

const LandingPage = () => {
  return (
    <Layout>
      <Hero />
      <ThreeAnys />
      <BeforeFooter />
      <NewsLetter />
    </Layout>
  );
};

export default LandingPage;
