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
import { useState } from "react";
import { useRouter } from "next/router";
import QueryResult from "@/components/QueryResult";
import { NextSeo } from "next-seo";

export default function ProjectPage({ pageProject, global }) {
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
  const [tag, settag] = useState("");
  const { data: dataTags } = useQuery(TAGS);
  const activeTags = dataTags?.tags?.data.filter(
    (tag) => tag.attributes.projects.data.length > 0
  );

  const handleFilter = (e, tag) => {
    const actives = document.querySelectorAll(".btn.active");
    actives.forEach((box) => {
      box.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    settag(tag);
    refetch({ tag: tag });
  };

  //Projects
  const { data, loading, error, refetch, fetchMore } = useQuery(
    PROJECTS_TAGS_PAGINATION,
    {
      variables: { locale: router.locale, start: 0, limit: limit, tag },
      onCompleted: () => {
        setTotal(data[model]?.meta?.pagination?.total);
      },
    }
  );
  const projects = data?.projects;

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
            <Button
              onClick={(e) => {
                handleFilter(e, "");
              }}
              className="me-2 my-1 active"
              as="input"
              type="button"
              value="All"
              variant="outline-primary"
              size="sm"
            ></Button>

            {activeTags?.map((tag, id) => {
              return (
                <Button
                  key={id}
                  as="input"
                  type="button"
                  value={tag.attributes.name}
                  onClick={(e) => {
                    handleFilter(e, tag.attributes.name);
                  }}
                  className="me-2 my-1"
                  variant="outline-primary"
                  size="sm"
                ></Button>
              );
            })}
          </Col>
        </Row>
        <div className="row gy-4 my-3 justify-content-center">
          <QueryResult error={error} loading={loading} data={projects}>
            {projects?.data?.map((project, id) => {
              return (
                <div key={id} className="col-lg-9 col-12 py-1">
                  <ProjectCard project={project} />
                </div>
              );
            })}
          </QueryResult>
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

export async function getStaticProps({ locale }) {
  // Get all posts with graphQL

  //Get single Page
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

  return {
    props: {
      pageProject: pageProject,
      global,
    },
  };
}
