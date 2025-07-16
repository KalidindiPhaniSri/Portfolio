// src/setupTests.ts
import "@testing-library/jest-dom";
// setupTests.ts
beforeAll(() => {
  window.matchMedia = (query: string) => {
    return {
      matches: matchQuery(query),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    };
  };

  const matchQuery = (query: string) => {
    const minMatch = query.match(/\(min-width:\s*(\d+)px\)/);
    const maxMatch = query.match(/\(max-width:\s*(\d+)px\)/);
    const width = global.innerWidth;

    if (minMatch) {
      return width >= parseInt(minMatch[1], 10);
    }
    if (maxMatch) {
      return width <= parseInt(maxMatch[1], 10);
    }
    return false;
  };
});
