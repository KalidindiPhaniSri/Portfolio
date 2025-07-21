import React, { useEffect } from "react";
import data from "./data.json";
import { useInView } from "react-intersection-observer";
import {
  createTheme,
  Grid,
  Stack,
  ThemeProvider,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  Zoom,
} from "@mui/material";
import { Images } from "../../Utils/Helpers";
import { SectionHeader } from "../../Utils/ReusableComponents";

interface ExperienceProps {
  onVisible: () => void;
}
interface ExperienceCardDataProps {
  title: string;
  image: string;
  role: string;
  company: string;
  duration: string;
  text: string;
}
interface ExperienceCardProps {
  desktopMode: boolean;
  inView: boolean;
  data: ExperienceCardDataProps;
}
interface ContentPrps {
  desktopMode: boolean;
  inView: boolean;
  text: string;
  tech: { icon: string; tooltip: string }[];
}

const baseTheme = createTheme();
const themeColor = createTheme({
  palette: {
    warning: { main: baseTheme.palette.warning.light },
  },
});

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  desktopMode,
  inView,
  data,
}) => {
  const Cards = (
    <Stack
      gap={{ xs: 0.5, md: 1 }}
      className=" card-content"
      sx={{ p: { xs: 0.5, md: 1 } }}
    >
      <Typography
        variant={desktopMode ? "h6" : "h5"}
        sx={{
          fontWeight: "bold",
        }}
        color="warning"
      >
        {data.title}
      </Typography>
      <img
        src={Images[data.image] ?? ""}
        alt={data.title}
        height={desktopMode ? 100 : 75}
        width={desktopMode ? 100 : 75}
      />
      <Typography
        sx={{
          fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
        }}
      >
        {data.role + " - " + data.company}
      </Typography>
      <Typography
        sx={{ fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.9rem" } }}
      >
        {data.duration}
      </Typography>
    </Stack>
  );

  return (
    <Zoom in={inView} timeout={1000}>
      {Cards}
    </Zoom>
  );
};

const Content: React.FC<ContentPrps> = ({
  desktopMode,
  inView,
  text,
  tech,
}) => {
  const Text = (
    <Stack
      direction="column"
      gap={{ xs: 2, md: 3 }}
      data-testid="experience-content"
    >
      <Typography
        sx={{
          textAlign: "justify",
          alignItems: "center",
          fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
        }}
      >
        {text}
      </Typography>
      <Stack direction="row" flexWrap={"wrap"} gap={{ xs: 2, md: 3 }}>
        {tech.map((skill, ind) => {
          return (
            <Tooltip title={skill.tooltip} placement="top" arrow>
              <img
                src={Images[skill.icon] ?? ""}
                alt={skill.tooltip}
                height={desktopMode ? 25 : 15}
                width={desktopMode ? 25 : 15}
                key={ind}
              />
            </Tooltip>
          );
        })}
      </Stack>
    </Stack>
  );
  return (
    <Zoom in={inView} timeout={1000}>
      {Text}
    </Zoom>
  );
};

const Experience: React.FC<ExperienceProps> = ({ onVisible }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const { ref, inView } = useInView(data.intersectionObserver);
  useEffect(() => {
    if (inView) onVisible();
  }, [inView, onVisible]);
  return (
    <section ref={ref} id="experience" className="experience">
      <ThemeProvider theme={themeColor}>
        <SectionHeader
          startText={data.experience.title[0]}
          endText={data.experience.title[1]}
        />
        {data.experience.sections.map((item, ind) => {
          return (
            <Grid
              container
              sx={{ height: "100%", mb: { xs: 2, md: 3 } }}
              justifyContent="space-around"
              alignItems="center"
              spacing={{ xs: 2, md: 3 }}
              key={ind}
            >
              <Grid size={{ xs: 9, sm: 6, md: 4, lg: 3 }}>
                <ExperienceCard
                  desktopMode={isDesktop}
                  inView={inView}
                  data={item}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                <Content
                  desktopMode={isDesktop}
                  inView={inView}
                  text={item.text}
                  tech={item.tech}
                />
              </Grid>
            </Grid>
          );
        })}
      </ThemeProvider>
    </section>
  );
};

export default Experience;
