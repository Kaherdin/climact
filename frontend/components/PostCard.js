import React from "react";
import Link from "next/link";
import { truncateWithEllipses } from "@/lib/helper";

// import { Image, Transformation } from "cloudinary-react";
import Image from "next/image";
import { cloudinaryUrl } from "@/lib/helper";
import MemberSmall from "./section/MemberSmall";
import { Button } from "react-bootstrap";
import { formatDateMed } from "@/lib/helper";
import { useRouter } from "next/router";

const PostCard = ({ post, pagePostList }) => {
  const {
    id,
    attributes: {
      title,
      content,
      createdAt,
      subtitle,
      excerpt,
      slug,
      authors,
      experts,
      cover,
      tags,
    },
  } = post;
  const { public_id } = cover?.data?.attributes?.provider_metadata || "";
  const { posted_on, read_more } = pagePostList || "";

  const router = useRouter();
  const locale = router.locale;

  return (
    <>
      <div className="card card-plain">
        <div className="row align-items-top">
          <div className="col-md-4">
            <Link href={`/post/${slug}`}>
              <a>
                <div className="card-image position-relative border-radius-lg d-flex ">
                  {cover?.data && (
                    <Image
                      src={cloudinaryUrl(public_id, 600, 600)}
                      alt={title}
                      width={600}
                      height={600}
                      className="border-radius-lg img-fluid"
                    />
                    // <Image
                    //   alt={title}
                    //   cloudName="climact"
                    //   publicId={public_id}
                    //   className="border-radius-lg img-fluid"
                    // >
                    //   <Transformation
                    //     width="600"
                    //     height="600"
                    //     crop="fill"
                    //     gravity="auto"
                    //   />
                    // </Image>
                  )}
                </div>
              </a>
            </Link>
          </div>
          <div className="col-md-8">
            <div className="p-3">
              {tags.data.map((tag, id) => {
                const { name } = tag.attributes;
                return (
                  <div
                    key={id}
                    className="badge badge-primary badge-pill me-2 mb-2"
                  >
                    {name}
                  </div>
                );
              })}
              <Link href={`/post/${slug}`}>
                <a>
                  <h3>
                    <span className="text-dark font-weight-normal">
                      {title}
                    </span>
                  </h3>
                </a>
              </Link>
              {excerpt && (
                <>
                  <p className="pb-0 mb-0" style={{ maxHeight: "200px" }}>
                    {truncateWithEllipses(excerpt, 300)}
                  </p>
                </>
              )}

              <div>
                <i className="text-gray-500">
                  {" "}
                  {createdAt &&
                    posted_on + " " + formatDateMed(createdAt, locale)}
                </i>
              </div>

              {experts?.data?.length > 0 && (
                <>
                  {/* <h4 className="mb-0  mt-2">{experts_title}</h4> */}
                  {experts.data.map((author, index) => {
                    return (
                      author && <MemberSmall key={index} member={author} />
                    );
                  })}
                </>
              )}

              {/* {authors.data.length > 0 && (
                <div className="pt-2">
                  <MemberSmall member={authors.data[0]}></MemberSmall>
                </div>
              )} */}
              <Link href={`/post/${slug}`}>
                <a>
                  <Button className="mt-3" variant="primary">
                    {read_more}
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
