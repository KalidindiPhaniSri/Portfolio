import { Box, Grid, Slide, Stack, Typography } from "@mui/material";
import Phani from "../../../assets/Phani.jpg";
import data from "../data.json";
import "./Home.css";

const Image = () => {
  return (
    <Slide in={true} direction="left" timeout={1000}>
      <img
        src={Phani}
        alt="Img"
        height={250}
        width={250}
        className="phani-img"
      />
    </Slide>
  );
};

const Content = () => {
  const { intro, name, role, text } = data.home.bio;

  return (
    <Slide in={true} direction="right" timeout={1000}>
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
  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid
        size={12}
        sx={{ display: { xs: "flex", md: "none" } }}
        className="justify-around-align-center"
      >
        <Image />
      </Grid>
      <Grid
        size={12}
        sx={{ display: { xs: "flex", md: "none" } }}
        className="justify-around-align-center"
      >
        <Content />
      </Grid>
      <Box
        className="justify-around-align-center"
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        <Grid size={6}>
          <Content />
        </Grid>
        <Image />
      </Box>
    </Grid>
  );
};

export default Home;
