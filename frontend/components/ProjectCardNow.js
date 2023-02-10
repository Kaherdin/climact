import React from "react";
import Link from "next/link";

// import { Image, Transformation } from "cloudinary-react";
import Image from "next/image";
import { cloudinaryUrl } from "@/lib/helper";
import MemberSmall from "./section/MemberSmall";

const ProjectCard = ({ project, simple }) => {
  const {
    id,
    attributes: {
      title,
      leaders,
      tags,
      subtitle,
      slug,
      cover,
      challenge,
      provider_metadata,
    },
  } = project;
  const { public_id } = provider_metadata || "";

  return (
    <>
      <Link href={`/project/${slug}`}>
        <a>
          <div className="card kr-card-background">
            {cover?.data && (
              <Image
                src={cloudinaryUrl(
                  cover?.data?.attributes?.provider_metadata?.public_id,
                  1000,
                  750
                )}
                alt={title}
                width={1000}
                height={750}
                className="rounded img-fluid"
              />
              // <Image
              //   alt={title}
              //   cloudName="climact"
              //   publicId={cover.data.attributes.provider_metadata.public_id}
              //   className="rounded img-fluid"
              // >
              //   <Transformation
              //     width="1000"
              //     height="750"
              //     crop="fill"
              //     gravity="auto"
              //   />
              // </Image>
            )}
            <span className="mask bg-gradient-dark opacity-4"></span>

            <div className="card-body glassmorphism-1 rounded">
              {/* //Todo: Sort by asc */}
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
              <h4 className="text-decoration-underline-hover">{title}</h4>
              {!simple && <p>{subtitle}</p>}
              {!simple && leaders.data.length > 0 && (
                <MemberSmall member={leaders.data[0]}></MemberSmall>
              )}
            </div>
          </div>
        </a>
      </Link>
    </>
  );
};

export default ProjectCard;
