// import { Image, Transformation } from "cloudinary-react";
import Image from "next/image";
import { cloudinaryUrl } from "@/lib/helper";
import SocialList from "../SocialList";

export default function MemberCard({
  member,
  socialBottom,
  socialLeft,
  width = "460",
  height = "320",
  className = "card card-profile",
  imgClass = "shadow-lg rounded-4 rounded-bottom img-fluid",
}) {
  const {
    email,
    biography,
    title,
    name,
    surname,
    affiliation_uni,
    affiliation_fac,
    avatar,
    twitter,
    linkedin,
    website_link,
    job_title,
  } = member?.attributes || "";
  const { public_id } = avatar?.data?.attributes?.provider_metadata || "";
  return (
    <div className={className}>
      <div className="align-self-center align-self-lg-start">
        {avatar?.data && (
          <Image
            src={cloudinaryUrl(public_id, width, height)}
            alt="UNIL"
            width={width}
            height={height}
            className={imgClass}
          />
          // <Image
          //   alt={title}
          //   cloudName="climact"
          //   publicId={public_id}
          //   className={imgClass}
          // >
          //   <Transformation
          //     width={width}
          //     height={height}
          //     crop="fill"
          //     gravity="auto"
          //     quality="auto"
          //     fetchFormat="auto"
          //   />
          // </Image>
        )}
        {socialLeft && (
          <SocialList
            twitter={twitter}
            linkedin={linkedin}
            website_link={website_link}
            email={email}
            size="lg"
          />
        )}
      </div>

      <div className="card-body px-2 py-3">
        <div className="ps-3">
          <h5 className="mb-0 text-secondary-600">
            {title && title} {`${name} ${surname}`}
          </h5>
          <p className="text-secondary-400 p-0 m-0">
            {job_title} {affiliation_uni} {affiliation_fac}
          </p>
          {biography && (
            <p className="pt-2 text-secondary-700">
              <em>{biography}</em>
            </p>
          )}

          {socialBottom && (
            <SocialList
              twitter={twitter}
              linkedin={linkedin}
              website_link={website_link}
              email={email}
              size="lg"
            />
          )}
        </div>
      </div>
    </div>
  );
}
