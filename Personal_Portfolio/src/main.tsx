import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Box } from "@mui/material";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Box
      sx={{
        paddingInline: {
          xs: "4rem",
          md: "6rem",
        },
      }}
    >
      <App />
    </Box>
  </StrictMode>
);
