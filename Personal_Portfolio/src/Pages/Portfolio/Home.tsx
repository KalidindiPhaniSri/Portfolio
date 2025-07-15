import { Grid, Slide, Stack, Typography } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import Phani from "../../assets/Phani.jpg";
import data from "./data.json";

interface ContentProps {
  desktopMode: boolean;
}

const Image: React.FC<ContentProps> = ({ desktopMode }) => {
  return (
    <Slide in={true} direction={desktopMode ? "left" : "up"} timeout={1000}>
      <img
        src={Phani}
        alt="Img"
        height={250}
        width={250}
        style={{ borderRadius: "50%" }}
      />
    </Slide>
  );
};

const Content: React.FC<ContentProps> = ({ desktopMode }) => {
  const { intro, name, role, text } = data.home.bio;

  return (
    <Slide in={true} direction={desktopMode ? "right" : "up"} timeout={1000}>
      <Stack direction="column" gap={3}>
        <Typography variant="h5">{intro}</Typography>
        <Typography variant="h2">{name}</Typography>
        <Typography variant="h4">{role}</Typography>
        <Typography variant="subtitle1" sx={{ textAlign: "justify" }}>
          {text}
        </Typography>
      </Stack>
    </Slide>
  );
};

const Home = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <>
      {isDesktop ? (
        <Grid
          container
          sx={{ height: "100%" }}
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid size={6}>
            <Content desktopMode={isDesktop} />
          </Grid>
          <Image desktopMode={isDesktop} />
        </Grid>
      ) : (
        <Stack
          direction="column"
          sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
        >
          <Image desktopMode={isDesktop} />
          <Content desktopMode={isDesktop} />
        </Stack>
      )}
    </>
  );
};

export default Home;
