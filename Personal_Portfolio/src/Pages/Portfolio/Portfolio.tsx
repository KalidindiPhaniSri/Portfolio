import { useEffect, useState } from "react";
import Home from "./Home/Home";
import TopMenu from "./TopMenu/TopMenu";
import data from "./data.json";
import "./Portfolio.css";

const Portfolio = () => {
  const navItems = data.topMenu.sections;
  const [activeSection, setActiveSection] = useState<string>(navItems[0]);
  const [scrolled, setScrolled] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      navItems.forEach((section) => {
        const ele = document.getElementById(section);
        if (ele) {
          const rect = ele.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
          }
        }
      });
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  return (
    <>
      <TopMenu activeSection={activeSection} scrolled={scrolled} />
      <section id="home" className="home">
        <Home />
      </section>
    </>
  );
};

export default Portfolio;
