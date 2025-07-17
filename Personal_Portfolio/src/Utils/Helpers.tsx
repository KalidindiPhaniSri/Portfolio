export const Images: Record<string, string | undefined> = import.meta.glob(
  "../assets/**/*.{png,PNG,jpg,jpeg,svg}",
  {
    eager: true,
    import: "default",
  }
);
