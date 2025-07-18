import { Grow, Typography } from "@mui/material";
import type React from "react";

interface SectionHeaderProps {
  startText: string;
  endText: string;
}
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  startText,
  endText,
}) => {
  return (
    <Grow in={true} timeout={1000}>
      <Typography variant={"h4"} sx={{ my: 3 }} className="section-header">
        {startText} <span> {endText}</span>
      </Typography>
    </Grow>
  );
};
