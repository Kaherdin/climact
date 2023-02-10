import client from "@/context/Apollo";
import {
  MEMBERS,
  MEMBERS_BY_ID,
  TYPES,
  PAGE_ABOUT,
  PARTNERS,
  GET_GLOBAL,
} from "@/lib/apollo-request";
import { NextSeo } from "next-seo";
import MissionHow from "@/components/section/MissionHow";
import Indicator from "@/components/section/Indicator";
import KrNavbar from "@/components/KrNavbar";
import { parseEditorJS } from "@/lib/helper";
import Partner from "@/components/section/Partner";
import MemberSmall from "@/components/section/MemberSmall";
import MemberCard from "@/components/section/MemberCard";
import { HeaderFull } from "@/components/section/HeaderFull";

const about = ({
  pageAbout,
  arrayTypes,
  members,
  partners,
  global,
  membersTeam,
  membersExecutive,
  membersSteering,
}) => {
  //Page attributes
  const {
    title,
    subtitleRTE,
    cover,
    what,
    mission_how,
    indicators,
    indicators_title,
    how_title,
    climact_members_title,
    executive_members_title,
    steering_members_title,
  } = pageAbout?.data?.attributes || "";
  const { url: coverPhotoUrl } = cover?.data?.attributes || 0;
  const coverInfo = cover?.data?.attributes || 0;

  //SEO
  const { metaTitle, metaDescription, metaImage, keywords } =
    pageAbout?.data?.attributes?.seo || "";
  const { url: metaImageUrl } = metaImage?.data?.attributes || 0;

  return (
    <>
      <NextSeo
        title={metaTitle || title}
        description={metaDescription}
        keywords={keywords}
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
      <KrNavbar type="absolute" global={global} />

      <HeaderFull
        minvh="min-vh-100"
        coverPhotoUrl={coverPhotoUrl}
        cover={coverInfo}
        title={title}
        subtitleRTE={subtitleRTE}
      />

      <div className="container header-not-transparent">
        <div className="row py-5 justify-content-center">
          <div className="col-12 col-lg-8">
            {what && (
              <div className="mb-3">
                <div className="text-justify">{parseEditorJS(what)}</div>
              </div>
            )}
          </div>
        </div>
        <div className="row py-5  justify-content-center">
          <div className="col-12 col-lg-8">
            <h2 className="mb-3 text-center">{indicators_title}</h2>
            {/* </div> */}
            <div className="row justify-content-center">
              {indicators?.map((indic, index) => {
                return (
                  <Indicator
                    className="col-12 col-lg-4 pb-5"
                    key={index}
                    indic={indic}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="row py-3 justify-content-center">
          <div className="col-12 col-lg-8">
            <h2 className="pb-5 text-center">{how_title}</h2>
            <div className="row justify-content-center">
              {mission_how?.map((how, index) => {
                return <MissionHow key={index} how={how} />;
              })}
            </div>
          </div>
        </div>
        {partners?.data.length > 0 && (
          <>
            <div className="row py-3 justify-content-center">
              <div className="col-12 mb-4">
                <h2 className="pb-5 text-center">Partners</h2>
                <div className="row justify-content-center align-items-center text-center">
                  {partners.data.map((partner, index) => {
                    return <Partner key={index} partner={partner}></Partner>;
                  })}
                </div>
              </div>
            </div>
            <div className="empty-spacing-40"></div>
          </>
        )}

        {/* Climact Team */}
        <div className="row py-3 justify-content-start">
          <h2 className="mb-0">{climact_members_title}</h2>
          {membersTeam.data.map((member, memberId) => {
            return (
              <div key={memberId} className="col-lg-3 col-md-6 my-3">
                <MemberCard
                  size={128}
                  className="card card-profile h-100"
                  socialBottom
                  affliation
                  jobTitle
                  key={memberId}
                  member={member}
                />
              </div>
            );
          })}
        </div>

        {/* Steering committee */}
        <div className="row py-3 justify-content-start">
          <h2 className="mb-0">{steering_members_title}</h2>
          {membersSteering.data.map((member, memberId) => {
            return (
              <div key={memberId} className="col-lg-4 col-md-6 my-3">
                <MemberSmall
                  size={128}
                  social
                  affliation
                  jobTitle
                  key={memberId}
                  member={member}
                />
              </div>
            );
          })}
        </div>

        {/* Executive committee */}
        <div className="row py-3 justify-content-start">
          <h2 className="mb-0">{executive_members_title}</h2>
          {membersExecutive.data.map((member, memberId) => {
            return (
              <div key={memberId} className="col-lg-4 col-md-6 my-3">
                <MemberSmall
                  size={128}
                  social
                  affliation
                  jobTitle
                  key={memberId}
                  member={member}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export async function getStaticProps({ locale }) {
  const {
    data: { global },
  } = await client.query({
    query: GET_GLOBAL,
    variables: { locale: locale || "en" },
  });
  //Get single Page
  const {
    data: { pageAbout },
  } = await client.query({
    query: PAGE_ABOUT,
    variables: { locale: locale || "en" },
  });

  const {
    data: { members },
  } = await client.query({
    query: MEMBERS,
  });

  const {
    data: { members: membersTeam },
  } = await client.query({
    query: MEMBERS_BY_ID,
    variables: { type: 2 },
  });
  const {
    data: { members: membersSteering },
  } = await client.query({
    query: MEMBERS_BY_ID,
    variables: { type: 6 },
  });
  const {
    data: { members: membersExecutive },
  } = await client.query({
    query: MEMBERS_BY_ID,
    variables: { type: 7 },
  });

  const {
    data: { partners },
  } = await client.query({
    query: PARTNERS,
  });

  const {
    data: { types },
  } = await client.query({
    query: TYPES,
  });

  return {
    props: {
      global,
      pageAbout: pageAbout,
      partners: partners,
      members: members,
      membersTeam: membersTeam,
      membersSteering: membersSteering,
      membersExecutive: membersExecutive,
      arrayTypes: types,
    },
  };
}

export default about;
