import React, { useEffect } from "react";
import { Box, Grid, useMediaQuery, useTheme, Zoom } from "@mui/material";
import { Images } from "../../Utils/Helpers";
import data from "./data.json";
import { SectionHeader, TextBlock } from "../../Utils/ReusableComponents";
import { useInView } from "react-intersection-observer";

interface SkillsProps {
  onVisible: () => void;
}
interface TilesProps {
  index: number;
}

const Skills: React.FC<SkillsProps> = ({ onVisible }) => {
  const { ref, inView } = useInView(data.intersectionObserver);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (inView) onVisible();
  }, [inView, onVisible]);

  const Tiles: React.FC<TilesProps> = ({ index }) => {
    const { imgName, name, delay } = data.skills.cards[index];
    const Cards = (
      <Grid size={{ xs: 3, sm: 2.5, md: 2, lg: 1.5 }} className="card-content">
        <Box sx={{ py: { xs: 0.5, md: 1 } }}>
          <img
            src={Images[imgName] ?? ""}
            alt={name}
            height={isMobile ? 25 : 40}
            width={isMobile ? 25 : 40}
          />
        </Box>
        <TextBlock className="skill-name" text={name} size="md" />
      </Grid>
    );
    return (
      <Zoom in={inView} timeout={delay}>
        {Cards}
      </Zoom>
    );
  };
  return (
    <section id="skills" className="skills" ref={ref}>
      <SectionHeader
        startText={data.skills.title[0]}
        endText={data.skills.title[1]}
      />
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {data.skills.cards.map((obj, index) => (
          <Tiles key={obj.name} index={index} />
        ))}
      </Grid>
    </section>
  );
};

export default Skills;
