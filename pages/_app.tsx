import "@/styles/main.css";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import Header from "@/components/header/header";
import SEO from "@/helpers/seo.config";

export default function App({ Component, pageProps }: { Component: any; pageProps: any }) {
  const router = useRouter();

  return (
    <>
      <DefaultSeo {...SEO} />
      <Header />
      <Component {...pageProps} key={router.asPath} />
    </>
  );
}
