import React from "react";
import { EVENT, EVENTS, PAGE_EVENT, GET_GLOBAL } from "@/lib/apollo-request";

import { NextSeo } from "next-seo";

import client from "@/context/Apollo";

import KrNavbar from "@/components/KrNavbar";
import { EventContent } from "@/components/page/event";

export default function EventPage({ event, pageEvent, global }) {
  //Slug language switcher helper
  const slug_fr = event?.attributes?.localizations.data.filter((event) =>
    event?.attributes?.locale.includes("fr")
  );
  const link_fr = slug_fr?.[0]?.attributes?.slug;

  const slug_en = event?.attributes?.localizations.data.filter((event) =>
    event?.attributes?.locale.includes("en")
  );
  const link_en = slug_en?.[0]?.attributes?.slug;

  //SEO
  const { metaTitle, metaDescription, metaImage, keywords } =
    event?.attributes?.seo || "";
  const { url: metaImageUrl } = metaImage?.attributes || 0;

  return (
    <>
      <NextSeo
        title={metaTitle || event?.attributes?.title}
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
      <KrNavbar global={global} link_fr={link_fr} link_en={link_en} />
      <EventContent event={event} pageEvent={pageEvent} global={global} />
    </>
  );
}

export async function getStaticPaths() {
  const {
    data: { events },
  } = await client.query({
    query: EVENTS,
    variables: { locale: "all" },
  });

  const paths = [];
  events?.data?.map((event) => {
    return paths.push({
      params: { slug: `${event?.attributes?.slug}` },
      locale: `${event?.attributes?.locale}`,
    });
  });

  return { paths, fallback: true };
}

export async function getStaticProps({ params, locale }) {
  const {
    data: { global },
  } = await client.query({
    query: GET_GLOBAL,
    variables: { locale: locale || "en" },
  });
  // Get all events with graphQL
  const {
    data: { events },
  } = await client.query({
    query: EVENT,
    variables: { locale: locale || "en", slug: params.slug },
    // fetchPolicy: "network-only",
  });

  const {
    data: { pageEvent },
  } = await client.query({
    query: PAGE_EVENT,
    variables: { locale: locale || "en" },
  });

  return {
    props: {
      event: events.data[0],
      pageEvent,
      global,
    },
  };
}
