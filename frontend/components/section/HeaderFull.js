import React from "react";
import Co2 from "../icons/co2";
import { cloudinaryUrl } from "@/lib/helper";
import Image from "next/image";
import { parseEditorJS } from "@/lib/helper";

export const HeaderFull = ({
  coverPhotoUrl,
  cover,
  title,
  co2,
  minvh = "min-vh-100",
  maskClass = "mask bg-gradient-secondary opacity-0",
  subtitle,
  subtitleRTE,
  className = "",
  tags,
}) => {
  return (
    <div className={`page-header ${minvh} ${className}`}>
      <Image
        src={cloudinaryUrl(
          cover?.provider_metadata?.public_id || "",
          1920,
          1080
        )}
        // src={coverPhotoUrl}
        // width={1920}
        // height={1080}
        layout="fill"
        objectFit="cover"
        alt={title}
        quality={100}
      />

      <span className={maskClass}></span>
      <div className="container">
        <div className="row justify-content-center pt-2">
          <div className="col-lg-8 col-sm-9 text-center mx-auto">
            {co2 && (
              <div className="d-flex justify-content-center align-items-center">
                {" "}
                <Co2 className="icon icon-lg fill-white me-2" />
                <h3 className="text-white pb-0 mb-0">{co2}</h3>
              </div>
            )}
            {title && (
              <h1 className="text-white text-shadow-1 display-3 fw-bolder m-0">
                {title}
              </h1>
            )}
            {/* {cloudinaryUrl(
              cover?.provider_metadata?.public_id || "",
              1920,
              1080
            )} */}
            {subtitle && (
              <p className="lead text-white text-shadow-1 pt-sm-3 pt-2">
                {subtitle}
              </p>
            )}
            {subtitleRTE && (
              <p className="text-white text-shadow-1 pt-sm-3 pt-2">
                {parseEditorJS(subtitleRTE)}
              </p>
            )}
            {tags && (
              <div className="d-flex justify-content-center  pt-sm-2 pt-1">
                {tags.data.map((tag, index) => {
                  const { name } = tag.attributes;
                  return (
                    <div
                      key={index}
                      className="badge badge-primary badge-pill mx-1"
                    >
                      {name}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
