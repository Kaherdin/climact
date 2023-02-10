import React from "react";
import Link from "next/link";
// import { Image, Transformation } from "cloudinary-react";
import Image from "next/image";
import { cloudinaryUrl } from "@/lib/helper";
import Headroom from "react-headroom";

import KrButton from "./elements/KrButton";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { useRouter } from "next/router";

// Core Components

function KrNavbar({ type, global, link_fr, link_en }) {
  const router = useRouter();

  const { pathname } = router;
  const { nav_links, nav_buttons, logo } =
    global?.data?.attributes?.navbar || "";

  let navbarType = "";
  switch (type) {
    case "dark":
      navbarType = "bg-default navbar-dark";
      break;
    case "transparent":
      navbarType = "navbar-transparent";
      break;
    case "absolute":
      navbarType = "navbar-absolute glassmorphism-1";
      break;
    case "primary":
      navbarType = "bg-primary navbar-dark";
      break;
    case "white":
      navbarType = "bg-white";
      break;
    default:
      navbarType = "bg-white";
      break;
  }

  return (
    <>
      <Headroom disableInlineStyles>
        <header className="d-flex justify-content-center">
          <Navbar
            className={
              "kr-navbar navbar  blur blur-rounded top-0 border-bottom z-index-3 shadow mt-3 " +
              navbarType
            }
            collapseOnSelect
            expand="xl"
          >
            <Container fluid>
              <Navbar.Brand href="/">
                {logo && (
                  <Image
                    src={cloudinaryUrl(
                      logo?.data?.attributes?.provider_metadata?.public_id,
                      158,
                      25
                    )}
                    alt={logo?.data?.attributes?.alt || "Climact"}
                    width={158}
                    height={25}
                    className="img-fluid"
                  />
                  // <Image
                  //   cloudName="climact"
                  //   width="158"
                  //   height="25"
                  //   publicId={
                  //     logo?.data?.attributes?.provider_metadata?.public_id
                  //   }
                  //   // className="img-fluid"
                  // >
                  //   <Transformation
                  //     width="316"
                  //     height="50"
                  //     crop="fill"
                  //     gravity="auto"
                  //   />
                  // </Image>
                )}
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mx-auto">
                  {nav_links?.map((data, index) => {
                    const { title, link } = data;
                    return (
                      <Link key={index} href={link} passHref>
                        <Nav.Link
                          className={router.pathname == link ? "active" : ""}
                        >
                          {title}
                        </Nav.Link>
                      </Link>
                    );
                  })}
                </Nav>
                <Nav>
                  <Link href={`${link_en || pathname}`} locale="en" passHref>
                    <Nav.Link
                      className={`${
                        router?.locale == "en" ? "fw-bolder disabled" : ""
                      }`}
                    >
                      EN
                    </Nav.Link>
                  </Link>

                  <Link href={`${link_fr || pathname}`} locale="fr" passHref>
                    <Nav.Link
                      className={`${
                        router?.locale == "fr"
                          ? "fw-bolder  disabled me-4"
                          : "me-4"
                      }`}
                    >
                      FR
                    </Nav.Link>
                  </Link>
                </Nav>
                <Nav>
                  {nav_buttons?.map((data, index) => {
                    const { text, link, color, fa_icon } = data;
                    return (
                      <Link key={index} href={link} passHref>
                        <KrButton
                          color={color}
                          icon={fa_icon}
                          // rounded="default"
                          // size="lg"
                        >
                          {text}
                        </KrButton>
                      </Link>
                    );
                  })}
                </Nav>
                <div className="text-start p-2 mt-1 p-xl-0">
                  <a
                    href="https://twitter.com/ClimactSuisse"
                    target="_blank"
                    rel="noreferrer"
                    className="me-xl-4 me-4"
                  >
                    <span className="fab fa-twitter text-lg"></span>
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCqKm3bWI-8rQjpiOB_SG4yA"
                    rel="noreferrer"
                    target="_blank"
                    className="me-xl-4 me-4"
                  >
                    <span className="fab fa-youtube text-lg"></span>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/climactsuisse/about/"
                    rel="noreferrer"
                    target="_blank"
                    className=""
                  >
                    <span className="fab fa-linkedin text-lg"></span>
                  </a>
                </div>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
      </Headroom>
    </>
  );
}

export default KrNavbar;
