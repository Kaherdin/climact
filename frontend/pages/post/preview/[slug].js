import React from "react";
import { POST, PAGE_BLOG, GET_GLOBAL } from "@/lib/apollo-request";
import { NextSeo } from "next-seo";
import client from "@/context/Apollo";
import KrNavbar from "@/components/KrNavbar";
import { PostContent } from "@/components/page/post";

export default function PostPage({ post, pagePostList, locale, global }) {
  //SEO
  const { metaTitle, metaDescription, metaImage, keywords } =
    post?.attributes?.seo || "";
  const { url: metaImageUrl } = metaImage?.attributes || 0;

  //Slug language switcher helper
  const slug_fr = post?.attributes?.localizations.data.filter((post) =>
    post?.attributes?.locale.includes("fr")
  );
  const link_fr = slug_fr?.[0]?.attributes?.slug || "";

  const slug_en = post?.attributes?.localizations.data.filter((post) =>
    post?.attributes?.locale.includes("en")
  );
  const link_en = slug_en?.[0]?.attributes?.slug || "";

  return (
    <>
      <NextSeo
        title={metaTitle || post?.attributes?.title}
        description={metaDescription}
        keywords={keywords}
        noindex={true}
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
      <PostContent
        post={post}
        pagePostList={pagePostList}
        locale={locale}
        global={global}
      />
    </>
  );
}

export async function getServerSideProps({ params, locale }) {
  // Get slug post with locale
  const {
    data: { posts },
  } = await client.query({
    query: POST,
    variables: { locale: locale || "en", slug: params.slug },
    // fetchPolicy: "cache-and-network",
    fetchPolicy: "network-only",
  });

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
      post: posts.data[0],
      pagePostList,
      locale,
      global,
    },
  };
}
