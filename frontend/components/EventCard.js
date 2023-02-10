import React from "react";
import Link from "next/link";
import {
  truncateWithEllipses,
  formatDateMed,
  formatTimeMed,
  formatTimeDuration,
} from "@/lib/helper";
import AddToCalendar from "@/components/AddToCalendar";

// import { Image, Transformation } from "cloudinary-react";
import Image from "next/image";
import { cloudinaryUrl } from "@/lib/helper";
import MemberSmall from "./section/MemberSmall";
import { Button, Row, Col } from "react-bootstrap";
import { subscribe } from "graphql";
import { useRouter } from "next/router";

const EventCard = ({ event, pageEvent }) => {
  const {
    id,
    attributes: {
      title,
      subscribe_link,
      content,
      excerpt,
      subtitle,
      slug,
      cover,
      startDate,

      venue,
      zoom_link,
      youtube_link,
      presenters,
      experts,
      createdAt,
      tags,

      duration,
    },
  } = event;

  const {
    venue: venue_title,
    visio_link,
    presented_by,
    read_more,
    subscribe,
    date,
    time,
    add_google,
    add_outlook,
    add_calendar,
    download_ics,
  } = pageEvent || "";
  const { public_id } = cover?.data?.attributes?.provider_metadata || "";

  const router = useRouter();

  return (
    <>
      <div className="card card-plain">
        <div className="row align-items-top">
          <div className="col-md-3 text-center">
            <Link href={`/event/${slug}`}>
              <a>
                {" "}
                <div className="card-image position-relative border-radius-lg ">
                  {cover?.data && (
                    <Image
                      src={cloudinaryUrl(public_id, 750, 750)}
                      alt={title}
                      width={750}
                      height={750}
                      className="border-radius-lg img-fluid"
                    />
                    // <Image
                    //   alt={title}
                    //   cloudName="climact"
                    //   publicId={public_id}
                    //   className="border-radius-lg img-fluid"
                    // >
                    //   <Transformation
                    //     width="500"
                    //     height="500"
                    //     crop="fill"
                    //     gravity="auto"
                    //   />
                    // </Image>
                  )}
                </div>
              </a>
            </Link>
          </div>
          <div className="col-md-9">
            <div className="px-3">
              {tags && (
                <div className="d-flex justify-content-start flex-wrap">
                  {tags.data.map((tag, index) => {
                    const { name } = tag.attributes;
                    return (
                      <div
                        key={index}
                        className="badge badge-primary badge-pill m-1"
                      >
                        {name}
                      </div>
                    );
                  })}
                </div>
              )}
              <Link href={`/event/${slug}`}>
                <a>
                  <h3>
                    <span className="text-dark font-weight-normal">
                      {title}
                    </span>
                  </h3>
                </a>
              </Link>
              {excerpt && (
                <>
                  <p className="pb-0 mb-0" style={{ maxHeight: "200px" }}>
                    {truncateWithEllipses(excerpt, 300)}
                  </p>
                </>
              )}
              {subtitle && (
                <>
                  {" "}
                  <p className="pb-0 mb-0" style={{ maxHeight: "200px" }}>
                    {truncateWithEllipses(subtitle, 200)}
                  </p>
                </>
              )}
              <Row className="justify-content-start  my-1">
                {startDate && (
                  <>
                    <Col xs="12" lg="6">
                      <b>
                        <i className="fas fa-calendar-alt pe-2"></i>
                        {date}
                      </b>
                      <p>{formatDateMed(startDate, router?.locale)}</p>
                    </Col>
                    <Col xs="12" lg="6">
                      <b>
                        <i className="fas fa-clock pe-2"></i>
                        {time}
                      </b>
                      <p>
                        {startDate && formatTimeMed(startDate, router?.locale)}{" "}
                        -{" "}
                        {startDate &&
                          formatTimeDuration(
                            startDate,
                            duration,
                            router?.locale
                          )}
                      </p>
                    </Col>
                  </>
                )}
                {venue && (
                  <Col xs="12" lg="6">
                    <b>
                      <i className="fa-solid fa-location-dot pe-2"></i>
                      {venue_title}
                    </b>
                    <p>{venue}</p>
                  </Col>
                )}

                {zoom_link && (
                  <Col xs="12" lg="6">
                    <b>
                      <i className="fa-solid fa-headset pe-2"></i>
                      {visio_link}
                    </b>
                    <div className="w-100"></div>
                    <a href={zoom_link} target="_blank" rel="noreferrer">
                      {zoom_link}
                    </a>
                  </Col>
                )}
              </Row>

              {presenters?.[0]?.member?.data && (
                <>
                  <h5 className="pt-3 mb-0">{presented_by}</h5>
                  <div className="row p-0">
                    {presenters?.map((presenter, index) => {
                      return (
                        <Col key={index} xs="12" lg="6">
                          <MemberSmall
                            size={64}
                            member={presenter.member.data}
                          />
                        </Col>
                      );
                    })}
                  </div>
                </>
              )}
              <div className="d-flex gx-2 pt-3 flex-wrap">
                <Link href={`/event/${slug}`}>
                  <a className="me-2 mt-2">
                    <Button variant="primary">{read_more}</Button>
                  </a>
                </Link>
                {subscribe_link && (
                  <Link href={`${subscribe_link}`}>
                    <a className="me-2 mt-2">
                      <Button variant="secondary">{subscribe}</Button>
                    </a>
                  </Link>
                )}
                <div className="mt-2">
                  {" "}
                  <AddToCalendar
                    add_calendar={add_calendar}
                    add_outlook={add_outlook}
                    add_google={add_google}
                    download_ics={download_ics}
                    event={event}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCard;
