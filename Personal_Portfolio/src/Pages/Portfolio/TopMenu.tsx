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

const getNavBtnClass = (
  item: string,
  activeSection: string,
  scrolled: boolean
) => {
  if (activeSection.toLowerCase() === item.toLowerCase())
    return "highlight-navbtn";
  if (scrolled) return "scrolled-navbtn";
  return "navbtn";
};

const TopMenu: React.FC<TopMenuProps> = ({ activeSection, scrolled }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { text, sections } = data.topMenu;
  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  React.useEffect(() => {
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (
        target.tagName === "A" &&
        target.getAttribute("href")?.startsWith("#")
      ) {
        const id = target.getAttribute("href")!.slice(1);
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          // Dynamically get the nav height
          const nav = document.querySelector(".top-menu");
          const navHeight = nav ? (nav as HTMLElement).offsetHeight : 0;
          const rect = el.getBoundingClientRect();
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
          const top = rect.top + scrollTop - navHeight;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  const renderDrawerList = () => (
    <List>
      {sections.map((item) => (
        <ListItem key={item} disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            component="a"
            href={`#${item.toLowerCase()}`}
          >
            <ListItemText
              primary={item}
              className={`${
                activeSection.toLowerCase() === item.toLowerCase()
                  ? "highlight-navbtn"
                  : ""
              }`}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

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
      {renderDrawerList()}
    </Box>
  );

  return (
    <Box className={`top-menu${scrolled ? " scrolled" : ""}`}>
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
              color: "var(--theme-yellow)",
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
              color: "var(--theme-yellow)",
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
                href={`#${item.toLowerCase()}`}
                className={getNavBtnClass(item, activeSection, scrolled)}
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
            keepMounted: true,
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
