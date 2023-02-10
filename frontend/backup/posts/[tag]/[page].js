import { TAGS, POSTS_PAGINATION } from "@/lib/apollo-request";
import client from "@/context/Apollo";
import PostsPages, { getStaticProps } from "pages/blog-ssg";
export default PostsPages;
export { getStaticProps };

export async function getStaticPaths() {
  const { data: dataTags } = await client.query({
    query: TAGS,
  });
  const activeTags = dataTags?.tags?.data.filter(
    (tag) => tag.attributes.posts.data.length > 0
  );

  const locales = ["en", "fr"];

  const {
    data: { posts },
  } = await client.query({
    query: POSTS_PAGINATION,
    variables: {
      locale: "en",
      start: 0,
      limit: 10,
    },
  });

  const totalPages = posts?.meta?.pagination?.pageCount;

  const paths = [];
  for (let page = 1; page <= totalPages; page++) {
    locales.forEach((locale) => {
      activeTags?.map((tag) => {
        return paths.push({
          params: {
            tag: `${tag?.attributes?.name.toLowerCase()}`,
            page: `${page}`,
          },
          locale: locale,
        });
      });
      paths.push({
        params: {
          tag: `all`,
          page: `${page}`,
        },
        locale: locale,
      });
    });
  }

  return { paths, fallback: false };
}
