import {
  Grid,
  Grow,
  IconButton,
  Slide,
  Stack,
  Typography,
  Zoom,
} from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { Tooltip } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Images } from "../../Utils/Helpers";
import data from "./data.json";

const Image = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const image = (
    <img
      src={Images[data.home.imgName] ?? ""}
      alt="Phani"
      height={isDesktop ? 250 : 150}
      width={isDesktop ? 250 : 150}
      style={{ borderRadius: "50%" }}
    />
  );
  return isDesktop ? (
    <Slide in={true} direction="left" timeout={1000}>
      {image}
    </Slide>
  ) : (
    <Zoom in={true} timeout={1000}>
      {image}
    </Zoom>
  );
};

const Content = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const uptoTablet = useMediaQuery(theme.breakpoints.between("xs", "md"));

  const { intro, name, role, text } = data.home.bio;
  const className = isDesktop ? "desktop-content" : "small-content";

  return (
    // <Slide in={true} direction={isDesktop ? "right" : "up"} timeout={1000}>
    <Stack
      direction="column"
      gap={uptoTablet ? 3 : 2}
      data-testid="home-content"
      className={className}
    >
      <Grow in={true} timeout={1000}>
        <Typography variant={uptoTablet ? "h6" : "h5"}>{intro}</Typography>
      </Grow>
      <Grow in={true} timeout={2000}>
        <Typography variant={uptoTablet ? "h3" : "h2"}>{name}</Typography>
      </Grow>
      <Grow in={true} timeout={3000}>
        <Typography variant={uptoTablet ? "h5" : "h4"}>{role}</Typography>
      </Grow>

      {isDesktop && (
        <Grow in={true} timeout={4000}>
          <Typography variant="subtitle1" sx={{ textAlign: "justify" }}>
            {text}
          </Typography>
        </Grow>
      )}
      <Icons />
    </Stack>
    // </Slide>
  );
};

const Icons = () => {
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
        <Grow in={true} timeout={5000}>
          <IconButton
            component="a"
            href="https://www.linkedin.com/in/phani-sri-kalidindi-5111a2254/"
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
        <Grow in={true} timeout={5000}>
          <IconButton
            component="a"
            href="https://github.com/KalidindiPhaniSri"
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

const Home = () => {
  const theme = useTheme();
  const uptoTablet = useMediaQuery(theme.breakpoints.between("xs", "md"));
  return (
    <>
      {uptoTablet ? (
        <Stack
          direction="column"
          sx={{
            display: { xs: "flex", md: "none" },
          }}
          gap={6}
          className="small-home"
        >
          <Image />
          <Content />
        </Stack>
      ) : (
        <Grid container className="desktop-home">
          <Grid size={6}>
            <Content />
          </Grid>
          <Image />
          <Grid size={12}></Grid>
        </Grid>
      )}
    </>
  );
};

export default Home;
