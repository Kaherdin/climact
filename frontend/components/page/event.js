import React from "react";
import MemberCard from "@/components/section/MemberCard";
import { Container, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { cloudinaryUrl } from "@/lib/helper";
import {
  formatDateMed,
  formatTimeMed,
  formatTimeDuration,
  parseEditorJS,
} from "@/lib/helper";
import AddToCalendar from "@/components/AddToCalendar";
import { truncateWithEllipses } from "@/lib/helper";
import { useRouter } from "next/router";

export const EventContent = ({ event, pageEvent }) => {
  const router = useRouter();
  if (!event) {
    return <div>Error...</div>;
  }
  const { attributes } = event;
  const {
    title,
    content,
    event_type,
    cover,
    startDate,
    subscribe_link,
    venue,
    zoom_link,
    subtitle,
    presenters,
    tags,
    duration,
  } = attributes;

  const {
    venue: venue_title,
    visio_link,
    previous_episode,
    subscribe,
    date,
    time,
    add_google,
    add_outlook,
    add_calendar,
    download_ics,
  } = pageEvent?.data?.attributes || "";

  const { public_id } = cover?.data?.attributes?.provider_metadata || "";

  const video_link = `${
    zoom_link && `<p><a href="${zoom_link}">Visio Link</a></p>`
  }`;

  return (
    <>
      <header className="mt-7 mb-3">
        <div>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-8 col-md-8">
                <div className="d-flex justify-content-start flex-wrap">
                  {tags?.data?.length > 0 &&
                    tags.data.map((tag, index) => {
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
                <h1 className="mb-0">{title}</h1>
                {subtitle && (
                  <p className="pb-0 mb-0" style={{ maxHeight: "200px" }}>
                    {truncateWithEllipses(subtitle, 200)}
                  </p>
                )}
                <Row className="justify-content-start gx-7 my-3">
                  {startDate && (
                    <>
                      <Col md="auto">
                        <b>
                          <i className="fas fa-calendar-alt pe-2"></i>
                          {date}
                        </b>
                        <p>{formatDateMed(startDate, router?.locale)}</p>
                      </Col>
                      <Col md="auto">
                        <b>
                          <i className="fas fa-clock pe-2"></i>
                          {time}
                        </b>
                        <p>
                          {startDate &&
                            formatTimeMed(startDate, router?.locale)}{" "}
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
                    <Col md="auto">
                      <b>
                        <i className="fa-solid fa-location-dot pe-2"></i>
                        {venue_title}
                      </b>
                      <p>
                        <a
                          className="link"
                          rel="noreferrer"
                          target="_blank"
                          href={`https://www.google.com/maps/search/${venue}`}
                        >
                          {venue}
                        </a>
                      </p>
                    </Col>
                  )}

                  {zoom_link && (
                    <Col md="auto mb-3">
                      <b>
                        <i className="fa-solid fa-headset pe-2"></i>
                        {visio_link}
                      </b>
                      <div className="w-100"></div>
                      <a href={zoom_link} target="_blank" rel="noreferrer">
                        Get the link
                      </a>
                    </Col>
                  )}
                  <div className="d-flex">
                    {subscribe_link && (
                      <Link href={`${subscribe_link}`}>
                        <a className="me-2">
                          <Button variant="primary">{subscribe}</Button>
                        </a>
                      </Link>
                    )}

                    <AddToCalendar
                      add_calendar={add_calendar}
                      add_outlook={add_outlook}
                      add_google={add_google}
                      download_ics={download_ics}
                      event={event}
                    />

                    <a
                      href="https://www.youtube.com/channel/UCqKm3bWI-8rQjpiOB_SG4yA"
                      rel="noreferrer"
                      target="_blank"
                      className="ms-2"
                    >
                      {event_type === "seminar" && (
                        <Button variant="outline-secondary">
                          {previous_episode}
                        </Button>
                      )}
                    </a>
                  </div>
                </Row>
              </div>
              <div className="col-lg-4 col-md-4 ms-auto text-end">
                {cover?.data && (
                  <Image
                    src={cloudinaryUrl(public_id, 500, 500)}
                    alt={title}
                    width={500}
                    height={500}
                    className="border-radius-lg img-fluid"
                  />
                )}
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </header>
      <Container className="bg-white">
        <div className="rounded-top py-4">
          <Row className="justify-content-center">
            <Col lg={8}>
              {presenters?.length > 0 && (
                <>
                  {presenters?.map((presenter, index) => {
                    return (
                      <div className="presenter mb-5" key={index}>
                        <h3 className="mb-0 mt-2">{presenter.title}</h3>
                        {presenter.description && (
                          <div className="mb-5">
                            <div className="text-justify">
                              {parseEditorJS(presenter.description)}
                            </div>{" "}
                          </div>
                        )}
                        {presenter?.member?.data && (
                          <Row className="justify-content-center">
                            <div className="">
                              <MemberCard
                                key={index}
                                className="d-flex align-items-start flex-column flex-md-row"
                                socialLeft
                                width="200"
                                height="200"
                                imgClass="shadow-lg rounded-4"
                                member={presenter?.member?.data}
                              />
                            </div>
                          </Row>
                        )}
                      </div>
                    );
                  })}
                </>
              )}
              {content && (
                <div className="mb-5">
                  <div className="text-justify">{parseEditorJS(content)}</div>{" "}
                </div>
              )}
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};
