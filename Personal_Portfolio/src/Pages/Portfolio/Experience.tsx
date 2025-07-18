import React, { useEffect } from "react";
import data from "./data.json";
import { useInView } from "react-intersection-observer";

interface ExperienceProps {
  onVisible: () => void;
}

const Experience: React.FC<ExperienceProps> = ({ onVisible }) => {
  const { ref, inView } = useInView(data.intersectionObserver);
  useEffect(() => {
    if (inView) onVisible();
  }, [inView, onVisible]);
  return <section ref={ref}>hi</section>;
};

export default Experience;
