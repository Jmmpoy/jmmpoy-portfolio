import { useEffect, useState } from "react";
import Container from "./container";
import Link from "next/link";
import { useAnimation, motion, AnimatePresence, Variants } from "motion/react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useHover } from "@/hooks/useHover";
import { useRouter } from "next/navigation";
import { Project } from "@/types/project";

const projectVariants: Variants = {
  initial: { opacity: 0, filter: "blur(2px)" },
  enter: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.7, 0, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    filter: "blur(2px)",
    transition: {
      duration: 0.3,
      ease: [0.7, 0, 0.3, 1],
    },
  },
};

interface ProjectItemProps {
  project: Project;
  handleLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const ProjectItem = ({ project, handleLinkClick }: ProjectItemProps) => {
  const [ref, isHovering] = useHover<HTMLDivElement>();
  const href = `/projects/${project.id}`;
  const isInProgress = Boolean(project.inProgress);

  const media = (
    <motion.div className="grid-element sepia-[10%] aspect-[4/3] relative text-opacity-20 ease-in-out duration-300 hover:text-opacity-100 grain">
      {project.coverVideo ? (
        <video
          src={project.coverVideo}
          autoPlay
          loop
          muted
          playsInline
          className="hover:opacity-80  transition ease-in-out duration-700 h-full w-full object-cover"
        />
      ) : (
        <Image
          src={project.coverImage}
          priority
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={90}
          loading="eager"
          className="object-cover hover:opacity-80 transition ease-in-out duration-700"
        />
      )}

      {isInProgress && (
        <span className="z-20 absolute top-4 left-4 uppercase text-black bg-white/90 px-2 py-1 font-founders text-xs tracking-wide">
          En cours
        </span>
      )}

      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isInProgress ? 0.12 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`z-10 absolute inset-0 h-full w-full filter ${isInProgress ? "bg-black" : "bg-black/30"}`}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isHovering && (
          <span className="z-20 absolute bottom-4 left-4 block overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              exit={{ y: "110%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="block uppercase text-white font-founders text-xl"
            >
              {project.name}
            </motion.span>
          </span>
        )}
      </AnimatePresence>
    </motion.div>
  );

  if (isInProgress) {
    return (
      <motion.div ref={ref} variants={projectVariants}>
        <div className="h-full cursor-not-allowed" aria-disabled="true">
          {media}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div ref={ref} variants={projectVariants}>
      <Link
        prefetch={true}
        scroll={false}
        href={href}
        passHref
        onClick={(e) => handleLinkClick(e, href)}
        className="link h-full"
      >
        {media}
      </Link>
    </motion.div>
  );
};

export default function Grid({ data }: { data: Project[] }) {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const router = useRouter();
  const [exitingTo, setExitingTo] = useState<string | null>(null);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setExitingTo(href);
  };

  useEffect(() => {
    if (inView && !exitingTo) {
      controls.start("enter");
    }
    if (exitingTo) {
      controls.start("exit");
    }
  }, [controls, inView, exitingTo]);

  const gridContainerVariants = {
    initial: {},
    enter: {
      transition: {
        staggerChildren: 0.15,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  return (
    <Container extraClasses="pb-8 mt-8">
      <motion.div
        ref={ref}
        variants={gridContainerVariants}
        initial="initial"
        animate={controls}
        onAnimationComplete={(definition) => {
          if (definition === "exit" && exitingTo) {
            router.push(exitingTo);
          }
        }}
        className="mt-4 gap-2 grid grid-cols-1 md:grid-cols-2"
      >
        {data &&
          data.map((project) => {
            return (
              <ProjectItem project={project} key={project.id} handleLinkClick={handleLinkClick} />
            );
          })}
      </motion.div>
    </Container>
  );
}
