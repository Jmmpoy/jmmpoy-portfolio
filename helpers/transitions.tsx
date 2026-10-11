import { Variants } from "motion/react";

export const fade: Variants = {
  initial: { opacity: 0, filter: "blur(2px)" },
  enter: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.83, 0, 0.17, 1] },
  },
  exit: {
    opacity: 0,
    filter: "blur(2px)",
    transition: { duration: 0.5, ease: [0.83, 0, 0.17, 1] },
  },
};
