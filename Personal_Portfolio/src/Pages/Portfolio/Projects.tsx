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
  const { ref, inView } = useInView(data.intersectionObserver);

  useEffect(() => {
    if (inView) onVisible();
  }, [inView, onVisible]);

  const Card: React.FC<CardProps> = ({ index }) => {
    const { image, title, text, tech, githubLink } =
      data.projects.sections[index];
    return (
      <>
        {/* {Image} */}
        <Grow in={inView} timeout={1000}>
          <Grid size={{ xs: 3, md: 4 }}>
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
                height={isMobile ? 75 : 150}
                width={isMobile ? 100 : 250}
              />
            </IconButton>
          </Grid>
        </Grow>
        {/* {Content} */}
        <Grow in={inView} timeout={1000}>
          <Grid size={{ xs: 9, md: 8 }}>
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
      </>
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
          <Card index={index} key={obj.title} />
        ))}
      </Grid>
    </section>
  );
};

export default Projects;

// import { Box, Stack, Grow, Tooltip } from "@mui/material";
// import { useInView } from "react-intersection-observer";
// import { SectionHeader, TextBlock } from "../../Utils/ReusableComponents";
// import { Images } from "../../Utils/Helpers";

// interface ProjectsProps {
//   onVisible: () => void;
// }

// interface ProjectData {
//   title: string;
//   description: string;
//   image: string;
//   tech: { icon: string; tooltip: string }[];
//   link?: string;
// }

// const projects: ProjectData[] = [
//   {
//     title: "Personal Portfolio",
//     description:
//       "A modern, responsive portfolio built with React, TypeScript, and Vite. Showcases my skills, experience, and projects with a clean UI and smooth navigation.",
//     image: "../assets/home.jpg",
//     tech: [
//       { icon: "../assets/Skills/react.PNG", tooltip: "React" },
//       { icon: "../assets/Skills/typescript.png", tooltip: "TypeScript" },
//       { icon: "../assets/Skills/mui.png", tooltip: "MUI" },
//       { icon: "../assets/Skills/vitest.png", tooltip: "Vitest" },
//       { icon: "../assets/Skills/git.png", tooltip: "Git" },
//     ],
//     link: "#home",
//   },
//   {
//     title: "Personal Portfolio",
//     description:
//       "A modern, responsive portfolio built with React, TypeScript, and Vite. Showcases my skills, experience, and projects with a clean UI and smooth navigation.",
//     image: "../assets/home.jpg",
//     tech: [
//       { icon: "../assets/Skills/react.PNG", tooltip: "React" },
//       { icon: "../assets/Skills/typescript.png", tooltip: "TypeScript" },
//       { icon: "../assets/Skills/mui.png", tooltip: "MUI" },
//       { icon: "../assets/Skills/vitest.png", tooltip: "Vitest" },
//       { icon: "../assets/Skills/git.png", tooltip: "Git" },
//     ],
//     link: "#home",
//   },
// ];

// const Projects: React.FC<ProjectsProps> = ({ onVisible }) => {
//   const { ref, inView } = useInView({
//     threshold: 0.4,
//     triggerOnce: false,
//     onChange: (inView) => inView && onVisible(),
//   });

//   return (
//     <Box ref={ref} className="projects" id="projects">
//       <SectionHeader startText="My" endText="Projects" />
//       <Stack gap={4} alignItems="center">
//         {projects.map((project, idx) => (
//           <Grow in={inView} timeout={1000 + idx * 300} key={project.title}>
//             <Box
//               sx={{
//                 background: "rgb(17 17 17)",
//                 border: "1px solid rgb(51 51 51)",
//                 color: "white",
//                 borderRadius: "1.5rem",
//                 p: 3,
//                 maxWidth: 700,
//                 width: "100%",
//                 boxShadow: 3,
//                 display: "flex",
//                 flexDirection: { xs: "column", md: "row" },
//                 alignItems: "center",
//                 gap: 3,
//               }}
//             >
//               <img
//                 src={Images[project.image] ?? project.image}
//                 alt={project.title}
//                 style={{
//                   width: 100,
//                   height: 100,
//                   borderRadius: "1rem",
//                   objectFit: "cover",
//                   marginRight: 24,
//                 }}
//               />
// <Stack flex={1} gap={1}>
//   <TextBlock
//     text={project.title}
//     size="lg"
//     fontWeight="bold"
//     className="typo"
//   />
//   <TextBlock
//     text={project.description}
//     size="md"
//     textAlign="justify"
//     className="desc"
//   />
//                 <Stack direction="row" gap={2} mt={1}>
//                   {project.tech.map((skill) => (
//                     <Tooltip
//                       title={skill.tooltip}
//                       placement="top"
//                       arrow
//                       key={skill.icon}
//                     >
//                       <img
//                         src={Images[skill.icon] ?? skill.icon}
//                         alt={skill.tooltip}
//                         height={25}
//                         width={25}
//                         style={{
//                           background: "#222",
//                           borderRadius: 6,
//                           padding: 2,
//                         }}
//                       />
//                     </Tooltip>
//                   ))}
//                 </Stack>
//                 {project.link && (
//                   <a
//                     href={project.link}
//                     style={{
//                       color: "var(--theme-yellow)",
//                       marginTop: 8,
//                       display: "inline-block",
//                     }}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     View Project
//                   </a>
//                 )}
//               </Stack>
//             </Box>
//           </Grow>
//         ))}
//       </Stack>
//     </Box>
//   );
// };

// export default Projects;
