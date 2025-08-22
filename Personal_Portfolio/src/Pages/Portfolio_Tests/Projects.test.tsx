import { render, within, screen } from "@testing-library/react";
import Projects from "../Portfolio/Projects";
import data from "./testdata.json";
import { SetScreenSize } from "../../Utils/ReusableComponents";

describe("Projects Component", () => {
  it("renders title", () => {
    const { container } = render(<Projects onVisible={() => {}} />);
    expect(container).toHaveTextContent(data.projects.title);
  });
  it("renders all project sections (desktop)", async () => {
    SetScreenSize(1024);
    render(<Projects onVisible={() => {}} />);
    const sections = await screen.findAllByTestId("project-section");
    expect(sections.length).toBe(data.projects.sections.length);
    sections.forEach((section, index) => {
      const itemData = data.projects.sections[index];
      const img = within(section as unknown as HTMLElement).getByAltText(
        itemData.title
      );
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src");
      expect(img.getAttribute("src")).toBeTruthy();
      expect(section).toHaveTextContent(itemData.title);
      expect(section).toHaveTextContent(itemData.text);
      itemData.tech.forEach((tech) => {
        const techImg = within(section as unknown as HTMLElement).getByAltText(
          tech.tooltip
        );
        expect(techImg).toBeInTheDocument();
        expect(techImg).toHaveAttribute("src");
        expect(techImg.getAttribute("src")).toBeTruthy();
      });
    });
  });
});
