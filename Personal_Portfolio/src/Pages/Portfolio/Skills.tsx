import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Grow,
  Typography,
  useMediaQuery,
  useTheme,
  Zoom,
} from "@mui/material";
import { Images } from "../../Utils/Helpers";
import data from "./data.json";
import { SectionHeader } from "../../Utils/ReusableComponents";
import { useInView } from "react-intersection-observer";

interface SkillsProps {
  onVisible: () => void;
}
interface TilesProps {
  iconUrl: string;
  name: string;
  delay: number;
  inView: boolean;
}

const Tiles: React.FC<TilesProps> = ({ iconUrl, name, delay, inView }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const Cards = (
    <Grid
      size={{ xs: 4, sm: 3, md: 2, lg: 1.5 }}
      className="card-content"
      sx={{ p: { xs: 0.5, md: 1 } }}
    >
      <Box sx={{ py: { xs: 0.5, md: 1 } }}>
        <img src={Images[iconUrl] ?? ""} alt={name} height={50} width={50} />
      </Box>
      <Typography sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" } }}>
        {name}
      </Typography>
    </Grid>
  );
  return isDesktop ? (
    <Grow in={inView} timeout={delay}>
      {Cards}
    </Grow>
  ) : (
    <Zoom in={inView} timeout={delay}>
      {Cards}
    </Zoom>
  );
};

const Skills: React.FC<SkillsProps> = ({ onVisible }) => {
  const { ref, inView } = useInView(data.intersectionObserver);
  useEffect(() => {
    if (inView) onVisible();
  }, [inView, onVisible]);
  return (
    <section id="skills" className="skills" ref={ref}>
      <SectionHeader
        startText={data.skills.title[0]}
        endText={data.skills.title[1]}
      />
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {data.skills.cards.map((obj, index) => (
          <Tiles
            iconUrl={obj.imgName}
            name={obj.name}
            delay={obj.delay}
            inView={inView}
            key={index}
          />
        ))}
      </Grid>
    </section>
  );
};

export default Skills;
