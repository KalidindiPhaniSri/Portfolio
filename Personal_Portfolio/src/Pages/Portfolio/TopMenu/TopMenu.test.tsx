import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect } from "vitest";
import TopMenu from "./TopMenu";
import data from "../testData.json";

describe("Top Menu", () => {
  it("renders logo text", () => {
    render(<TopMenu />);
    expect(screen.getByText(data.topMenu.text)).toBeInTheDocument();
  });

  it("render all the nav items with href in desktop mode", () => {
    const desktopNav = screen.getByTestId("desktop-nav");
    render(<TopMenu />);
    data.topMenu.sections.forEach((item) => {
      const link = within(desktopNav).getByText(item);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `#${item.toLowerCase()}`);
    });
  });

  it("opening and closing the drawer ", () => {
    global.innerWidth = 500;
    global.dispatchEvent(new Event("resize"));

    render(<TopMenu />);
    const menuButton = screen.getByLabelText("open drawer");
    const mobileNav = screen.getByTestId("mobile-nav");

    expect(menuButton).toBeVisible();
    fireEvent.click(menuButton);
    data.topMenu.sections.forEach((item) => {
      const link = within(mobileNav).getByText(item);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `#${item.toLowerCase()}`);
    });
    fireEvent.click(menuButton);
    data.topMenu.sections.forEach((item) => {
      const link = within(mobileNav).getByText(item);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `#${item.toLowerCase()}`);
    });
  });
});
