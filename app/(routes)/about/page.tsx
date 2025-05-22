import React from "react";
import AboutUs from "./_components/AboutUs";
import TravelStats from "./_components/TravelStats";
import CompanyLogos from "./_components/CompanyLogos";

const AboutPage = () => {
  return (
    <div className="mb-60">
      <AboutUs />
      <TravelStats />
      <CompanyLogos />
    </div>
  );
};

export default AboutPage;
