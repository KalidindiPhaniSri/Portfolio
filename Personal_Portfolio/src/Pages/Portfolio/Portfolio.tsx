import { useEffect, useState } from "react";
import Home from "./Home";
import TopMenu from "./TopMenu";
import data from "./data.json";
import "./Portfolio.css";
import About from "./About";
import { Box, Stack } from "@mui/material";
import Skills from "./Skills";
import Experience from "./Experience";

const Portfolio = () => {
  const navItems = data.topMenu.sections;
  const [activeSection, setActiveSection] = useState<string>(navItems[0]);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
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
          mb: 3,
        }}
      >
        <TopMenu activeSection={activeSection} scrolled={scrolled} />
        <Home onVisible={() => setActiveSection("home")} />
      </Box>
      <Stack
        sx={{
          paddingInline: {
            xs: "3rem",
            sm: "4rem",
            md: "5rem",
            lg: "6rem",
          },
        }}
      >
        <About onVisible={() => setActiveSection("about")} />
        <Skills onVisible={() => setActiveSection("skills")} />
        <Experience onVisible={() => setActiveSection("experience")} />
      </Stack>
    </>
  );
};

export default Portfolio;
