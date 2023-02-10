import client from "@/context/Apollo";
import { MEMBERS, GET_GLOBAL, TYPES, PAGE_MEMBER } from "@/lib/apollo-request";
import { Button, Container, Row, Col } from "react-bootstrap";
import { NextSeo } from "next-seo";
import KrNavbar from "@/components/KrNavbar";
import MemberSmall from "@/components/section/MemberSmall";
import { HeaderFull } from "@/components/section/HeaderFull";
import { useState } from "react";
import { useQuery } from "@apollo/client";

export default function Member({ pageMember, global, members }) {
  //Page attributes
  const { title, cover, subtitleRTE } = pageMember?.data?.attributes || "";
  const { filter } = global?.data?.attributes || "";
  const { url: coverPhotoUrl } = cover?.data?.attributes || 0;
  const coverInfo = cover?.data?.attributes || 0;

  //Types
  const [currentType, setCurrentType] = useState("");
  const { data: dataTypes } = useQuery(TYPES);
  const activeTypes = dataTypes?.types?.data.filter(
    (type) => type.attributes.members.data.length > 0
  );

  const handleFilter = (e, type) => {
    setCurrentType(type);
  };

  const filteredMembers = members?.data?.filter((member) => {
    const memberTypes = member.attributes.types?.data.map(
      (type) => type.attributes.title
    );
    if (!currentType) {
      return true;
    } else {
      return memberTypes.includes(currentType);
    }
  });

  //SEO
  const { metaTitle, metaDescription, metaImage, keywords } =
    pageMember?.data?.attributes?.seo || "";
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
        title={title || "Member"}
        subtitleRTE={subtitleRTE}
      />

      <Container className=" header-not-transparent">
        <Row className="my-3">
          <Col className="mx-auto mt-3" lg="9">
            <h5>{filter}</h5>
            <Button
              onClick={(e) => {
                handleFilter(e, "");
              }}
              size="sm"
              className={`me-2 my-1 ${!currentType && "active"}`}
              as="input"
              type="button"
              value="All"
              variant="outline-primary"
            ></Button>

            {activeTypes?.map((type, id) => {
              return (
                <Button
                  key={id}
                  as="input"
                  type="button"
                  className={`me-2 my-1 ${
                    currentType.toLowerCase() ===
                      type.attributes.title.toLowerCase() && "active"
                  }`}
                  value={type.attributes.title}
                  onClick={(e) => {
                    handleFilter(e, type.attributes.title);
                  }}
                  size="sm"
                  variant="outline-primary"
                ></Button>
              );
            })}
          </Col>
        </Row>
        <div className="row py-3 justify-content-start">
          {filteredMembers.map((member, id) => {
            return (
              <div key={id} className="col-lg-4 col-md-6 my-3">
                <MemberSmall
                  size={128}
                  social
                  affliation
                  jobTitle
                  tags={member.attributes.tags}
                  key={id}
                  member={member}
                />
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
}

export async function getStaticProps({ locale }) {
  //Get single Page
  const {
    data: { pageMember },
  } = await client.query({
    query: PAGE_MEMBER,
    variables: { locale: locale || "en" },
  });

  const {
    data: { members },
  } = await client.query({
    query: MEMBERS,
    variables: { locale: locale || "en" },
  });

  const {
    data: { global },
  } = await client.query({
    query: GET_GLOBAL,
    variables: { locale: locale || "en" },
  });

  return {
    props: {
      pageMember,
      members: members,
      global,
    },
  };
}
