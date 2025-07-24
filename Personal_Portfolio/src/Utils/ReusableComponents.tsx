import {
  Grow,
  Typography,
  useMediaQuery,
  useTheme,
  type CSSProperties,
} from "@mui/material";
import type React from "react";

interface SectionHeaderProps {
  startText: string;
  endText: string;
}
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  startText,
  endText,
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Grow in={true} timeout={1000}>
      <Typography
        variant={isDesktop ? "h4" : "h5"}
        sx={{ mb: 3 }}
        className="section-header"
      >
        {startText} <span> {endText}</span>
      </Typography>
    </Grow>
  );
};

interface TextBlockProps {
  text: string;
  size: "sm" | "md" | "lg";
  textAlign?: CSSProperties["textAlign"];
  fontWeight?: CSSProperties["fontWeight"];
  className?: string;
}

export const TextBlock: React.FC<TextBlockProps> = ({
  text,
  size,
  textAlign,
  fontWeight,
  className = "",
}) => {
  const props = {
    fontSize:
      size === "sm"
        ? {
            xs: "0.5rem",
            sm: "0.6rem",
            md: "0.7rem",
            lg: "0.75rem",
          }
        : size === "md"
        ? {
            xs: "0.6rem",
            sm: "0.7rem",
            md: "0.8rem",
            lg: "0.9rem",
          }
        : {
            xs: "0.7rem",
            sm: "0.8rem",
            md: "0.9rem",
            lg: "1.15rem",
          },
    ...(textAlign ? { textAlign: textAlign } : {}),
    ...(fontWeight ? { fontWeight: fontWeight } : {}),
  };
  return (
    <Typography sx={{ ...props }} className={className}>
      {text}
    </Typography>
  );
};
