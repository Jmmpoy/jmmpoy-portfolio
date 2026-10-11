
import Container from "@/components/container";
import { fade } from "@/helpers/transitions";
import { motion } from "motion/react";
import Link from "next/link";

export default function Header() {
  const menuItems = [{ route: "JM.M", url: "/" }];

  return (
    <header
      className="fixed  w-full transition-colors duration-200 ease-out flex flex-col justify-center pt-2 z-10 h-12"
    >
      <Container extraClasses="Header-Section ">
        <motion.div className="flex flex-col  h-full sm:justify-between   sm:flex-row">
          <motion.nav
            variants={fade}
            initial="initial"
            animate="enter"
            exit="exit"
            className=" flex  md:flex items-center w-full  "
          >
            <motion.ul className=" flex space-x-2 self-center w-full">
              {menuItems.map(({ route, url }, index) => {
                return (
                  <motion.li
                    key={index}
                    className="text-xs uppercase"
                  >
                    <Link
                      scroll={false}
                      href={url}
                      className="relative tracking-tighter text-sm mix-blend-difference inline-block"
                    >
                      <p className=" uppercase text-sm font-sohneKraftig">{route}</p>
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
            <span className="w-full text-right font-neueBold text-sm tracking-[-0.04em]">{`© ${new Date().getFullYear()}`}</span>
          </motion.nav>
        </motion.div>
      </Container>
    </header>
  );
}
