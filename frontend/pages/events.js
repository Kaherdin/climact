import { PAGE_EVENT, GET_GLOBAL, EVENTS } from "@/lib/apollo-request";
import client from "@/context/Apollo";
import { HeaderFull } from "@/components/section/HeaderFull";
import { DateTime } from "luxon";

import { Container } from "react-bootstrap";
import KrNavbar from "@/components/KrNavbar";
import EventCard from "@/components/EventCard";
import { NextSeo } from "next-seo";
import { formatTimeDuration, formatEndDate } from "@/lib/helper";

export default function EventPage({ events, global, pageEvent }) {
  const {
    title,
    cover,
    no_next_events = "No upcoming events",
    subtitleRTE,
    next_events,
    past_events,
  } = pageEvent?.data?.attributes || "";
  const { url: coverPhotoUrl } = cover?.data?.attributes || 0;
  const coverInfo = cover?.data?.attributes || 0;

  //SEO
  const { metaTitle, metaDescription, metaImage, keywords } =
    pageEvent?.data?.attributes?.seo || "";
  const { url: metaImageUrl } = metaImage?.data?.attributes || 0;

  const now = DateTime.now().toISO();

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
        className="pt-6"
        minvh="min-vh-100"
        coverPhotoUrl={coverPhotoUrl}
        cover={coverInfo}
        title={title}
        subtitleRTE={subtitleRTE}
      />

      <Container className="mt-5">
        <div className="row">
          <h2>{next_events}</h2>

          {events.data
            .filter((event) => {
              const endDate = formatEndDate(
                event.attributes.startDate,
                event.attributes.duration
              );

              return (
                formatEndDate(
                  event.attributes.startDate,
                  event.attributes.duration
                ) > now
              );
            })
            .map((event, id) => {
              return (
                <div key={id} className="col-12 col mb-5">
                  <EventCard
                    pageEvent={pageEvent?.data?.attributes}
                    event={event}
                  />
                </div>
              );
            })}
          {events.data.filter(
            (event) =>
              formatEndDate(
                event.attributes.startDate,
                event.attributes.duration
              ) > now
          ).length === 0 && (
            <p className="lead text-secondary-300">{no_next_events}</p>
          )}
          <h2>{past_events}</h2>
          {events.data
            .filter((event) => event.attributes.startDate < now)
            .map((event, id) => {
              // console.log(now, "now");
              // console.log(event.attributes.startDate, "startDate");
              return (
                <div key={id} className="col-12 col mb-5">
                  <EventCard
                    pageEvent={pageEvent?.data?.attributes}
                    event={event}
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
  // Get all events with graphQL
  const {
    data: { events },
  } = await client.query({
    query: EVENTS,
    variables: { locale: locale || "en" },
  });

  const {
    data: { pageEvent },
  } = await client.query({
    query: PAGE_EVENT,
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
      events,
      global,
      pageEvent,
    },
  };
}
