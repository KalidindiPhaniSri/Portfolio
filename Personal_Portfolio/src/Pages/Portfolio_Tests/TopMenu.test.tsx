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
// Passing tests
describe("Top Menu - Passing Tests", () => {
  it("applies highlight-navbtn class to active section in desktop", () => {
    render(
      <TopMenu activeSection={data.topMenu.sections[1]} scrolled={false} />
    );
    const desktopNav = screen.getByTestId("desktop-nav");
    const activeBtn = within(desktopNav).getByText(data.topMenu.sections[1]);
    expect(activeBtn.className).toContain("highlight-navbtn");
  });

  it("applies scrolled-navbtn class to non-active sections when scrolled", () => {
    render(
      <TopMenu activeSection={data.topMenu.sections[0]} scrolled={true} />
    );
    const desktopNav = screen.getByTestId("desktop-nav");
    data.topMenu.sections.slice(1).forEach((item) => {
      const btn = within(desktopNav).getByText(item);
      expect(btn.className).toContain("scrolled-navbtn");
    });
  });

  it("check menu icon", () => {
    global.innerWidth = 500;
    global.dispatchEvent(new Event("resize"));
    render(<TopMenu activeSection="home" scrolled={false} />);
    expect(screen.getByLabelText("open drawer")).toBeInTheDocument();
  });
});
