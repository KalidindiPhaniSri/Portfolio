import { render, screen, within } from "@testing-library/react";
import Experience from "../Portfolio/Experience";
import data from "./testdata.json";
import { SetScreenSize } from "../../Utils/ReusableComponents";

describe("Experience Component", () => {
  it("renders title", () => {
    const { container } = render(<Experience onVisible={() => {}} />);
    expect(container).toHaveTextContent(data.experience.title);
  });
  it("check for vertical-line class name", () => {
    render(<Experience onVisible={() => {}} />);
    const ele = screen.getByTestId("vertical-line");
    expect(ele).toHaveClass("vertical-line");
  });
  it("renders all experience sections with correct alignment classes (desktop)", () => {
    SetScreenSize(1024);
    render(<Experience onVisible={() => {}} />);
    const section = screen.getByTestId("experience-sections");
    const tiles = section.querySelectorAll(".tile");
    expect(tiles.length).toBe(data.experience.sections.length);
    {
      tiles.forEach((tile, index) => {
        const itemData = data.experience.sections[index];
        const isLeft = index % 2 === 0;
        if (isLeft) {
          expect(tile).toHaveClass("justify-start");
          expect(tile).not.toHaveClass("justify-end");
        } else {
          expect(tile).toHaveClass("justify-end");
          expect(tile).not.toHaveClass("justify-start");
        }
        const verticalLineIcon = tile.querySelector(".vertical-line-icon");
        expect(verticalLineIcon).toBeInTheDocument();

        const tilecontent = tile.querySelector(".section");
        expect(tilecontent).toBeInTheDocument();
        expect(tilecontent).toHaveClass("desktop");
        expect(tilecontent).toHaveClass(isLeft ? "left" : "right");

        if (tilecontent) {
          //Header
          const header = tilecontent.querySelector(".header-section");
          expect(header).toBeInTheDocument();
          if (header instanceof HTMLElement) {
            const img = within(header).getByAltText(itemData.title);
            expect(img).toBeInTheDocument();
            expect(img).toHaveAttribute("src");
            expect(img.getAttribute("src")).toBeTruthy();

            expect(header).toHaveTextContent(itemData.title);
            expect(header).toHaveTextContent(
              `${itemData.role} - ${itemData.company}`
            );
            expect(header).toHaveTextContent(itemData.duration);
          }
          //Content
          const content = tilecontent.querySelector(".description");
          expect(content).toBeInTheDocument();
          if (content instanceof HTMLElement) {
            expect(content).toHaveTextContent(
              itemData.text.replace(/\s+/g, " ").trim()
            );
            itemData.tech.forEach((tech) => {
              const img = within(content).getByAltText(tech.tooltip);
              expect(img).toBeInTheDocument();
              expect(img).toHaveAttribute("src");
              expect(img.getAttribute("src")).toBeTruthy();
            });
          }
        }
      });
    }
  });
  it("renders all experience sections with correct alignment classes (mobile)", () => {
    SetScreenSize(500);
    render(<Experience onVisible={() => {}} />);
    const section = screen.getByTestId("experience-sections");
    const tiles = section.querySelectorAll(".tile");
    expect(tiles.length).toBe(data.experience.sections.length);
    {
      tiles.forEach((tile, index) => {
        const itemData = data.experience.sections[index];
        const isLeft = index % 2 === 0; // <-- Fix here
        if (isLeft) {
          expect(tile).toHaveClass("justify-start");
          expect(tile).not.toHaveClass("justify-end");
        } else {
          expect(tile).toHaveClass("justify-end");
          expect(tile).not.toHaveClass("justify-start");
        }

        const verticalLineIcon = tile.querySelector(".vertical-line-icon");
        expect(verticalLineIcon).toBeInTheDocument();

        const tilecontent = tile.querySelector(".section");
        expect(tilecontent).toBeInTheDocument();
        expect(tilecontent).toHaveClass("desktop");
        expect(tilecontent).toHaveClass(isLeft ? "left" : "right");

        if (tilecontent) {
          //Header
          const header = tilecontent.querySelector(".header-section");
          expect(header).toBeInTheDocument();
          if (header instanceof HTMLElement) {
            const img = within(header).getByAltText(itemData.title);
            expect(img).toBeInTheDocument();
            expect(img).toHaveAttribute("src");
            expect(img.getAttribute("src")).toBeTruthy();

            expect(header).toHaveTextContent(itemData.title);
            expect(header).toHaveTextContent(
              `${itemData.role} - ${itemData.company}`
            );
            expect(header).toHaveTextContent(itemData.duration);
          }
          //Content
          const content = tilecontent.querySelector(".description");
          expect(content).toBeInTheDocument();
          if (content instanceof HTMLElement) {
            expect(content).toHaveTextContent(
              itemData.text.replace(/\s+/g, " ").trim()
            );
            itemData.tech.forEach((tech) => {
              const img = within(content).getByAltText(tech.tooltip);
              expect(img).toBeInTheDocument();
              expect(img).toHaveAttribute("src");
              expect(img.getAttribute("src")).toBeTruthy();
            });
          }
        }
      });
    }
  });
});
