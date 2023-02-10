// import { Image, Transformation } from "cloudinary-react";
import Image from "next/image";
import { cloudinaryUrl } from "@/lib/helper";

export default function Partner({ partner }) {
  const { link, logo } = partner.attributes;
  const { public_id } = logo.data.attributes.provider_metadata;

  return (
    <div className="col my-2">
      {logo && (
        <a href={link} target="_blank" rel="noreferrer">
          <Image
            src={cloudinaryUrl(public_id, 150, 75, "pad")}
            alt={logo?.data?.attributes?.alternativeText}
            width={150}
            height={75}
            className="img-fluid"
            layout="fixed"
          />
        </a>
      )}
    </div>
  );
}
