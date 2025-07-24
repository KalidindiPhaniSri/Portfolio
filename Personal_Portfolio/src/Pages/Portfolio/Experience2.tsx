import React from "react";
import { Box, Typography, Stack, useMediaQuery, useTheme } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";

const sections = [
  {
    title: "Software Engineer",
    content: "Worked on enterprise applications.",
    icon: <WorkIcon color="primary" />,
  },
  {
    title: "Internship",
    content: "Built dashboards and tools.",
    icon: <SchoolIcon color="secondary" />,
  },
  {
    title: "Freelancer",
    content: "Worked with clients worldwide.",
    icon: <WorkIcon color="primary" />,
  },
];

const VerticalTimeline = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ position: "relative", px: 2, py: 6 }}>
      {/* Vertical Line */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: isMobile ? "20px" : "50%",
          transform: isMobile ? "none" : "translateX(-50%)",
          width: "2px",
          height: "100%",
          bgcolor: "grey.400",
        }}
      />

      <Stack spacing={6}>
        {sections.map((item, index) => {
          const isLeft = !isMobile && index % 2 === 0;

          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: isMobile ? "row" : "row",
                justifyContent: isMobile
                  ? "flex-start"
                  : isLeft
                  ? "flex-start"
                  : "flex-end",
                position: "relative",
              }}
            >
              {/* Timeline Icon */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: isMobile ? "20px" : "50%",
                  transform: isMobile
                    ? "translate(-50%, -50%)"
                    : "translate(-50%, -50%)",
                  bgcolor: "background.paper",
                  p: 1,
                  borderRadius: "50%",
                  boxShadow: 2,
                  zIndex: 1,
                }}
              >
                {item.icon}
              </Box>

              {/* Content Box */}
              <Box
                sx={{
                  width: isMobile ? "80%" : "45%",
                  p: 2,
                  ml: isMobile ? 6 : isLeft ? 0 : 4,
                  mr: isMobile ? 0 : isLeft ? 4 : 0,
                  bgcolor: isLeft || isMobile ? "#e3f2fd" : "#fce4ec",
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  {item.title}
                </Typography>
                <Typography>{item.content}</Typography>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default VerticalTimeline;
