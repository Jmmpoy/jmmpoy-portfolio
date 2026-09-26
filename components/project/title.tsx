import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import dynamic from "next/dynamic";

// Import dynamique de SplitText pour éviter l'exécution côté serveur de GSAP
const SplitText = dynamic(() => import("@/components/splitText"), {
  ssr: false,
  loading: () => <span className="opacity-0">Loading...</span>,
});

interface TitleProps {
  classes: string;
  name: string;
  link: string;
}

const Title = ({ classes, name, link }: TitleProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div>
      <motion.a
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.7, duration: 0.7, ease: "easeInOut" },
        }}
        exit={{
          opacity: 0,
          transition: { delay: 0.1, duration: 0.7, ease: "easeInOut" },
        }}
        className={`${classes} relative flex items-center overflow-y-hidden`}
        href={link}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative inline-block">
          <SplitText
            text={name}
            splitType="chars"
            className={classes}
            delay={100}
            duration={0.6}
            ease="power2.out"
            threshold={0.2}
            rootMargin="-50px"
            tag="span"
            playOnce={false}
          />
          <motion.div
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute bottom-0 left-0 h-0.5 bg-black dark:bg-white origin-left"
            style={{ width: "100%" }}
          />
        </div>
        <AnimatePresence>
          {isHovered && (
            <motion.span
              className="ml-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut", delay: 0.2 }}
            >
              →
            </motion.span>
          )}
        </AnimatePresence>
      </motion.a>
    </motion.div>
  );
};

export default Title;
