import { Grid, Slide, Stack, Typography, Zoom } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { Images } from "../../Utils/Helpers";
import { SectionHeader } from "../../Utils/ReusableComponents";
import data from "./data.json";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface AboutProps {
  onVisible: () => void;
}
interface ImageProps {
  desktopMode: boolean;
  inView: boolean;
}

const Image: React.FC<ImageProps> = ({ desktopMode, inView }) => {
  const Image = (
    <img
      src={Images[data.about.imgname] ?? ""}
      alt="About"
      height={desktopMode ? 250 : 150}
      width={desktopMode ? 250 : 150}
    />
  );
  return desktopMode ? (
    <Slide in={inView} direction="right" timeout={1000}>
      {Image}
    </Slide>
  ) : (
    <Zoom in={inView} timeout={1000}>
      {Image}
    </Zoom>
  );
};

const Content: React.FC<ImageProps> = ({ desktopMode, inView }) => {
  const Text = (
    <Typography
      sx={{
        textAlign: "justify",
        alignItems: "center",
        fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
      }}
      data-testid="about-content"
    >
      {data.about.text}
    </Typography>
  );
  return desktopMode ? (
    <Slide in={inView} direction="left" timeout={1000}>
      {Text}
    </Slide>
  ) : (
    <Zoom in={inView} timeout={1000}>
      {Text}
    </Zoom>
  );
};

const About: React.FC<AboutProps> = ({ onVisible }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const { ref, inView } = useInView(data.intersectionObserver);
  useEffect(() => {
    if (inView) onVisible();
  }, [inView, onVisible]);

  return (
    <section id="about" className="about" ref={ref}>
      <SectionHeader
        startText={data.about.title[0]}
        endText={data.about.title[1]}
      />
      {isDesktop ? (
        <Grid
          container
          sx={{ height: "100%" }}
          justifyContent="space-around"
          alignItems="center"
        >
          <Image desktopMode={isDesktop} inView={inView} />
          <Grid size={6}>
            <Content desktopMode={isDesktop} inView={inView} />
          </Grid>
        </Grid>
      ) : (
        <Stack
          direction="column"
          sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
          gap={2}
        >
          <Image desktopMode={isDesktop} inView={inView} />
          <Content desktopMode={isDesktop} inView={inView} />
        </Stack>
      )}
    </section>
  );
};

export default About;
