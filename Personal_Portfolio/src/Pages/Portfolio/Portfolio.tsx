import { useEffect, useState } from "react";
import Home from "./Home";
import TopMenu from "./TopMenu";
import data from "./data.json";
import "./Portfolio.css";
import About from "./About";
import { Box, Stack } from "@mui/material";
import Skills from "./Skills";

const Portfolio = () => {
  const navItems = data.topMenu.sections;
  const [activeSection, setActiveSection] = useState<string>(navItems[0]);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      for (const section of navItems) {
        const ele = document.getElementById(section.toLowerCase());
        if (ele) {
          const rect = ele.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <>
      <Box
        className="bg-img"
        sx={{
          paddingInline: {
            xs: "4rem",
            md: "6rem",
          },
        }}
      >
        <TopMenu activeSection={activeSection} scrolled={scrolled} />
        <section id="home" className="home">
          <Home />
        </section>
      </Box>
      <Stack
        sx={{
          paddingInline: {
            xs: "4rem",
            md: "6rem",
          },
        }}
      >
        <section id="about" className="about">
          <About />
        </section>
        <section id="skills" className="skills">
          <Skills />
        </section>
      </Stack>
    </>
  );
};

export default Portfolio;
