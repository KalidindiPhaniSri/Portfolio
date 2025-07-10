import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect } from "vitest";
import TopMenu from "./TopMenu";
import data from "../testData.json";

describe("Top Menu", () => {
  it("renders logo text", () => {
    render(<TopMenu />);
    expect(screen.getByText(data.topMenu.text)).toBeInTheDocument();
  });
  it("render all the nav items in desktop mode", () => {
    render(<TopMenu />);
    const desktopNav = screen.getByTestId("desktop-nav");
    data.topMenu.sections.forEach((item) => {
      expect(within(desktopNav).getByText(item)).toBeInTheDocument();
    });
  });
  it("opens the drawer when menu icon is clicked (mobile)", () => {
    global.innerWidth = 500;
    global.dispatchEvent(new Event("resize"));
    render(<TopMenu />);
    const drawer = screen.getByLabelText("open drawer");
    const mobileNav = screen.getByTestId("mobile-nav");
    fireEvent.click(drawer);
    data.topMenu.sections.forEach((item) => {
      expect(within(mobileNav).getByText(item)).toBeInTheDocument();
    });
  });
});
