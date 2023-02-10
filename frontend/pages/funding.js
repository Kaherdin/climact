import client from "@/context/Apollo";
import { PAGE_FUNDING, GET_GLOBAL } from "@/lib/apollo-request";
import { NextSeo } from "next-seo";
import KrNavbar from "@/components/KrNavbar";
import { parseEditorJS } from "@/lib/helper";
import { HeaderFull } from "@/components/section/HeaderFull";
import { Tab, Tabs } from "react-bootstrap";

const index = ({ pageFunding, global }) => {
  const {
    title,
    content_2022,
    content_2021,
    content_2023,
    cover,
    subtitleRTE,
  } = pageFunding?.data?.attributes || "";
  const { url: coverPhotoUrl } = cover?.data?.attributes || 0;
  const coverInfo = cover?.data?.attributes || 0;

  //SEO
  const { metaTitle, metaDescription, metaImage, keywords } =
    pageFunding?.data?.attributes?.seo || "";
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
        coverPhotoUrl={coverPhotoUrl}
        cover={coverInfo}
        minvh="min-vh-100"
        title={title}
        subtitleRTE={subtitleRTE}
      />

      <div className="container header-not-transparent">
        <div className="row py-5 justify-content-center">
          <div className="col-12 col-lg-8">
            <Tabs defaultActiveKey="2023" id="uncontrolled-tab-example">
              {content_2023 && (
                <Tab eventKey="2023" title="2023">
                  <div className="my-3">
                    <div className="text-justify">
                      {parseEditorJS(content_2023)}
                    </div>
                  </div>
                </Tab>
              )}
              {content_2022 && (
                <Tab eventKey="2022" title="2022">
                  <div className="my-3">
                    <div className="text-justify">
                      {parseEditorJS(content_2022)}
                    </div>
                  </div>
                </Tab>
              )}
              {content_2021 && (
                <Tab eventKey="2021" title="2021">
                  <div className="my-3">
                    <div className="text-justify">
                      {parseEditorJS(content_2021)}
                    </div>
                  </div>
                </Tab>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps({ locale }) {
  //Get single Page
  const {
    data: { pageFunding },
  } = await client.query({
    query: PAGE_FUNDING,
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
      global,
      pageFunding: pageFunding,
    },
  };
}

export default index;
