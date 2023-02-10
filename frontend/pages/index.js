import client from "@/context/Apollo";
import {
  POSTS_TAGS_PAGINATION,
  PAGE_HOME,
  PAGE_EVENT,
  PAGE_PROJECT,
  PROJECTS_TAGS_PAGINATION,
  NEXT_EVENTS_PAGINATION,
  PAGE_BLOG,
  GET_GLOBAL,
} from "@/lib/apollo-request";
import { NextSeo } from "next-seo";
import KrNavbar from "@/components/KrNavbar";
import { HeaderFull } from "@/components/section/HeaderFull";
import { parseEditorJS } from "@/lib/helper";
import ProjectCard from "@/components/ProjectCardNow";
import PostCard from "@/components/PostCard";
import EventCard from "@/components/EventCard";

import { DateTime } from "luxon";
import KrButton from "@/components/elements/KrButton";
import Link from "next/link";
import { useRouter } from "next/router";

const Index = ({
  pageHome,
  global,
  projects,
  posts,
  events,
  pageEvent,
  pageProject,
  pagePostList,
}) => {
  const router = useRouter();
  const {
    title,
    cover,
    about,
    events_title,
    posts_title,
    projects_title,
    subtitleRTE,
    visit_social,
  } = pageHome?.data?.attributes || "";
  const { url: coverPhotoUrl } = cover?.data?.attributes || 0;
  const coverInfo = cover?.data?.attributes || 0;

  //SEO
  const { metaTitle, metaDescription, metaImage, keywords } =
    pageHome?.data?.attributes?.seo || "";
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
        minvh="min-vh-100"
        coverPhotoUrl={coverPhotoUrl}
        cover={coverInfo}
        title={title}
        subtitleRTE={subtitleRTE}
      />
      <div className="container header-not-transparent bidoum-ahhh">
        <div className="row py-5 justify-content-center">
          <div className="col-12 col-lg-8">
            {about && (
              <div className="mb-3">
                <div className="text-justify">{parseEditorJS(about)}</div>
              </div>
            )}
          </div>
        </div>
        {/* BLOG */}
        <div className="row py-5 justify-content-center">
          <div className="col-12 col-lg-8">
            {posts_title && (
              <div className="mb-3">
                <div className="text-center">{parseEditorJS(posts_title)}</div>
              </div>
            )}
          </div>
        </div>
        <div className="row justify-content-center">
          {posts?.data?.map((post, id) => {
            return (
              <div key={post.id} className="col-12 col-lg-8 col mb-5">
                <PostCard
                  post={post}
                  pagePostList={pagePostList?.data?.attributes}
                />
              </div>
            );
          })}
          <div className="col-12 col-lg-8 text-center">
            <Link href={`${router.locale}/blog`}>
              <a>
                <KrButton className="mt-n1 mb-3" variant="primary">
                  {pagePostList?.data?.attributes?.view_all_btn}
                </KrButton>
              </a>
            </Link>
          </div>
        </div>
        {/* EVENTS */}
        {events?.data?.length > 0 && (
          <>
            <div className="row py-5 justify-content-center">
              <div className="col-12 col-lg-8">
                {events_title && (
                  <div className="mb-3">
                    <div className="text-justify">
                      {parseEditorJS(events_title)}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="row justify-content-center">
              {events?.data?.map((event, id) => {
                return (
                  <div key={id} className="col-12 col-lg-8 col mb-5">
                    <EventCard
                      pageEvent={pageEvent?.data?.attributes}
                      event={event}
                    />
                  </div>
                );
              })}
              <div className="col-12 col-lg-8 text-center">
                <Link href={`${router.locale}/events`}>
                  <a>
                    <KrButton className="mt-n1 mb-3" variant="primary">
                      {pageEvent?.data?.attributes?.view_all_btn}
                    </KrButton>
                  </a>
                </Link>
              </div>
            </div>
          </>
        )}
        {/* PROJECTS */}
        <div className="row py-5 justify-content-center">
          <div className="col-12 col-lg-8">
            {projects_title && (
              <div className="mb-3">
                <div className="text-center">
                  {parseEditorJS(projects_title)}
                </div>
              </div>
            )}
            <div className="row gy-2 justify-content-center">
              {projects.data.map((project, id) => {
                return (
                  <div key={id} className="col-lg-6 col-xl-6 col-12 py-3">
                    <ProjectCard project={project} simple />
                  </div>
                );
              })}
              <div className="col-12 col-lg-8 text-center">
                <Link href={`${router.locale}/projects`}>
                  <a>
                    <KrButton className="mt-n1 mb-3" variant="primary">
                      {pageProject?.data?.attributes?.view_all_btn}
                    </KrButton>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* SOCIAL */}
        <div className="row py-5 justify-content-center">
          <div className="col-12 col-lg-8 text-center mb-2">
            <h3>{visit_social}</h3>

            <a
              href="https://twitter.com/ClimactSuisse"
              target="_blank"
              rel="noreferrer"
            >
              <span className="text-primary m-4 fab fa-4x fa-twitter"></span>
            </a>
            <a
              href="https://www.youtube.com/channel/UCqKm3bWI-8rQjpiOB_SG4yA"
              target="_blank"
              rel="noreferrer"
            >
              <span className="text-primary m-4 fab fa-youtube fa-4x"></span>
            </a>
            <a
              href="https://www.linkedin.com/company/climactsuisse/about/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="text-primary m-4 fab fa-linkedin fa-4x"></span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps({ locale }) {
  const {
    data: { global },
  } = await client.query({
    query: GET_GLOBAL,
    variables: { locale: locale || "en" },
  });

  const now = DateTime.now().toISO();
  const {
    data: { posts },
  } = await client.query({
    query: POSTS_TAGS_PAGINATION,
    variables: { locale: locale || "en", start: 0, limit: 3, tag: "" },
  });

  const {
    data: { events },
  } = await client.query({
    query: NEXT_EVENTS_PAGINATION,
    variables: {
      locale: locale || "en",
      start: 0,
      limit: 3,
      now: now,
    },
  });

  const {
    data: { projects },
  } = await client.query({
    query: PROJECTS_TAGS_PAGINATION,
    variables: { locale: locale || "en", start: 0, limit: 4, tag: "" },
  });

  const {
    data: { pageEvent },
  } = await client.query({
    query: PAGE_EVENT,
    variables: { locale: locale || "en" },
  });

  const {
    data: { pageProject },
  } = await client.query({
    query: PAGE_PROJECT,
    variables: { locale: locale || "en" },
  });

  const {
    data: { pagePostList },
  } = await client.query({
    query: PAGE_BLOG,
    variables: { locale: locale || "en" },
  });

  //Get single Page
  const {
    data: { pageHome },
  } = await client.query({
    query: PAGE_HOME,
    variables: { locale: locale || "en" },
  });

  return {
    props: {
      pageHome,
      global,
      pageEvent,
      pageProject,
      projects,
      pagePostList,
      posts,
      events,
    },
  };
}

export default Index;
