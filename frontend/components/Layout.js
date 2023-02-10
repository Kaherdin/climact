import KrNavbar from "./KrNavbar";
import { DefaultSeo } from "next-seo";
import { Footer } from "./section/Footer";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <DefaultSeo
        titleTemplate="CLIMACT - %s"
        openGraph={{
          type: "website",
          locale: router.locale,
          url: "https://www.climact.ch",
          site_name: "Climact",
        }}
      />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
