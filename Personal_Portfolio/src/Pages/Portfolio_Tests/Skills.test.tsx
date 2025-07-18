import { render, screen } from "@testing-library/react";
import Skills from "../Portfolio/Skills";
import data from "./testdata.json";

describe("Skills", () => {
  it("renders title", () => {
    const { container } = render(<Skills onVisible={() => {}} />);
    expect(container).toHaveTextContent(data.skills.title);
  });
  describe("rendering tiles", () => {
    data.skills.cards.forEach((item) => {
      it(`rendering tile image and tile for ${item.name}`, async () => {
        const { container } = render(<Skills onVisible={() => {}} />);
        const image = await screen.findByAltText(item.name);
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src");
        expect(image.getAttribute("src")).toBeTruthy();
        expect(container).toHaveTextContent(item.name);
      });
    });
  });
});
