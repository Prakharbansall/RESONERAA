import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Company from "./pages/Company";
import Platform from "./pages/Platform";
import Insights from "./pages/Insights";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";

const pages = {
  home:     Home,
  company:  Company,
  platform: Platform,
  insights: Insights,
  contact:  Contact,
  legal:    Legal,
};

export default function App() {
  const [activePage, setActivePage] = useState("home");

  const navigate = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const PageComponent = pages[activePage] || Home;

  return (
    <>
      <Navbar activePage={activePage} onNav={navigate} />
      <main>
        <PageComponent onNav={navigate} />
      </main>
      <Footer onNav={navigate} />
    </>
  );
}