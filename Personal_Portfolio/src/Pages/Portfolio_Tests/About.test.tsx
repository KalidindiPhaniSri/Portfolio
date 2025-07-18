import { render, screen, within } from "@testing-library/react";
import data from "./testdata.json";
import About from "../Portfolio/About";

describe("About", () => {
  it("renders title", () => {
    const { container } = render(<About onVisible={() => {}} />);
    expect(container).toHaveTextContent(data.about.title);
  });
  it("renders about image", () => {
    render(<About onVisible={() => {}} />);
    const image = screen.getByAltText(/About/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src");
    expect(image.getAttribute("src")).toBeTruthy();
  });
  it("renders content", () => {
    render(<About onVisible={() => {}} />);
    const content = screen.getByTestId("about-content");
    expect(within(content).getByText(data.about.text)).toBeInTheDocument();
  });
});
