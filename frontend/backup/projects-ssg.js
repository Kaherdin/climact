import {
  PAGE_PROJECT,
  TAGS,
  PROJECTS_TAGS_PAGINATION,
  PROJECTS_PAGINATION,
  GET_GLOBAL,
} from "@/lib/apollo-request";
import client from "@/context/Apollo";
import { HeaderFull } from "@/components/section/HeaderFull";
import { useQuery } from "@apollo/client";
import Link from "next/link";

import ProjectCard from "@/components/ProjectCardNow";
import { Container, Row, Col } from "react-bootstrap";
import KrNavbar from "@/components/KrNavbar";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import ReactPaginate from "react-paginate";

// import about, { getStaticProps } from "pages/about";
// export default about;
// export { getStaticProps };

export default function ProjectsPage({
  pageProject,
  global,
  dataTags,
  currentTag,
  projects,
  pageNumber,
}) {
  const router = useRouter();

  //Page attributes
  const { title, subtitle, cover, read_more } =
    pageProject?.data?.attributes || "";
  const { url: coverPhotoUrl } = cover?.data?.attributes || 0;
  const coverInfo = cover?.data?.attributes || 0;
  const { filter, load_more } = global?.data?.attributes || "";

  //Filter & Tags
  const activeTags = dataTags?.tags?.data.filter(
    (tag) => tag.attributes.projects.data.length > 0
  );

  //Pagination
  const pageCount = projects?.meta?.pagination?.pageCount;
  const handlePageClick = (event) => {
    const url = `/projects/${currentTag}/${event.selected + 1}`;
    // router.push(url, undefined, { scroll: false });
    router.push(url);
  };

  //SEO
  const { metaTitle, metaDescription, metaImage, keywords } =
    pageProject?.data?.attributes?.seo || "";
  const { url: metaImageUrl } = metaImage?.data?.attributes || 0;

  return (
    <>
      <NextSeo
        title={metaTitle || title}
        description={metaDescription}
        keywords={keywords}
        openGraph={{
          title: metaTitle,
          description: metaDescription,
          images: [
            {
              url: metaImageUrl,
            },
          ],
        }}
      />
      <KrNavbar type="absolute" global={global} />

      <HeaderFull
        className="pt-7"
        //maskClass="mask bg-gradient-multicolors opacity-5"
        minvh="min-vh-100"
        coverPhotoUrl={coverPhotoUrl}
        cover={coverInfo}
        title={title}
        subtitle={subtitle}
      />

      <Container className="header-not-transparent">
        <Row className="my-3">
          <Col className="mx-auto mt-3" lg="9">
            <h5>{filter}</h5>
            <Link
              href={`/projects/all/1`}
              as={`/projects/all/1`}
              scroll={false}
            >
              <a>
                <Button
                  className={`me-2 my-1 ${
                    currentTag.toLowerCase() === "all" && "active"
                  }`}
                  variant="outline-primary"
                  size="sm"
                >
                  All
                </Button>
              </a>
            </Link>

            {activeTags?.map((tag, id) => {
              return (
                <Link
                  href={`/projects/${tag.attributes.name.toLowerCase()}/1`}
                  as={`/projects/${tag.attributes.name.toLowerCase()}/1`}
                  scroll={false}
                  key={id}
                >
                  <a>
                    <Button
                      key={id}
                      className={`me-2 my-1 ${
                        currentTag.toLowerCase() ===
                          tag.attributes.name.toLowerCase() && "active"
                      }`}
                      variant="outline-primary"
                      size="sm"
                    >
                      {tag.attributes.name}
                    </Button>
                  </a>
                </Link>
              );
            })}
          </Col>
        </Row>
        <div className="row gy-4 my-3 justify-content-center">
          {projects?.data?.map((project, id) => {
            return (
              <div key={id} className="col-lg-9 col-12 py-1">
                <ProjectCard project={project} />
              </div>
            );
          })}
          <div className="d-flex justify-content-center">
            <ReactPaginate
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              pageCount={pageCount}
              previousLabel="<"
              pageClassName="page-item px-1"
              pageLinkClassName="page-link px-1 "
              previousClassName="page-item px-1"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
              forcePage={pageNumber}
            />
          </div>
        </div>
      </Container>
    </>
  );
}

export async function getStaticProps({ params, locale }) {
  const {
    data: { pageProject },
  } = await client.query({
    query: PAGE_PROJECT,
    variables: { locale },
  });

  const {
    data: { global },
  } = await client.query({
    query: GET_GLOBAL,
    variables: { locale: locale || "en" },
  });

  const { data: dataTags } = await client.query({
    query: TAGS,
  });

  const limit = 10;
  const pageNumber = params?.page - 1;
  let currentTag;
  let projects;
  if (!params || params?.tag === "all") {
    currentTag = "all";
    ({
      data: { projects },
    } = await client.query({
      query: PROJECTS_PAGINATION,
      variables: {
        locale: locale || "en",
        start: pageNumber * limit,
        limit: limit,
      },
    }));
  } else {
    currentTag = params?.tag;
    ({
      data: { projects },
    } = await client.query({
      query: PROJECTS_TAGS_PAGINATION,
      variables: {
        locale: locale || "en",
        start: pageNumber * limit,
        limit: limit,
        tag: currentTag,
      },
    }));
  }

  return {
    props: {
      pageProject,
      global,
      currentTag,
      dataTags,
      projects,
      pageNumber: pageNumber || 0,
    },
  };
}
