import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect } from "vitest";
import TopMenu from "./TopMenu";

describe("Top Menu", () => {
  it("renders logo text", () => {
    render(<TopMenu />);
    expect(screen.getByText("PK")).toBeInTheDocument();
  });
  it("render all the nav items in desktop mode", () => {
    render(<TopMenu />);
    const desktopNav = screen.getByTestId("desktop-nav");
    const navItems = [
      "Home",
      "About",
      "Skills",
      "Experience",
      "Projects",
      "Contact",
    ];
    navItems.forEach((item) => {
      expect(within(desktopNav).getByText(item)).toBeInTheDocument();
    });
  });
  it("opens the drawer when menu icon is clicked (mobile)", () => {
    const navItems = [
      "Home",
      "About",
      "Skills",
      "Experience",
      "Projects",
      "Contact",
    ];
    global.innerWidth = 500;
    global.dispatchEvent(new Event("resize"));
    render(<TopMenu />);
    const drawer = screen.getByLabelText("open drawer");
    const mobileNav = screen.getByTestId("mobile-nav");
    fireEvent.click(drawer);
    navItems.forEach((item) => {
      expect(within(mobileNav).getByText(item)).toBeInTheDocument();
    });
  });
});
