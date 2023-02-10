import { TAGS, PROJECTS_PAGINATION } from "@/lib/apollo-request";
import client from "@/context/Apollo";
import ProjectPage, { getStaticProps } from "pages/projects-ssg";
export default ProjectPage;
export { getStaticProps };

export async function getStaticPaths() {
  const { data: dataTags } = await client.query({
    query: TAGS,
  });
  const activeTags = dataTags?.tags?.data.filter(
    (tag) => tag.attributes.projects.data.length > 0
  );

  const locales = ["en", "fr"];

  const {
    data: { projects },
  } = await client.query({
    query: PROJECTS_PAGINATION,
    variables: {
      locale: "en",
      start: 0,
      limit: 10,
    },
  });

  const totalPages = projects?.meta?.pagination?.pageCount;

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
