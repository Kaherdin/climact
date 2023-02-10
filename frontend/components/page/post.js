import React from "react";
import MemberSmall from "@/components/section/MemberSmall";
import Image from "next/image";
import { cloudinaryUrl } from "@/lib/helper";
import { formatDateMed, parseEditorJS } from "@/lib/helper";

export const PostContent = ({ post, pagePostList, locale, global }) => {
  if (!post) {
    return <div>Error...</div>;
  }
  const { attributes } = post || {};
  const { title, subtitle, content, cover, authors, experts, createdAt, tags } =
    attributes || "";

  const { public_id } = cover?.data?.attributes?.provider_metadata || "";

  const { posted_on } = pagePostList?.data?.attributes || "";
  const { experts: experts_title, authors: authors_title } =
    global?.data?.attributes || "";

  return (
    <>
      <header className="mt-7 mb-3">
        <div>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-7">
                <div className="d-flex justify-content-start flex-wrap">
                  {tags?.data?.length > 0 &&
                    tags.data.map((tag, index) => {
                      const { name } = tag.attributes;
                      return (
                        <div
                          key={index}
                          className="badge badge-primary badge-pill m-1"
                        >
                          {name}
                        </div>
                      );
                    })}
                </div>
                <h1 className="mb-0">{title}</h1>
                {subtitle && (
                  <>
                    <p
                      className="py-2 lead text-secondary-400"
                      style={{ maxHeight: "200px" }}
                    >
                      {subtitle}
                    </p>
                  </>
                )}

                <i className="text-gray-500">
                  {" "}
                  {createdAt &&
                    posted_on + " " + formatDateMed(createdAt, locale)}
                </i>

                {authors?.data?.length > 0 && (
                  <>
                    <h4 className="mb-0 mt-2">{authors_title}</h4>
                    {authors?.data?.map((author, index) => {
                      return <MemberSmall key={index} member={author} />;
                    })}
                  </>
                )}

                {experts?.data?.length > 0 && (
                  <>
                    <h4 className="mb-0  mt-2">{experts_title}</h4>
                    {experts.data.map((author, index) => {
                      return (
                        author && <MemberSmall key={index} member={author} />
                      );
                    })}
                  </>
                )}
              </div>
              <div className="col-lg-6 col-md-5 ms-auto text-end">
                {cover?.data && (
                  <Image
                    src={cloudinaryUrl(public_id, 600, 600)}
                    alt={title}
                    width={600}
                    height={600}
                    className="border-radius-lg img-fluid"
                  />
                )}
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </header>

      <div className="container bg-white">
        <div className="rounded-top py-4">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              {content && (
                <div className="mb-5">
                  <div className="text-justify">{parseEditorJS(content)}</div>{" "}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
