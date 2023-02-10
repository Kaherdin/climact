import {
  PAGE_PROJECT,
  TAGS,
  PROJECTS_TAGS_PAGINATION,
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

export default function ProjectPage({
  pageProject,
  global,
  dataTags,
  projectsSSG,
}) {
  const router = useRouter();

  //Page attributes
  const { title, subtitle, cover, read_more } =
    pageProject?.data?.attributes || "";
  const { url: coverPhotoUrl } = cover?.data?.attributes || 0;
  const coverInfo = cover?.data?.attributes || 0;
  const { filter, load_more } = global?.data?.attributes || "";

  //Pagination
  const [limit] = useState(10);
  const [start, setStart] = useState(0);
  const [total, setTotal] = useState(0);
  const model = "projects";

  const handleMorePagination = () => {
    const nextStart = start + limit;
    setStart(nextStart);
    fetchMore({
      variables: {
        start: nextStart,
        limit: limit,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prevResult;
        }
        const prevData = prevResult[model].data;
        const moreData = fetchMoreResult[model].data;

        fetchMoreResult[model].data = [...prevData, ...moreData];
        return { ...fetchMoreResult };
      },
    });
  };

  //Filter & Tags
  const [currentTag, setCurrentTag] = useState("");

  const activeTags = dataTags?.tags?.data.filter(
    (tag) => tag.attributes.projects.data.length > 0
  );

  const handleFilter = (e, tag) => {
    // const actives = document.querySelectorAll(".btn.active");
    // actives.forEach((box) => {
    //   box.classList.remove("active");
    // });
    // e.currentTarget.classList.add("active");

    setCurrentTag(tag);
    setItemOffset(0);
  };

  //SEO
  const { metaTitle, metaDescription, metaImage, keywords } =
    pageProject?.data?.attributes?.seo || "";
  const { url: metaImageUrl } = metaImage?.data?.attributes || 0;

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredProjects = projectsSSG?.data?.filter((project) => {
    const projectTags = project.attributes.tags?.data.map(
      (tag) => tag.attributes.name
    );
    if (!currentTag) {
      return true;
    } else {
      return projectTags.includes(currentTag);
    }
  });

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredProjects?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProjects?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % projectsSSG?.data.length;
    setItemOffset(newOffset);
  };

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
          {currentItems &&
            currentItems.map((project, id) => {
              return (
                <div key={id} className="col-lg-9 col-12 py-1">
                  <ProjectCard project={project} />
                </div>
              );
            })}
          <div className="d-flex justify-content-center">
            <ReactPaginate
              onPageChange={handlePageClick}
              pageCount={pageCount}
              renderOnZeroPageCount={false}
              // forcePage={pageNumber}
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
          {total > limit && !(start + limit >= total) && (
            <div className=" col-lg-9 col-12 mb-4">
              <a className="link" onClick={handleMorePagination}>
                {load_more}
              </a>
            </div>
          )}
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

  // let currentTag;
  // if (params.tag === "all") {
  //   currentTag = "";
  // } else {
  //   currentTag = params?.tag;
  // }

  const {
    data: { projects },
  } = await client.query({
    query: PROJECTS_TAGS_PAGINATION,
    variables: { locale: locale || "en", start: 0, limit: 10, tag: "" },
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
      // tag: currentTag,
      dataTags,
      projectsSSG: projects,
    },
  };
}
