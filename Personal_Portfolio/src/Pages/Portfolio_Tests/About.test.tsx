import { render, screen, within } from "@testing-library/react";
import data from "./testdata.json";
import About from "../Portfolio/About";

describe("About", () => {
  it("renders title", () => {
    const { container } = render(<About onVisible={() => {}} />);
    expect(container).toHaveTextContent(data.about.title);
  });
  it("renders about section text", () => {
    render(<About onVisible={() => {}} />);
    const introSection = screen.getByTestId("about-intro");
    {
      data.about.intro.map((text) => {
        expect(introSection).toHaveTextContent(text);
      });
    }
  });
  it("renders about section card content", () => {
    render(<About onVisible={() => {}} />);
    const { header, headerText, tiles } = data.about.card;
    const cardSection = screen.getByTestId("about-card");
    const headerEle = within(cardSection).getByText(header);
    const headerTextEle = within(cardSection).getByText(headerText);
    expect(cardSection).toHaveClass("about-card");
    expect(headerEle).toBeInTheDocument();
    expect(headerTextEle).toBeInTheDocument();
    {
      tiles.map(({ header, headerText }) => {
        const imgEle = within(cardSection).getByAltText(header);
        expect(imgEle).toBeInTheDocument();
        expect(imgEle).toHaveAttribute("src");
        expect(imgEle.getAttribute("src")).toBeTruthy();
        expect(cardSection).toHaveTextContent(header);
        expect(cardSection).toHaveTextContent(headerText);
      });
    }
  });
});
