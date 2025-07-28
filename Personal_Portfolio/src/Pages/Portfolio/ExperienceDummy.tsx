import React, { useEffect } from "react";
import data from "./data.json";
import { useInView } from "react-intersection-observer";
import {
  Card,
  CardContent,
  Collapse,
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Images } from "../../Utils/Helpers";
import { SectionHeader } from "../../Utils/ReusableComponents";

interface ExperienceProps {
  onVisible: () => void;
}
interface HeaderDataProps {
  title: string;
  image: string;
  role: string;
  company: string;
  duration: string;
  text: string;
}
interface HeaderProps {
  desktopMode: boolean;
  inView: boolean;
  data: HeaderDataProps;
  id: number;
  handleExpandClick: (id: number) => void;
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

const Header: React.FC<HeaderProps> = ({
  desktopMode,
  inView,
  data,
  id,
  handleExpandClick,
}) => {
  const Cards = (
    <Stack className="header-section" direction="row">
      <Stack direction="row" gap={{ xs: 0.25, sm: 0.5, md: 0.75, lg: 1 }}>
        <img
          src={Images[data.image] ?? ""}
          alt={data.title}
          height={desktopMode ? 75 : 50}
          width={desktopMode ? 75 : 50}
        />
        <Stack
          gap={{ xs: 0.25, sm: 0.5, md: 0.75, lg: 1 }}
          direction="column"
          alignItems="start"
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: {
                xs: "0.6rem",
                sm: "0.8rem",
                md: "1rem",
                lg: "1.25rem",
              },
            }}
            color="warning"
          >
            {data.title}
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: "0.5rem",
                sm: "0.7rem",
                md: "0.9rem",
                lg: "1.15rem",
              },
            }}
          >
            {data.role + " - " + data.company}
          </Typography>
        </Stack>
      </Stack>

      <Stack
        gap={{ xs: 0.25, sm: 0.5, md: 0.75, lg: 1 }}
        direction="column"
        alignItems="end"
      >
        <Typography
          sx={{
            fontSize: {
              xs: "0.4rem",
              sm: "0.6rem",
              md: "0.8rem",
              lg: "1rem",
            },
          }}
        >
          {data.duration}
        </Typography>
        <ExpandMoreIcon onClick={() => handleExpandClick(id)} />
      </Stack>
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
          fontSize: {
            xs: "0.5rem",
            sm: "0.7rem",
            md: "0.9rem",
            lg: "1.15rem",
          },
        }}
      >
        {text}
      </Typography>
      <Stack
        direction="row"
        flexWrap={"wrap"}
        gap={{ xs: 2, md: 3 }}
        justifyContent="end"
      >
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
  const [expanded, setExpanded] = React.useState<number | boolean>(false);

  const handleExpandClick = (id: number) => {
    if (expanded === id) {
      setExpanded(false);
      return;
    }
    setExpanded(id);
  };

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
              key={ind}
            >
              <Grid
                size={12}
                className="card-content"
                sx={{ p: { xs: 2, md: 3 } }}
              >
                <Card>
                  <CardContent>
                    <Header
                      desktopMode={isDesktop}
                      inView={inView}
                      data={item}
                      handleExpandClick={handleExpandClick}
                      id={item.id}
                    />
                  </CardContent>

                  <Collapse
                    in={item.id === expanded}
                    timeout="auto"
                    unmountOnExit
                  >
                    <CardContent>
                      <Content
                        desktopMode={isDesktop}
                        inView={inView}
                        text={item.text}
                        tech={item.tech}
                      />
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            </Grid>
          );
        })}
      </ThemeProvider>
    </section>
  );
};

export default Experience;
