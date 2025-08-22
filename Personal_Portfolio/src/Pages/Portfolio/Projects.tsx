import { useInView } from "react-intersection-observer";
import { SectionHeader, TextBlock } from "../../Utils/ReusableComponents";
import {
  Grid,
  Grow,
  IconButton,
  Stack,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import data from "./data.json";
import { Images } from "../../Utils/Helpers";
import { useEffect } from "react";

interface ProjectsProps {
  onVisible: () => void;
}
interface CardProps {
  index: number;
}

const Projects: React.FC<ProjectsProps> = ({ onVisible }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTabular = useMediaQuery(theme.breakpoints.down("lg"));
  const { ref, inView } = useInView(data.intersectionObserver);

  useEffect(() => {
    if (inView) onVisible();
  }, [inView, onVisible]);

  const ProjectSection: React.FC<CardProps> = ({ index }) => {
    const { image, title, text, tech, githubLink } =
      data.projects.sections[index];
    return (
      <Stack
        direction="row"
        justifyContent="space-between"
        gap={2}
        data-testid="project-section"
        alignItems="center"
      >
        {/* {Image} */}
        {!isMobile && (
          <Grow in={inView} timeout={1000}>
            <Grid size={{ xs: 12, md: 3 }}>
              <IconButton
                component="a"
                href={githubLink}
                target="_blank"
                aria-label="GitHub"
                className="github-icon"
              >
                <img
                  src={Images[image] ?? ""}
                  alt={title}
                  height={isTabular ? 100 : 125}
                  width={isTabular ? 165 : 200}
                />
              </IconButton>
            </Grid>
          </Grow>
        )}
        {/* {Content} */}
        <Grow in={inView} timeout={1000}>
          <Grid size={{ xs: 12, md: 9 }}>
            <Stack textAlign={"start"}>
              <Stack direction="row" justifyContent="space-between">
                <TextBlock
                  text={title}
                  size="lg"
                  fontWeight="bold"
                  className="typo"
                />
                <IconButton
                  component="a"
                  href={githubLink}
                  target="_blank"
                  aria-label="GitHub"
                  className="github-icon"
                >
                  <GitHubIcon fontSize="medium" />
                </IconButton>
              </Stack>
              <TextBlock
                text={text}
                size="md"
                textAlign="justify"
                className="desc"
              />
              <Stack
                direction="row"
                flexWrap={"wrap"}
                gap={{ xs: 2, md: 3 }}
                justifyContent="end"
                sx={{ pt: 1 }}
              >
                {tech.map((skill, ind) => {
                  return (
                    <Tooltip
                      title={skill.tooltip}
                      placement="top"
                      arrow
                      style={{ cursor: "pointer" }}
                      key={ind}
                    >
                      <img
                        src={Images[skill.icon] ?? ""}
                        alt={skill.tooltip}
                        height={isMobile ? 10 : 20}
                        width={isMobile ? 10 : 20}
                        key={ind}
                      />
                    </Tooltip>
                  );
                })}
              </Stack>
            </Stack>
          </Grid>
        </Grow>
      </Stack>
    );
  };

  return (
    <section id="projects" className="projects" ref={ref}>
      <SectionHeader
        startText={data.projects.title[0]}
        endText={data.projects.title[1]}
      />
      <Grid container spacing={{ xs: 2, md: 3 }} alignItems="center">
        {data.projects.sections.map((obj, index) => (
          <ProjectSection index={index} key={obj.id} />
        ))}
      </Grid>
    </section>
  );
};

export default Projects;
