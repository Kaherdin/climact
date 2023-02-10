import {
  GET_GLOBAL,
  PAGE_BLOG,
  TAGS,
  POSTS_TAGS_PAGINATION,
  POSTS_PAGINATION,
} from "@/lib/apollo-request";
import client from "@/context/Apollo";
import { HeaderFull } from "@/components/section/HeaderFull";
import Link from "next/link";

import PostCard from "@/components/PostCard";
import { Container, Row, Col } from "react-bootstrap";
import KrNavbar from "@/components/KrNavbar";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import ReactPaginate from "react-paginate";

// import about, { getStaticProps } from "pages/about";
// export default about;
// export { getStaticProps };

export default function PostsPage({
  pagePostList,
  global,
  dataTags,
  currentTag,
  posts,
  pageNumber,
}) {
  const router = useRouter();

  //Page attributes
  const { title, subtitle, cover, read_more } =
    pagePostList?.data?.attributes || "";
  const { url: coverPhotoUrl } = cover?.data?.attributes || 0;
  const coverInfo = cover?.data?.attributes || 0;
  const { filter, load_more } = global?.data?.attributes || "";

  //Filter & Tags
  const activeTags = dataTags?.tags?.data.filter(
    (tag) => tag.attributes.posts.data.length > 0
  );

  //Pagination
  const pageCount = posts?.meta?.pagination?.pageCount;
  const handlePageClick = (event) => {
    const url = `/posts/${currentTag}/${event.selected + 1}`;
    router.push(url);
  };

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
        className="pt-7"
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
            <Link href={`/posts/all/1`} as={`/posts/all/1`} scroll={false}>
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
                  href={`/posts/${tag.attributes.name.toLowerCase()}/1`}
                  as={`/posts/${tag.attributes.name.toLowerCase()}/1`}
                  scroll={false}
                  rel="noreferrer"
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

  const limit = 10;
  const pageNumber = params?.page - 1;
  let currentTag;
  let posts;
  if (!params || params?.tag === "all") {
    currentTag = "all";
    ({
      data: { posts },
    } = await client.query({
      query: POSTS_PAGINATION,
      variables: {
        locale: locale || "en",
        start: pageNumber * limit,
        limit: limit,
      },
    }));
  } else {
    currentTag = params?.tag;
    ({
      data: { posts },
    } = await client.query({
      query: POSTS_TAGS_PAGINATION,
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
      pagePostList,
      global,
      currentTag,
      dataTags,
      posts,
      pageNumber: pageNumber || 0,
    },
  };
}
