import React, { useState, useEffect } from "react";
import Layout from "../../Layout/Layout";
import "../Home/Home.css";
import Flow from "../../Components/Flow";
import discountbus from "../../Photos/discountbus.png";
import Services from "../../Components/Services";
import Features from "../../Components/Features";

const Home = () => {
  const text = ["Travel", "Fun", "Love"];
  const [display, setDisplay] = useState(text[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplay((prev) => {
        const currentIndex = text.indexOf(prev);
        const nextIndex = (currentIndex + 1) % text.length;
        return text[nextIndex];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className="main-container">
        <div className="main-text">
          <h1 className="Rimjim">RIMJIM Travels with {display}</h1>
          <h6>Elevate Your Journey Seamless and Connected</h6>
          <button className="main-button">Explore more</button>
        </div>
        <div className="main-bus-banner">
          <img src={discountbus} alt="Bus" />
          <div className="circular"></div>
        </div>
      </div>
      <Flow />
      <Features />
      <Services />
    </Layout>
  );
};

export default Home;
