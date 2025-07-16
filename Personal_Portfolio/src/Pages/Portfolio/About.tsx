import { Grid, Slide, Stack, Typography, Zoom } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import AboutImg from "../../assets/about.jpg";
import data from "./data.json";

interface ImageProps {
  desktopMode: boolean;
}

const Image: React.FC<ImageProps> = ({ desktopMode }) => {
  const Image = (
    <img
      src={AboutImg}
      alt="About"
      height={desktopMode ? 250 : 150}
      width={desktopMode ? 250 : 150}
    />
  );
  return desktopMode ? (
    <Slide in={true} direction="right" timeout={1000}>
      {Image}
    </Slide>
  ) : (
    <Zoom in={true} timeout={1000}>
      {Image}
    </Zoom>
  );
};

const Content: React.FC<ImageProps> = ({ desktopMode }) => {
  const Text = (
    <Typography
      variant="subtitle1"
      sx={{ textAlign: "justify", alignItems: "center" }}
      data-testid="about-content"
    >
      {data.about.text}
    </Typography>
  );
  return desktopMode ? (
    <Slide in={true} direction="left" timeout={1000}>
      {Text}
    </Slide>
  ) : (
    <Zoom in={true} timeout={1000}>
      {Text}
    </Zoom>
  );
};

const About = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <>
      <Zoom in={true} timeout={1000}>
        <Typography variant={"h4"} sx={{ mb: 3 }} className="section-header">
          {data.about.title[0]} <span> {data.about.title[1]}</span>
        </Typography>
      </Zoom>
      {isDesktop ? (
        <Grid
          container
          sx={{ height: "100%" }}
          justifyContent="space-around"
          alignItems="center"
        >
          <Image desktopMode={isDesktop} />
          <Grid size={6}>
            <Content desktopMode={isDesktop} />
          </Grid>
        </Grid>
      ) : (
        <Stack
          direction="column"
          sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
          gap={6}
        >
          <Image desktopMode={isDesktop} />
          <Content desktopMode={isDesktop} />
        </Stack>
      )}
    </>
  );
};

export default About;
