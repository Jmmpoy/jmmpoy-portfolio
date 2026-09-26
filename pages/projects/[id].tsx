import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Container from "../../components/container";
import data from "@/api";
import Dates from "@/components/project/dates";
import Tags from "@/components/project/tags";
import Title from "@/components/project/title";
import Description from "@/components/project/desccription";
import { Project as ProjectType } from "@/types/project";

export default function Project({ project }: { project: ProjectType }) {
  const {
    year,
    tags,
    name,
    link,
    description,
    coverImage,
    secondaryImage,
    thirdImage,
    fourthImage,
    fifthImage,
    sixthImage,
    seventhImage,
    eighthImage,
    ninthImage,
    coverVideo,
    objectFit,
  } = project;

  const media = [
    coverVideo,
    coverImage,
    secondaryImage,
    thirdImage,
    fourthImage,
    fifthImage,
    sixthImage,
    seventhImage,
    eighthImage,
    ninthImage,
  ].filter((item): item is string => Boolean(item));

  const [selected, setSelected] = useState<string | null>(null);
  const objectFitClass = objectFit === "contain" ? "object-contain" : "object-cover";

  return (
    <Container extraClasses="Content-Container pt-24 md:pt-28 pb-16 min-h-screen">
      <motion.div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-dashed border-black/20 pb-6 mb-8">
        {link && name && (
          <Title
            key="project-title"
            link={link}
            name={name}
            classes="hero-font-size text-4xl sm:text-5xl uppercase font-sohneHalbfett tracking-tighter"
          />
        )}
        {description && year && tags && (
          <motion.div className="flex gap-8 items-baseline" key="project-meta">
            <Dates year={year} key="project-year" />
            <Tags tags={tags} key="project-tags" />
          </motion.div>
        )}
      </motion.div>

      <Description description={description} key="project-description" />

      {media.length > 0 && (
        <motion.div
          key="project-images"
          className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-10 sepia-[10%]"
        >
          {media.map((item, index) => {
            const isVideo = item.endsWith(".mp4");
            return (
              <motion.button
                key={index}
                onClick={() => setSelected(item)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-square bg-[#f3f2ef] overflow-hidden group"
              >
                {isVideo ? (
                  <video
                    src={item}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className={`w-full h-full ${objectFitClass} grain transition-transform duration-500 ease-out group-hover:scale-105`}
                  />
                ) : (
                  <Image
                    src={item}
                    alt={name}
                    fill
                    priority={index < 2}
                    sizes="(max-width: 768px) 50vw, 33vw"
                    quality={85}
                    className={`${objectFitClass} grain transition-transform duration-500 ease-out group-hover:scale-105`}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>
      )}

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 bg-fullBlack/95 z-50 flex items-center justify-center cursor-pointer p-6"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl aspect-[4/3]"
            >
              {selected.endsWith(".mp4") ? (
                <video
                  src={selected}
                  autoPlay
                  loop
                  muted
                  controls
                  className="w-full h-full object-contain"
                />
              ) : (
                <Image src={selected} alt={name} fill className="object-contain" />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const project = data.find((p) => p.id.toString() === params.id);
  return {
    props: { project },
  };
}

export async function getStaticPaths() {
  const paths = data
    .filter((project) => !project.inProgress)
    .map((project) => ({
      params: { id: project.id.toString() },
    }));
  return {
    paths,
    fallback: false,
  };
}
