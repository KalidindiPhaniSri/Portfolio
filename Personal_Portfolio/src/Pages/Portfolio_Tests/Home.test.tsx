import { render, screen, within } from "@testing-library/react";
import Home from "../Portfolio/Home";
import data from "./testdata.json";

describe("Home", () => {
  it("renders portfolio profile", async () => {
    render(<Home onVisible={() => {}} />);
    const image = screen.getByAltText(/Phani/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src");
    expect(image.getAttribute("src")).toBeTruthy();
  });

  it("renders all bio content for large screens", () => {
    render(<Home onVisible={() => {}} />);
    const content = screen.getByTestId("home-content");
    const { intro, name, role, text } = data.home.bio;
    expect(within(content).getByText(intro)).toBeInTheDocument();
    expect(within(content).getByText(name)).toBeInTheDocument();
    expect(within(content).getByText(role)).toBeInTheDocument();
    // Check if combined content includes the full text (for text which appeared on multiple lines)
    expect(content).toHaveTextContent(text);
  });

  it("renders specified bio content for small screens", () => {
    global.innerWidth = 500;
    global.dispatchEvent(new Event("resize"));
    render(<Home onVisible={() => {}} />);
    const { intro, name, role, text } = data.home.bio;
    const content = screen.getByTestId("home-content");
    expect(within(content).getByText(intro)).toBeInTheDocument();
    expect(within(content).getByText(name)).toBeInTheDocument();
    expect(within(content).getByText(role)).toBeInTheDocument();
    expect(within(content).queryByText(text)).not.toBeInTheDocument();
  });
});
