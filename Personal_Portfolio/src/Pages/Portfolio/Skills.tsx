import React from "react";
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

interface TilesProps {
  iconUrl: string;
  name: string;
  delay: number;
}

const Tiles: React.FC<TilesProps> = ({ iconUrl, name, delay }) => {
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
      <Typography gutterBottom variant="body1">
        {name}
      </Typography>
    </Grid>
  );
  return isDesktop ? (
    <Grow in={true} timeout={delay}>
      {Cards}
    </Grow>
  ) : (
    <Zoom in={true} timeout={delay}>
      {Cards}
    </Zoom>
  );
};

const Skills = () => {
  return (
    <>
      <SectionHeader
        startText={data.skills.title[0]}
        endText={data.skills.title[1]}
      />
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {data.skills.cards.map((obj, index) => (
          <React.Fragment key={index}>
            <Tiles iconUrl={obj.imgName} name={obj.name} delay={obj.delay} />
          </React.Fragment>
        ))}
      </Grid>
    </>
  );
};

export default Skills;
