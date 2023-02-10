import React, { useState, useRef, useCallback } from "react";
import client from "@/context/Apollo";
import { GET_GLOBAL, PAGE_CONTACT } from "@/lib/apollo-request";

import { NextSeo } from "next-seo";
import KrNavbar from "@/components/KrNavbar";

import { Button, Row, Col } from "react-bootstrap";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { postAxiosAPI } from "@/lib/request";
import { checkFormError } from "@/lib/helper";
import { HeaderFull } from "@/components/section/HeaderFull";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyles from "../styles/mapStyles";

const Contact = ({ global, pageContact }) => {
  //Page attributes
  const { cover, title, subtitleRTE } = pageContact?.data?.attributes || "";
  const { url: coverPhotoUrl } = cover?.data?.attributes || 0;
  const coverInfo = cover?.data?.attributes || 0;

  const [success, setSuccess] = useState(false);
  // const [error, setError] = useState("");

  const {
    first_name,
    last_name,
    your_message,
    email,
    contact_btn,
    subject = "Subject",
  } = global?.data?.attributes || "";

  //Gmap specific loads
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD97BxPiSw01f4GVB_oBWqSQMO4U_TSibE",
  });
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  if (loadError) return "Erreur";
  if (!isLoaded) return "Chargement...";

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };
  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    clickableIcons: false,
  };
  const center = {
    lat: 46.5234065,
    lng: 6.5745459,
  };

  //Form Validation
  const Schema = Yup.object().shape({
    firstName: Yup.string().min(2, "Trop court").required("Requis"),
    lastName: Yup.string().min(2, "Trop court").required("Requis"),
    email: Yup.string().email("Adresse email invalide").required("Requis"),
    subject: Yup.string().min(2, "Trop court").required("Requis"),
    message: Yup.string().min(2, "Trop court").required("Requis"),
  });

  //SEO
  const { metaTitle, metaDescription, metaImage, keywords } =
    pageContact?.data?.attributes?.seo || "";
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
        title={contact_btn}
        subtitleRTE={subtitleRTE}
      />
      <div className="container">
        <div className="row py-5 justify-content-center">
          <div className="col-12 col-md-6">
            <p className="text-secondary mb-2">
              <i className="ni ni-pin-3 text-secondary h4 me-1"></i>
              <a
                className="link"
                target="_blank"
                rel="noreferrer"
                href={`https://www.google.com/maps/place/CLIMACT/@46.5218759,6.5712704,17z/data=!4m9!1m2!2m1!1sCLIMACT,+Vortex,+1015+Lausanne!3m5!1s0x478c31a162aa64fd:0x5bbe7721cd8a1412!8m2!3d46.5246888!4d6.5759112!15sCh5DTElNQUNULCBWb3J0ZXgsIDEwMTUgTGF1c2FubmWSARJyZXNlYXJjaF9pbnN0aXR1dGU`}
              >
                CLIMACT, Université de Lausanne, Vortex, 1015 Lausanne
              </a>
            </p>
            <GoogleMap
              id="map"
              mapContainerStyle={mapContainerStyle}
              zoom={12}
              center={center}
              options={options}
              onLoad={onMapLoad}
            >
              <Marker position={{ lat: 46.5234065, lng: 6.5745459 }} />
            </GoogleMap>
          </div>
          <div className="col-12 col-md-6">
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                subject: "",
                email: "",
                message: "",
              }}
              validationSchema={Schema}
              onSubmit={async (values, { resetForm }) => {
                try {
                  let dataContact = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    subject: values.subject,
                    message: values.message,
                  };

                  await postAxiosAPI(`/global/contact`, dataContact);
                  resetForm();
                  setSuccess(true);
                  setTimeout(function () {
                    setSuccess(false);
                  }, 5000);
                } catch (err) {
                  console.log(err, "error actions");
                }
              }}
            >
              {({ errors, touched }) => (
                <Form id="act-now" method="post" role="form">
                  <h3 className="text-center">
                    <i className="fa-solid fa-arrow-right-long text-primary fa-xl pe-3"></i>
                    {contact_btn}
                    <i className="fa-solid fa-arrow-left-long text-primary fa-xl ps-3"></i>
                  </h3>

                  <div className="row">
                    <div className="col-md-6">
                      <label>{first_name}</label>
                      <div className="form-group mb-4">
                        <div className={`input-group input-group-alternative `}>
                          <span
                            className={`input-group-text ${checkFormError(
                              errors,
                              touched,
                              "firstName"
                            )}`}
                          >
                            <i className="ni ni-circle-08"></i>
                          </span>
                          <Field
                            aria-label={first_name}
                            type="text"
                            name="firstName"
                            placeholder="Greta"
                            className={`form-control form-control-alternative ${checkFormError(
                              errors,
                              touched,
                              "firstName"
                            )}`}
                          />
                        </div>
                        {errors.firstName && touched.firstName && (
                          <div className="text-danger">{errors.firstName}</div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label>{last_name}</label>
                      <div className="form-group mb-4">
                        <div className={`input-group input-group-alternative`}>
                          <span
                            className={`input-group-text ${checkFormError(
                              errors,
                              touched,
                              "lastName"
                            )}`}
                          >
                            <i className="ni ni-collection"></i>
                          </span>
                          <Field
                            aria-label={last_name}
                            type="text"
                            name="lastName"
                            placeholder="Thunberg"
                            className={`form-control form-control-alternative ${checkFormError(
                              errors,
                              touched,
                              "lastName"
                            )}`}
                          />
                        </div>
                        {errors.lastName && touched.lastName && (
                          <div className="text-danger">{errors.lastName}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <label>{email}</label>
                      <div className="form-group mb-4">
                        <div className={`input-group input-group-alternative`}>
                          <span
                            className={`input-group-text ${checkFormError(
                              errors,
                              touched,
                              "email"
                            )}`}
                          >
                            <i className="ni ni-email-83"></i>
                          </span>
                          <Field
                            aria-label={email}
                            type="text"
                            name="email"
                            placeholder="greta@climact.ch"
                            className={`form-control form-control-alternative ${checkFormError(
                              errors,
                              touched,
                              "email"
                            )}`}
                          />
                        </div>
                        {errors.email && touched.email && (
                          <div className="text-danger">{errors.email}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <label>{subject}</label>
                      <div className="form-group mb-4">
                        <div className={`input-group input-group-alternative`}>
                          <span
                            className={`input-group-text ${checkFormError(
                              errors,
                              touched,
                              "subject"
                            )}`}
                          >
                            <i className="ni ni-notification-70"></i>
                          </span>
                          <Field
                            aria-label="First name"
                            type="text"
                            name="subject"
                            placeholder="How can I help ?"
                            className={`form-control form-control-alternative ${checkFormError(
                              errors,
                              touched,
                              "subject"
                            )}`}
                          />
                        </div>
                        {errors.subject && touched.subject && (
                          <div className="text-danger">{errors.subject}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <label>{your_message}</label>
                      <div className="form-group mb-4">
                        <div className={`input-group input-group-alternative`}>
                          <span
                            className={`input-group-text align-items-start ${checkFormError(
                              errors,
                              touched,
                              "message"
                            )}`}
                          >
                            <i className="ni ni-ruler-pencil"></i>
                          </span>
                          <Field
                            aria-label="I want to..."
                            type="text"
                            name="message"
                            rows="5"
                            placeholder="I want to..."
                            as="textarea"
                            className={`form-control form-control-alternative ${checkFormError(
                              errors,
                              touched,
                              "message"
                            )}`}
                          />
                        </div>
                        {errors.message && touched.message && (
                          <div className="text-danger">{errors.message}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <Row>
                    <Col md="6">
                      <Button color="primary" type="submit">
                        {contact_btn}
                      </Button>
                    </Col>
                    {success && (
                      <div className="text-success mt-2">Message sent!</div>
                    )}
                  </Row>
                </Form>
              )}
            </Formik>
          </div>
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

  const {
    data: { pageContact },
  } = await client.query({
    query: PAGE_CONTACT,
    variables: { locale: locale || "en" },
  });

  return {
    props: {
      global,
      pageContact,
    },
  };
}

export default Contact;
