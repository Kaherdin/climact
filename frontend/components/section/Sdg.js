// import { Image, Transformation } from "cloudinary-react";
import Image from "next/image";
import { cloudinaryUrl } from "@/lib/helper";

export default function Sdg({ sdg }) {
  const { link, logo } = sdg.attributes;
  const { public_id } = logo.data.attributes.provider_metadata;
  return (
    <>
      {logo && (
        <a href={link} target="_blank" rel="noreferrer">
          <Image
            src={cloudinaryUrl(public_id, 64, 64)}
            alt={sdg.id}
            width={64}
            height={64}
            className="p-1"
          />
          {/* <Image
            alt={sdg.id}
            cloudName="climact"
            publicId={public_id}
            className="p-1"
            height="64"
            width="64"
          >
            <Transformation
              height="128"
              width="128"
              crop="fill"
              gravity="face"
              quality="auto:best"
              fetchFormat="auto"
            />
          </Image> */}
        </a>
      )}
    </>
  );
}
