import Partner from "@/components/section/Partner";
import MemberSmall from "@/components/section/MemberSmall";
import Sdg from "@/components/section/Sdg";
import { parseEditorJS } from "@/lib/helper";

import ActNow from "@/components/section/ActNow";
import Gallery from "react-grid-gallery";

export const ProjectContent = ({ project, pageProject }) => {
  if (!project) {
    return <div>Error...</div>;
  }
  const {
    challenge_title,
    leader_title,
    collaborator_title,
    milestone_title,
    funding_title,
    gallery_title,
    objective_title,
    links_documents_title,
    partner_title,
    output_title,
    sdg_title,
  } = pageProject?.data?.attributes?.project_categories || "";
  const { id, attributes } = project;
  const {
    funding,

    output,
    docs_links,
    milestones,
    gallery,
    leaders,
    collaborators,
    partners,
    objective,
    sdgs,

    challenge,
  } = attributes;

  const galleryImages = [];
  {
    gallery?.data.map((image, index) => {
      const { thumbnail, large } = image.attributes.formats;
      galleryImages.push({
        src: large?.url,
        thumbnail: thumbnail?.url,
        thumbnailWidth: thumbnail?.width,
        thumbnailHeight: thumbnail?.height,
      });
    });
  }

  return (
    <>
      <div className="container bg-white">
        <div className="rounded-top py-4">
          <div className="row">
            {/* Left side */}
            <div className="col-12 col-lg-8  order-sm-1 order-2">
              {challenge && (
                <div className="mb-5">
                  <h4>{challenge_title}</h4>

                  <div className="text-justify">{parseEditorJS(challenge)}</div>
                </div>
              )}
              {objective && (
                <div className="mb-3">
                  <div className="d-flex">
                    <div className="line"></div>
                    {objective && (
                      <div className="mb-3">
                        <h4>{objective_title}</h4>
                        <div className="text-justify">
                          {parseEditorJS(objective)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {output && (
                <div className="mb-3">
                  <div className="d-flex">
                    <div className="line"></div>
                    {output && (
                      <div className="mb-3">
                        <h4>{output_title}</h4>
                        {parseEditorJS(output)}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {milestones.length > 0 && (
                <>
                  <h4>{milestone_title}</h4>
                  <div className="d-flex">
                    {/* <div className="line-vertical arrow-up arrow-down"></div> */}

                    {/* <ul className="vertical-timeline"> */}
                    <ul className="fa-ul arrow-ul">
                      {milestones.map((milestone, index) => {
                        const { date, text } = milestone;
                        return (
                          <li key={index}>
                            <span className="fa-li">
                              <i className="fa-solid fa-arrow-right text-primary fa-xl"></i>
                            </span>
                            <strong> {date}</strong>
                            <p>{text}</p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </>
              )}

              {funding && (
                <div className="mb-3">
                  <div className="d-flex">
                    <div className="line"></div>
                    {funding && (
                      <div className="mb-3">
                        <h4>{funding_title}</h4>
                        {parseEditorJS(funding)}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {docs_links.length > 0 && (
                <>
                  <h4>{links_documents_title}</h4>
                  <div>
                    <ul>
                      {docs_links.map((doc, index) => {
                        const { link, text } = doc;
                        return (
                          <li className="py-2" key={index}>
                            <a
                              className="link"
                              href={link}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {text}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </>
              )}
              {galleryImages.length > 0 && (
                <div className="row mb-3">
                  <div className="col-12">
                    <h4>{gallery_title}</h4>
                    <Gallery
                      images={galleryImages}
                      backdropClosesModal={true}
                      enableImageSelection={false}
                    />
                  </div>
                </div>
              )}
            </div>
            {/* End Left side */}

            {/* Right side */}
            <div className="col-12 col-lg-4  order-sm-1 order-1">
              {leaders?.data?.length > 0 && (
                <div className="col-12 mb-2">
                  <h4>{leader_title}</h4>
                  <div className="row">
                    {leaders?.data.map((leader, index) => {
                      return (
                        <MemberSmall
                          size={64}
                          titleSize="lg"
                          affliation
                          layout="project"
                          key={index}
                          member={leader}
                        ></MemberSmall>
                      );
                    })}
                  </div>
                </div>
              )}
              {collaborators?.data.length > 0 && (
                <div className="col-12 mb-2">
                  <h4>{collaborator_title}</h4>
                  <div className="row">
                    {collaborators?.data.map((collaborator, index) => {
                      return (
                        <MemberSmall
                          size={64}
                          affliation
                          key={index}
                          layout="project"
                          member={collaborator}
                        ></MemberSmall>
                      );
                    })}
                  </div>
                </div>
              )}
              {partners?.data.length > 0 && (
                <>
                  <div className="col-12 mb-4">
                    <h4>{partner_title}</h4>
                    <div className="row justify-content-center align-items-center text-center">
                      {partners.data.map((partner, index) => {
                        return (
                          <Partner key={index} partner={partner}></Partner>
                        );
                      })}
                    </div>
                  </div>
                  <div className="empty-spacing-40"></div>
                </>
              )}
              {sdgs?.data.length > 0 && (
                <div className="col-12 mb-4">
                  <h4>{sdg_title}</h4>

                  {sdgs.data.map((sdg, index) => {
                    return <Sdg key={index} sdg={sdg}></Sdg>;
                  })}
                </div>
              )}
            </div>
            {/* End Right side */}
          </div>
          <div className="row justify-content-center pt-5">
            <div className="col-md-8 col-12">
              <ActNow project={project} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
