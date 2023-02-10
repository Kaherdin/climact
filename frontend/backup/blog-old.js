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
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { onlyUnique } from "@/lib/helper";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import QueryResult from "@/components/QueryResult";
import { NextSeo } from "next-seo";

export default function PostsPage({ pagePostList, global }) {
  const router = useRouter();

  //Page attributes
  const { read_more, posted_on, cover, title, subtitle } =
    pagePostList?.data?.attributes || "";
  const { filter, load_more } = global?.data?.attributes || "";
  const { url: coverPhotoUrl } = cover?.data?.attributes || 0;
  const coverInfo = cover?.data?.attributes || 0;

  //Pagination
  const [limit] = useState(10);
  const [start, setStart] = useState(0);
  const [total, setTotal] = useState(0);
  const model = "posts";

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

  //Tags
  const [tag, settag] = useState("");
  const { data: dataTags } = useQuery(TAGS);
  const activeTags = dataTags?.tags?.data.filter(
    (tag) => tag.attributes.posts.data.length > 0
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

  //Posts
  const { data, loading, error, refetch, fetchMore } = useQuery(
    POSTS_TAGS_PAGINATION,
    {
      variables: { locale: router.locale, start: 0, limit: limit, tag },
      onCompleted: () => {
        setTotal(data[model]?.meta?.pagination?.total);
      },
    }
  );
  const posts = data?.posts;

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
        subtitle={subtitle}
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
              className="active me-2 my-1"
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
                  className="me-2 my-1"
                  variant="outline-primary"
                ></Button>
              );
            })}
          </Col>
        </Row>
        <div className="row">
          <QueryResult error={error} loading={loading} data={posts}>
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
            {total > limit && !(start + limit >= total) && (
              <div className=" col-lg-9 col-12mb-4">
                <a className="link" onClick={handleMorePagination}>
                  {load_more}
                </a>
              </div>
            )}
          </QueryResult>
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

  return {
    props: {
      pagePostList,
      global,
    },
  };
}
