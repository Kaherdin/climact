import {
  PROJECT,
  PAGE_PROJECT,
  PROJECTS,
  GET_GLOBAL,
} from "@/lib/apollo-request";
import { NextSeo } from "next-seo";
import client from "@/context/Apollo";
import KrNavbar from "@/components/KrNavbar";
import { HeaderFull } from "@/components/section/HeaderFull";
import { ProjectContent } from "@/components/page/project";

export default function ProjectPage({ project, pageProject, global }) {
  if (!project) {
    return <div>Error...</div>;
  }

  const { attributes } = project;
  const { title, subtitle, tags, co2, cover } = attributes;

  const { url: coverPhotoUrl } = cover?.data?.attributes || 0;
  const coverInfo = cover?.data?.attributes || 0;

  //Slug language switcher helper
  const slug_fr = project?.attributes?.localizations.data.filter((project) =>
    project?.attributes?.locale.includes("fr")
  );
  const link_fr = slug_fr?.[0]?.attributes?.slug;

  const slug_en = project?.attributes?.localizations.data.filter((project) =>
    project?.attributes?.locale.includes("en")
  );
  const link_en = slug_en[0]?.attributes?.slug;

  //SEO
  const { metaTitle, metaDescription, metaImage, keywords } =
    project?.attributes?.seo || "";
  const { url: metaImageUrl } = metaImage?.attributes || 0;

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
      <KrNavbar
        type="absolute"
        global={global}
        link_fr={link_fr}
        link_en={link_en}
      />
      <HeaderFull
        minvh="min-vh-100"
        coverPhotoUrl={coverPhotoUrl}
        cover={coverInfo}
        title={title}
        subtitle={subtitle}
        tags={tags}
        co2={co2}
        //maskClass="mask bg-gradient-secondary opacity-3"
      />
      <ProjectContent project={project} pageProject={pageProject} />
    </>
  );
}

export async function getServerSideProps({ params, locale }) {
  const {
    data: { global },
  } = await client.query({
    query: GET_GLOBAL,
    variables: { locale: locale || "en" },
  });

  // Get post by slug
  const {
    data: { projects },
  } = await client.query({
    query: PROJECT,
    variables: { locale: locale || "en", slug: params.slug },
    fetchPolicy: "network-only",
  });

  //Get single Page
  const {
    data: { pageProject },
  } = await client.query({
    query: PAGE_PROJECT,
    variables: { locale: locale || "en" },
  });

  return {
    props: {
      pageProject: pageProject,
      project: projects?.data?.[0],
      global,
    },
  };
}
