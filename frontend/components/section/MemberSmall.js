// import { Image, Transformation } from "cloudinary-react";
import Image from "next/image";
import { cloudinaryUrl } from "@/lib/helper";
import SocialList from "../SocialList";

export default function MemberSmall({
  member,
  size = "48",
  jobTitle,
  affliation,
  social,
  titleSize,
  types,
  tags,
  ...props
}) {
  const {
    email,
    title,
    name,
    surname,
    affiliation_uni,
    affiliation_fac,
    avatar,
    website_link,
    twitter,
    linkedin,
    job_title,
  } = member?.attributes || "";
  const { public_id } = avatar?.data?.attributes?.provider_metadata || "";

  return (
    <div className="my-2">
      <div className="d-flex align-items-top">
        <div className="pe-3">
          {avatar?.data && (
            <>
              {website_link ? (
                <a href={website_link} target="_blank" rel="noreferrer">
                  <Image
                    src={cloudinaryUrl(public_id, size, size)}
                    alt={title}
                    width={size}
                    height={size}
                    className="rounded-4"
                    layout="fixed"
                  />
                  {/* <Image
                    alt={title}
                    cloudName="climact"
                    publicId={public_id}
                    className="rounded-4"
                    height={size}
                    width={size}
                  >
                    <Transformation
                      height="256"
                      width="256"
                      crop="fill"
                      gravity="face"
                      quality="auto"
                      fetchFormat="auto"
                    />
                  </Image> */}
                </a>
              ) : (
                <Image
                  src={cloudinaryUrl(public_id, size, size)}
                  alt={title}
                  width={size}
                  height={size}
                  className="rounded-4"
                  layout="fixed"
                />
                // <Image
                //   alt={title}
                //   cloudName="climact"
                //   publicId={public_id}
                //   className="rounded-4"
                //   height={size}
                //   width={size}
                // >
                //   <Transformation
                //     height="256"
                //     width="256"
                //     crop="fill"
                //     gravity="face"
                //     quality="auto"
                //     fetchFormat="auto"
                //   />
                // </Image>
              )}
            </>
          )}
        </div>
        <div>
          <span>
            {types &&
              types.data.map((type, id) => {
                return (
                  <div
                    key={id}
                    className="badge badge-primary badge-pill me-2 mb-2"
                  >
                    {type.attributes.title}
                  </div>
                );
              })}
            {tags &&
              tags.data.map((tag, id) => {
                return (
                  <div
                    key={id}
                    className="badge badge-primary badge-pill me-2 mb-2"
                  >
                    {tag.attributes.name}
                  </div>
                );
              })}
            <h6 className={`m-0 ${(titleSize === "lg" && "h5") || "h6"}`}>
              {title && title}
              {` ${name} ${surname}`}
            </h6>
            <p className="text-secondary-400 p-0 m-0">
              {job_title} {affiliation_uni} {affiliation_fac}
            </p>
          </span>
          {social && (
            <SocialList
              twitter={twitter}
              linkedin={linkedin}
              website_link={website_link}
              email={email}
            />
          )}
        </div>
      </div>
    </div>
  );
}
