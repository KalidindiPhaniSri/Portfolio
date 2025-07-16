import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect } from "vitest";
import data from "./testdata.json";
import TopMenu from "../Portfolio/TopMenu";

describe("Top Menu", () => {
  it("renders logo text", () => {
    render(<TopMenu activeSection="home" scrolled={false} />);
    expect(screen.getByText(data.topMenu.text)).toBeInTheDocument();
  });

  it("render all the nav items with href in desktop mode", () => {
    render(<TopMenu activeSection="home" scrolled={false} />);
    const desktopNav = screen.getByTestId("desktop-nav");
    data.topMenu.sections.forEach((item) => {
      const link = within(desktopNav).getByText(item);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `#${item.toLowerCase()}`);
    });
  });

  it("opening and closing the drawer ", () => {
    global.innerWidth = 500;
    global.dispatchEvent(new Event("resize"));

    render(<TopMenu activeSection="home" scrolled={false} />);
    const menuButton = screen.getByLabelText("open drawer");
    expect(menuButton).toBeInTheDocument();

    fireEvent.click(menuButton);
    const mobileNav = screen.getByTestId("mobile-nav");
    data.topMenu.sections.forEach((item) => {
      const textNode = within(mobileNav).getByText(item);
      const anchorNode = textNode.closest("a");
      expect(textNode).toBeInTheDocument();
      expect(anchorNode).toHaveAttribute("href", `#${item.toLowerCase()}`);
    });
    fireEvent.click(menuButton);
    expect(mobileNav).not.toBeVisible();
  });
});
