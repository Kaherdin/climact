import {
  GET_GLOBAL,
  PAGE_BLOG,
  TAGS,
  POSTS_TAGS_PAGINATION,
} from "@/lib/apollo-request";
import client from "@/context/Apollo";
import { HeaderFull } from "@/components/section/HeaderFull";

import KrNavbar from "@/components/KrNavbar";
import PostCard from "@/components/PostCard";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import QueryResult from "@/components/QueryResult";
import { NextSeo } from "next-seo";
import ReactPaginate from "react-paginate";

export default function PostsPage({ pagePostList, global, dataTags }) {
  const router = useRouter();

  //Page attributes
  const { cover, title, subtitle, subtitleRTE } =
    pagePostList?.data?.attributes || "";
  const { filter } = global?.data?.attributes || "";
  const { url: coverPhotoUrl } = cover?.data?.attributes || 0;
  const coverInfo = cover?.data?.attributes || 0;

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
    (tag) => tag.attributes.posts.data.length > 0
  );

  const handleFilter = (e, tag) => {
    setStart(0);
    setPageNumber(0);
    setCurrentTag(tag);
  };

  //Posts
  const { data, loading, error } = useQuery(POSTS_TAGS_PAGINATION, {
    variables: {
      locale: router.locale,
      start,
      limit: limit,
      tag: currentTag,
    },
  });
  const posts = data?.posts;

  //Recalculate page count for pagination & filter
  useEffect(() => {
    setTotal(posts?.meta?.pagination?.total);
    setPageCount(posts?.meta?.pagination?.pageCount);
  }, [posts]);

  //SEO
  const { metaTitle, metaDescription, metaImage, keywords } =
    pagePostList?.data?.attributes?.seo || "";
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
        className="pt-6"
        //maskClass="mask bg-gradient-multicolors opacity-5"
        minvh="min-vh-100"
        coverPhotoUrl={coverPhotoUrl}
        cover={coverInfo}
        title={title}
        subtitleRTE={subtitleRTE}
      />

      <Container className="mt-5">
        <Row className="my-3">
          <Col className="mx-auto mt-3" lg="9">
            <h5>{filter}</h5>
            <Button
              onClick={(e) => {
                handleFilter(e, "");
              }}
              size="sm"
              className={`me-2 my-1 ${!currentTag && "active"}`}
              as="input"
              type="button"
              value="All"
              variant="outline-primary"
            ></Button>

            {activeTags?.map((tag, id) => {
              return (
                <Button
                  size="sm"
                  key={id}
                  as="input"
                  type="button"
                  value={tag.attributes.name}
                  onClick={(e) => {
                    handleFilter(e, tag.attributes.name);
                  }}
                  className={`me-2 my-1 ${
                    currentTag.toLowerCase() ===
                      tag.attributes.name.toLowerCase() && "active"
                  }`}
                  variant="outline-primary"
                ></Button>
              );
            })}
          </Col>
        </Row>
        <div className="row">
          <QueryResult error={error} loading={loading} data={posts}>
            {/* <h4>{total} post found</h4> */}
            {posts?.data?.map((post, id) => {
              return (
                <div key={id} className="col-12 col mb-5">
                  <PostCard
                    pagePostList={pagePostList?.data?.attributes}
                    post={post}
                  />
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

export async function getStaticProps({ locale }) {
  const {
    data: { pagePostList },
  } = await client.query({
    query: PAGE_BLOG,
    variables: { locale: locale || "en" },
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

  return {
    props: {
      pagePostList,
      global,
      dataTags,
    },
  };
}
