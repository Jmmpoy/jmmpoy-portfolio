
import { NextSeo } from "next-seo";
import HomeIndex from "@/components/homeIndex";

export default function Home() {
  return (
    <>
      <NextSeo
        title="Mpoy Jean-Marc — Développeur Front-End"
        description="Jean-Marc Mpoy est un développeur passionné par l'enrichissement de l'expérience utilisateur à travers des interfaces élégantes et interactives. Son travail en freelance avec une diversité de partenaires vise à maximiser l'engagement utilisateur."
      />

      <HomeIndex />
    </>
  );
}
