import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import data from "./data.json";

interface TopMenuProps {
  activeSection: string;
  scrolled: boolean;
}

const drawerWidth = 240;

const TopMenu: React.FC<TopMenuProps> = ({ activeSection, scrolled }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { text, sections } = data.topMenu;

  const scrolledTextColor = scrolled ? { color: "black" } : { color: "#fff" };
  const scrolledBgColor = scrolled
    ? { backgroundColor: "#fff", transition: "background-color 0.5s ease" }
    : {};

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center" }}
      data-testid="mobile-nav"
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {data.topMenu.sections.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              component="a"
              href={"#" + item.toLowerCase()}
            >
              <ListItemText
                primary={item}
                sx={
                  activeSection.toLowerCase() === item.toLowerCase()
                    ? { color: "#f3bc17" }
                    : {}
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{ display: "flex", ...scrolledTextColor, ...scrolledBgColor }}
      className="top-menu"
    >
      <AppBar
        component="nav"
        className="appbar-nav"
        sx={{ paddingInline: { xs: "2rem", md: "4rem" } }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { xs: "block", md: "none" },
              color: "#f3bc17",
            }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "block" },
              color: "#f3bc17",
            }}
          >
            {text}
          </Typography>
          <Box
            sx={{ display: { xs: "none", md: "block" } }}
            data-testid="desktop-nav"
          >
            {sections.map((item) => (
              <Button
                key={item}
                sx={
                  activeSection.toLowerCase() === item.toLowerCase()
                    ? { color: "#f3bc17" }
                    : { ...scrolledTextColor }
                }
                href={"#" + item.toLowerCase()}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main">
        <Toolbar />
      </Box>
    </Box>
  );
};
export default TopMenu;
