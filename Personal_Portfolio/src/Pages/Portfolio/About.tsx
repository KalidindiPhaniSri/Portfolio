import { Grid, Grow, Stack } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { SectionHeader, TextBlock } from "../../Utils/ReusableComponents";
import data from "./data.json";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Images } from "../../Utils/Helpers";

interface AboutProps {
  onVisible: () => void;
}
interface AboutCardProps {
  desktopMode?: boolean;
  inView?: boolean;
}

const AboutCard: React.FC<AboutCardProps> = ({ desktopMode, inView }) => {
  const { header, headerText, tiles } = data.about.card;
  return (
    <Grow in={inView} timeout={1000}>
      <Stack
        className="about-card"
        data-testid="about-card"
        sx={{ p: { xs: 2, sm: 3, md: 4, lg: 5 } }}
        gap={{ xs: 2, sm: 3, md: 4, lg: 5 }}
      >
        <TextBlock size="lg" fontWeight="bold" text={header} />
        <TextBlock size="lg" fontWeight="bold" text={headerText} />
        <Grid container spacing={{ xs: 1.5, md: 3 }}>
          {tiles.map(({ icon, header, headerText }) => {
            return (
              <Grow in={inView} timeout={2000}>
                <Grid size={6} className="tile" sx={{ p: { xs: 1, md: 1.5 } }}>
                  <img
                    src={Images[icon] ?? ""}
                    alt={header}
                    height={desktopMode ? 40 : 20}
                    width={desktopMode ? 40 : 20}
                  />
                  <TextBlock size="md" fontWeight="bold" text={header} />
                  <TextBlock size="sm" text={headerText} />
                </Grid>
              </Grow>
            );
          })}
        </Grid>
      </Stack>
    </Grow>
  );
};

const Intro: React.FC<AboutCardProps> = ({ inView }) => {
  return (
    <Stack direction="column" gap={{ xs: 1, sm: 1.5, md: 2 }}>
      {data.about.intro.map(({ text, delay }, ind) => {
        return (
          <Grow in={inView} timeout={delay}>
            <div data-testid="about-intro" key={ind}>
              <TextBlock size="md" textAlign="justify" text={text} />
            </div>
          </Grow>
        );
      })}
    </Stack>
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
          spacing={3}
        >
          <Grid size={7}>
            <Intro inView={inView} />
          </Grid>
          <Grid size={5}>
            <AboutCard desktopMode={isDesktop} inView={inView} />
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          sx={{ height: "100%" }}
          justifyContent="space-around"
          alignItems="center"
          spacing={3}
        >
          <Grid size={10}>
            <AboutCard desktopMode={isDesktop} inView={inView} />
          </Grid>
          <Grid size={12}>
            <Intro inView={inView} />
          </Grid>
        </Grid>
      )}
    </section>
  );
};

export default About;
