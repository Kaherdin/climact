import React from "react";
import { Dropdown } from "react-bootstrap";
import { formatDateMed } from "@/lib/helper";
import { google, outlook, office365, yahoo, ics } from "calendar-link";

const AddToCalendar = ({
  event,
  add_google,
  add_outlook,
  add_calendar,
  download_ics,
}) => {
  const { attributes } = event;
  const {
    title,

    cover,
    startDate,

    venue,
    zoom_link,

    duration,
  } = attributes;

  const { public_id } = cover?.data?.attributes?.provider_metadata || "";

  const video_link = `${
    zoom_link && `<p><a href="${zoom_link}">Visio Link</a></p>`
  }`;
  const addEvent = {
    title: title,
    description: title + video_link,
    location: venue,
    start: startDate,
    duration: [duration, "hour"],
  };
  return (
    <Dropdown className="pb-3">
      <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
        <i className="fas fa-calendar-alt pe-2"></i>
        {add_calendar}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href={google(addEvent)} target="_blank">
          <i className="fab fa-google pe-2"></i>
          {add_google}
        </Dropdown.Item>
        <Dropdown.Item href={office365(addEvent)} target="_blank">
          <i className="fa-brands fa-microsoft pe-2"></i>
          {add_outlook}
        </Dropdown.Item>
        <Dropdown.Item
          // download="climact.ics"
          download={`climact-${formatDateMed(startDate, "en")}.ics`}
          href={ics(addEvent)}
          target="_blank"
        >
          <i className="fa-brands fa-apple pe-2"></i>
          {download_ics}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AddToCalendar;
