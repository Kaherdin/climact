import {
  PAGE_PROJECT,
  TAGS,
  PROJECTS_TAGS_PAGINATION,
  GET_GLOBAL,
} from "@/lib/apollo-request";
import client from "@/context/Apollo";
import { HeaderFull } from "@/components/section/HeaderFull";
import { useQuery } from "@apollo/client";

import ProjectCard from "@/components/ProjectCardNow";
import { Container, Row, Col } from "react-bootstrap";
import KrNavbar from "@/components/KrNavbar";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import ReactPaginate from "react-paginate";
import QueryResult from "@/components/QueryResult";

export default function ProjectPage({ pageProject, global, dataTags }) {
  const router = useRouter();

  //Page attributes
  const { title, subtitleRTE, cover } = pageProject?.data?.attributes || "";
  const { url: coverPhotoUrl } = cover?.data?.attributes || 0;
  const coverInfo = cover?.data?.attributes || 0;
  const { filter } = global?.data?.attributes || "";

  //Pagination
  const [limit] = useState(10);
  const [start, setStart] = useState(0);
  const [total, setTotal] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  const handlePageClick = (event) => {
    setStart(event.selected * limit);
    setPageNumber(event.selected);
  };

  //Tags
  const [currentTag, setCurrentTag] = useState("");
  const activeTags = dataTags?.tags?.data.filter(
    (tag) => tag.attributes.projects.data.length > 0
  );

  const handleFilter = (e, tag) => {
    setStart(0);
    setPageNumber(0);
    setCurrentTag(tag);
  };

  //Posts
  const { data, loading, error } = useQuery(PROJECTS_TAGS_PAGINATION, {
    variables: {
      locale: router.locale,
      start,
      limit: limit,
      tag: currentTag,
    },
  });
  const projects = data?.projects;

  //Recalculate page count for pagination & filter
  useEffect(() => {
    setTotal(projects?.meta?.pagination?.total);
    setPageCount(projects?.meta?.pagination?.pageCount);
  }, [projects]);

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
        subtitleRTE={subtitleRTE}
      />

      <Container className="header-not-transparent">
        <Row className="my-3">
          <Col className="mx-auto mt-3" lg="9">
            <h5>{filter}</h5>

            <Button
              onClick={(e) => {
                handleFilter(e, "");
              }}
              className={`me-2 my-1 ${!currentTag && "active"}`}
              variant="outline-primary"
              size="sm"
            >
              All
            </Button>

            {activeTags?.map((tag, id) => {
              return (
                <Button
                  key={id}
                  onClick={(e) => {
                    handleFilter(e, tag.attributes.name);
                  }}
                  className={`me-2 my-1 ${
                    currentTag.toLowerCase() ===
                      tag.attributes.name.toLowerCase() && "active"
                  }`}
                  variant="outline-primary"
                  size="sm"
                >
                  {tag.attributes.name}
                </Button>
              );
            })}
          </Col>
        </Row>
        <div className="row gy-4 my-3 justify-content-center">
          <QueryResult error={error} loading={loading} data={projects}>
            {/* <h4>{total} project found</h4> */}
            {projects?.data?.map((project, id) => {
              return (
                <div key={id} className="col-lg-9 col-12 py-1">
                  <ProjectCard project={project} />
                </div>
              );
            })}
          </QueryResult>
        </div>
        <div className="d-flex justify-content-center">
          <ReactPaginate
            onPageChange={handlePageClick}
            pageCount={pageCount}
            renderOnZeroPageCount={false}
            forcePage={pageNumber}
            nextLabel=">"
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
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
          />
        </div>
      </Container>
    </>
  );
}

export async function getStaticProps({ params, locale }) {
  //Get single Page
  const {
    data: { pageProject },
  } = await client.query({
    query: PAGE_PROJECT,
    variables: { locale },
  });

  const { data: dataTags } = await client.query({
    query: TAGS,
  });

  const {
    data: { global },
  } = await client.query({
    query: GET_GLOBAL,
    variables: { locale: locale || "en" },
  });

  return {
    props: {
      pageProject: pageProject,
      global,
      dataTags,
    },
  };
}
