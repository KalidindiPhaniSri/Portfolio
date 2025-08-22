import {
  Box,
  Stack,
  useMediaQuery,
  useTheme,
  Grow,
  Tooltip,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import data from "./data.json";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { SectionHeader, TextBlock } from "../../Utils/ReusableComponents";
import { Images } from "../../Utils/Helpers";

interface ExperienceProps {
  onVisible: () => void;
}
interface HeaderDataProps {
  title: string;
  titleTooltip: string;
  image: string;
  role: string;
  company: string;
  duration: string;
  text: string;
  iconKey: string;
}
interface HeaderProps {
  data: HeaderDataProps;
}
interface ContentPrps {
  text: string;
  tech: { icon: string; tooltip: string }[];
}

const Experience: React.FC<ExperienceProps> = ({ onVisible }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTab = useMediaQuery(theme.breakpoints.down("lg"));

  const { ref, inView } = useInView(data.intersectionObserver);

  useEffect(() => {
    if (inView) onVisible();
  }, [inView, onVisible]);

  const getIconByType = (type: string) => {
    switch (type) {
      case "fullTime":
        return (
          <WorkIcon fontSize={isMobile ? "medium" : "large"} color="primary" />
        );
      case "intern":
        return (
          <SchoolIcon
            fontSize={isMobile ? "medium" : "large"}
            color="secondary"
          />
        );
      case "freelance":
      default:
        return <WorkIcon />;
    }
  };

  const Header: React.FC<HeaderProps> = ({ data }) => {
    return (
      <Grow in={inView} timeout={1000}>
        <Stack className="header-section" direction="row">
          <Stack direction="row" gap={{ xs: 2, lg: 3 }}>
            <img
              src={Images[data.image] ?? ""}
              alt={data.title}
              height={isMobile ? 30 : 50}
              width={isMobile ? 30 : 50}
            />
            <Stack direction="column" alignItems="start">
              <Tooltip title={data.titleTooltip} placement="top" arrow>
                <TextBlock
                  size="lg"
                  fontWeight="bold"
                  text={data.title}
                  className="typo"
                />
              </Tooltip>
              <TextBlock
                size="md"
                text={data.role + " - " + data.company}
                className="typo"
              />
              {isTab && (
                <TextBlock size="sm" text={data.duration} className="typo" />
              )}
            </Stack>
          </Stack>
          {!isTab && (
            <Stack gap={1} direction="column" alignItems="end">
              <TextBlock size="sm" text={data.duration} className="typo" />
            </Stack>
          )}
        </Stack>
      </Grow>
    );
  };

  const Content: React.FC<ContentPrps> = ({ text, tech }) => {
    return (
      <Grow in={inView} timeout={1000}>
        <Stack direction="column" gap={{ xs: 2, md: 3 }}>
          <TextBlock
            size="md"
            text={text}
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
                    height={isMobile ? 15 : 25}
                    width={isMobile ? 15 : 25}
                    key={ind}
                  />
                </Tooltip>
              );
            })}
          </Stack>
        </Stack>
      </Grow>
    );
  };

  return (
    <section ref={ref} id="experience" className="experience">
      <SectionHeader
        startText={data.experience.title[0]}
        endText={data.experience.title[1]}
      />
      <Box sx={{ position: "relative", mt: 6 }}>
        {/* Vertical Line */}
        <Box className="vertical-line" data-testid="vertical-line" />

        <Stack spacing={6} data-testid="experience-sections">
          {data.experience.sections.map((item, index) => {
            const isLeft = !isMobile && index % 2 === 0;

            return (
              <Box
                key={index}
                className={`tile ${
                  isMobile
                    ? "justify-start"
                    : isLeft
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                {/* Timeline Dot */}
                <Box className="vertical-line-icon">
                  {getIconByType(item.iconKey)}
                </Box>

                {/* Card Content */}
                <Box
                  className={`section ${isMobile ? "mobile" : "desktop"} ${
                    isLeft ? "left" : "right"
                  }`}
                >
                  <Header data={item} />
                  {/* Hidden extra content, revealed on hover */}
                  <Box className="description">
                    <Content text={item.text} tech={item.tech} />
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </section>
  );
};

export default Experience;
