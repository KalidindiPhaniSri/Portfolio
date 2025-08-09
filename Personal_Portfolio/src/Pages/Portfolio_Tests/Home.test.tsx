import { render, screen, within } from "@testing-library/react";
import Home from "../Portfolio/Home";
import data from "./testdata.json";
import { SetScreenSize } from "../../Utils/ReusableComponents";

describe("Home section", () => {
  it("renders portfolio profile in large screens", () => {
    SetScreenSize(1024);
    render(<Home onVisible={() => {}} />);
    const image = screen.getByAltText(/Phani/i) as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src");
    expect(image.getAttribute("src")).toBeTruthy();
    expect(image.height).toBe(250);
    expect(image.width).toBe(250);
  });
  it("renders portfolio profile in small screens", () => {
    SetScreenSize(500);
    render(<Home onVisible={() => {}} />);
    const image = screen.getByAltText(/Phani/i) as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src");
    expect(image.getAttribute("src")).toBeTruthy();
    expect(image.height).toBe(150);
    expect(image.width).toBe(150);
  });

  it("renders all bio content for large screens", () => {
    SetScreenSize(1024);
    render(<Home onVisible={() => {}} />);
    const content = screen.getByTestId("home-content");
    const { intro, name, role, text } = data.home.bio;
    expect(within(content).getByText(intro)).toBeInTheDocument();
    expect(within(content).getByText(name)).toBeInTheDocument();
    expect(within(content).getByText(role)).toBeInTheDocument();
    // Check if combined content includes the full text (for text which appeared on multiple lines)
    expect(content).toHaveTextContent(text);
  });
  it("renders linkedin and github icons", () => {
    render(<Home onVisible={() => {}} />);
    const linkedInEle = screen.getByLabelText(/LinkedIn/i);
    const gitHubEle = screen.getByLabelText(/GitHub/i);
    expect(linkedInEle).toBeInTheDocument();
    expect(gitHubEle).toBeInTheDocument();
  });
});

describe("checking classnames for home section", () => {
  it("renders specified bio content for small screens", () => {
    SetScreenSize(500);
    render(<Home onVisible={() => {}} />);
    const { intro, name, role, text } = data.home.bio;
    const content = screen.getByTestId("home-content");
    expect(within(content).getByText(intro)).toBeInTheDocument();
    expect(within(content).getByText(name)).toBeInTheDocument();
    expect(within(content).getByText(role)).toBeInTheDocument();
    expect(within(content).queryByText(text)).not.toBeInTheDocument();
  });

  it("applies desktop-home class for large screens", () => {
    SetScreenSize(1024);
    const { container } = render(<Home onVisible={() => {}} />);
    const homeSection = container.querySelector("#home");
    expect(homeSection).toBeTruthy();
    const desktopGrid = container.querySelector(".desktop-home");
    expect(desktopGrid).toBeTruthy();
  });
  it("applies small-home class for small screens", () => {
    SetScreenSize(500);
    const { container } = render(<Home onVisible={() => {}} />);
    const homeSection = container.querySelector("#home");
    expect(homeSection).toBeTruthy();
    const desktopGrid = container.querySelector(".small-home");
    expect(desktopGrid).toBeTruthy();
  });
  it("applies desktop-content classname for large screens for content component", () => {
    SetScreenSize(1024);
    render(<Home onVisible={() => {}} />);
    const ele = screen.getByTestId("home-content");
    expect(ele.className).toContain("desktop-content");
  });
  it("applies small-content classname for small screens for content component", () => {
    SetScreenSize(500);
    render(<Home onVisible={() => {}} />);
    const ele = screen.getByTestId("home-content");
    expect(ele.className).toContain("small-content");
  });
});
