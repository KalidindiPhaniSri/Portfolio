import { Grid, Grow, IconButton, Stack, Typography, Zoom } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { Tooltip } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Images } from "../../Utils/Helpers";
import data from "./data.json";
import type React from "react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface ImageProps {
  inView: boolean;
  isDesktop: boolean;
}
type IconsProps = {
  inView: boolean;
};

const Image: React.FC<ImageProps> = ({ inView, isDesktop }) => {
  const image = (
    <img
      src={Images[data.home.imgName] ?? ""}
      alt="Phani"
      height={isDesktop ? 250 : 150}
      width={isDesktop ? 250 : 150}
      style={{ borderRadius: "50%" }}
    />
  );
  return (
    <Zoom in={inView} timeout={2000}>
      {image}
    </Zoom>
  );
};

const Content: React.FC<ImageProps> = ({ inView, isDesktop }) => {
  const { intro, name, role, text } = data.home.bio;
  const className = isDesktop ? "desktop-content" : "small-content";

  return (
    <Stack
      direction="column"
      gap={{ xs: 2, md: 3 }}
      data-testid="home-content"
      className={className}
    >
      <Grow in={inView} timeout={1000}>
        <Typography variant={isDesktop ? "h5" : "h6"}>{intro}</Typography>
      </Grow>
      <Grow in={inView} timeout={2000}>
        <Typography variant={isDesktop ? "h2" : "h3"}>{name}</Typography>
      </Grow>
      <Grow in={inView} timeout={3000}>
        <Typography variant={isDesktop ? "h4" : "h5"}>{role}</Typography>
      </Grow>

      {isDesktop && (
        <Grow in={inView} timeout={4000}>
          <Typography variant="subtitle1" sx={{ textAlign: "justify" }}>
            {text}
          </Typography>
        </Grow>
      )}
      <Icons inView={inView} />
    </Stack>
  );
};

const Icons: React.FC<IconsProps> = ({ inView }) => {
  return (
    <Stack direction="row" gap={3}>
      <Tooltip
        title="LinkedIn Profile"
        slotProps={{
          tooltip: {
            sx: {
              backgroundColor: "white",
              color: "black",
              fontSize: 13,
              boxShadow: 1,
            },
          },
        }}
        placement="top"
      >
        <Grow in={inView} timeout={5000}>
          <IconButton
            component="a"
            href={import.meta.env.VITE_LINKEDIN_PROFILE_URL}
            target="_blank"
            aria-label="LinkedIn"
            sx={{ color: "white" }}
          >
            <LinkedInIcon fontSize="large" />
          </IconButton>
        </Grow>
      </Tooltip>
      <Tooltip
        title="Github Profile"
        placement="top"
        slotProps={{
          tooltip: {
            sx: {
              backgroundColor: "white",
              color: "black",
              fontSize: 13,
              boxShadow: 1,
            },
          },
        }}
      >
        <Grow in={inView} timeout={5000}>
          <IconButton
            component="a"
            href={import.meta.env.VITE_GITHUB_PROFILE_URL}
            target="_blank"
            aria-label="GitHub"
            sx={{ color: "white" }}
          >
            <GitHubIcon fontSize="large" />
          </IconButton>
        </Grow>
      </Tooltip>
    </Stack>
  );
};

interface HomeProps {
  onVisible: () => void;
}

const Home: React.FC<HomeProps> = ({ onVisible }) => {
  const { ref, inView } = useInView(data.intersectionObserver);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (inView) onVisible();
  }, [inView, onVisible]);

  return (
    <section id="home" className="home" ref={ref}>
      {isDesktop ? (
        <Grid container className="desktop-home">
          <Grid size={6}>
            <Content inView={inView} isDesktop={isDesktop} />
          </Grid>
          <Image inView={inView} isDesktop={isDesktop} />
        </Grid>
      ) : (
        <Stack
          direction="column"
          sx={{
            display: { xs: "flex", md: "none" },
          }}
          gap={6}
          className="small-home"
        >
          <Image inView={inView} isDesktop={isDesktop} />
          <Content inView={inView} isDesktop={isDesktop} />
        </Stack>
      )}
    </section>
  );
};

export default Home;
