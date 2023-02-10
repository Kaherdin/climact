import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_NAVBAR, GET_GLOBAL } from "@/lib/apollo-request";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { checkFormError } from "@/lib/helper";
import { Modal, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { parseEditorJS } from "@/lib/helper";
// import { Image, Transformation } from "cloudinary-react";
import Image from "next/image";
import { cloudinaryUrl } from "@/lib/helper";
import { DateTime } from "luxon";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";

export const Footer = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  //Form Validation
  const Schema = Yup.object().shape({
    email: Yup.string().email("Adresse email invalide").required("Requis"),
    acceptTerms: Yup.boolean().oneOf(
      [true],
      "You must accept the policy terms and conditions"
    ),
  });

  //Get local  translation
  const router = useRouter();
  const {
    loadingGql,
    errorGql,
    data: data_global,
  } = useQuery(GET_GLOBAL, {
    variables: { locale: router.locale },
  });

  const { attributes: global_attributes } = data_global?.global?.data || "";
  const { nav_links } = global_attributes?.navbar || 0;
  const { logo, logo_epfl, logo_unil } = global_attributes?.footer || 0;

  if (loadingGql) return "Loading...";
  if (errorGql) return `Error! ${error.message}`;
  return (
    <div>
      <div className="">
        <div className="container position-relative mt-8">
          <div className="card bg-gradient-primary text-white z-index-3">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-8 mx-auto text-center">
                  <h3 className="text-white">
                    {global_attributes?.footer?.newsletter_title}
                  </h3>
                  <Formik
                    initialValues={{
                      email: "",
                      acceptTerms: false,
                    }}
                    validationSchema={Schema}
                    onSubmit={async (values, { resetForm }) => {
                      try {
                        let dataAct = {
                          email: values.email,
                        };
                        const url = "https://api.sendinblue.com/v3/contacts";
                        const options = {
                          method: "POST",
                          headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            "api-key":
                              "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",
                            // "api-key": process.env.SIB_API_KEY,
                          },
                          body: JSON.stringify({
                            email: values.email,
                            emailBlacklisted: false,
                            smsBlacklisted: false,
                            listIds: [8],
                          }),
                        };
                        const res = await fetch(url, options);
                        const data = await res.json();
                        if (res.ok) {
                          resetForm();
                          setSuccess(true);
                          setError("");
                          setTimeout(function () {
                            setSuccess(false);
                          }, 5000);
                        } else {
                          setError(data.message);
                        }
                      } catch (err) {
                        console.log(err, "error actions");
                      }
                    }}
                  >
                    {({ errors, touched }) => (
                      <Form id="act-now" method="post" role="form">
                        <div className="row">
                          <div className="col-md-7 ms-auto">
                            <div className="input-group input-group-alternative">
                              <span className="input-group-text">
                                <i className="fas fa-envelope"></i>
                              </span>

                              <Field
                                aria-label="First name"
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

                          <div className="col-md-5 pt-2 pt-md-0 me-auto text-start">
                            <button
                              type="submit"
                              // onClick={() => loadData()}
                              className="btn btn-primary w-100 mb-0 h-100 position-relative z-index-2"
                            >
                              {global_attributes?.footer?.subscribe}
                            </button>
                          </div>
                          {success && (
                            <div className="text-white mt-2">
                              {global_attributes?.footer?.inscription_confirmed}{" "}
                            </div>
                          )}
                          {error && (
                            <div className="text-danger mt-2">{error}</div>
                          )}
                        </div>
                        <div className="row">
                          <div className="col ms-auto pt-2">
                            <div className="form-check form-check-inline">
                              <Field
                                type="checkbox"
                                name="acceptTerms"
                                className={
                                  "form-check-input" +
                                  (errors.acceptTerms && touched.acceptTerms
                                    ? " is-invalid"
                                    : "")
                                }
                              />

                              <label
                                className="form-check-label"
                                htmlFor="acceptTerms"
                              >
                                <a onClick={handleShowModal} className="link">
                                  {
                                    global_attributes?.footer
                                      ?.accept_terms_label
                                  }
                                </a>
                              </label>
                            </div>
                          </div>
                          <Modal show={showModal} onHide={handleCloseModal}>
                            <Modal.Body>
                              {global_attributes?.footer?.accept_term_message &&
                                parseEditorJS(
                                  global_attributes?.footer?.accept_term_message
                                )}
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="secondary"
                                onClick={handleCloseModal}
                              >
                                {global_attributes?.close_btn}
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer pb-5 pt-10 bg-gradient-dark mt-n8 position-relative">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col mb-3">
              {logo_epfl && (
                <a
                  href="https://www.epfl.ch/fr/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={cloudinaryUrl(
                      logo_epfl?.data?.attributes?.provider_metadata?.public_id,
                      221,
                      35,
                      "fill_pad"
                    )}
                    alt="EPFL"
                    width={221}
                    height={35}
                    className="img-fluid"
                  />
                </a>
              )}
            </div>
            <div className="col mb-3 ">
              {logo && (
                <a
                  href="https://www.climact.ch"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={cloudinaryUrl(
                      logo?.data?.attributes?.provider_metadata?.public_id,
                      279,
                      44,
                      "fill_pad"
                    )}
                    alt="Climact"
                    width={279}
                    height={44}
                    className="img-fluid"
                  />
                </a>
              )}
            </div>
            <div className="col mb-3">
              {logo_unil && (
                <a href="https://www.unil.ch/" target="_blank" rel="noreferrer">
                  <Image
                    src={cloudinaryUrl(
                      logo_unil?.data?.attributes?.provider_metadata?.public_id,
                      221,
                      35,
                      "pad"
                    )}
                    alt="UNIL"
                    width={221}
                    height={35}
                    className="img-fluid"
                  />
                </a>
              )}
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-12 text-center py-3 py-lg-0">
              <a
                href="https://twitter.com/ClimactSwiss"
                target="_blank"
                rel="noreferrer"
                className="text-white me-xl-4 me-4"
              >
                <span className="fab fa-twitter text-lg"></span>
              </a>
              <a
                href="https://www.youtube.com/channel/UCqKm3bWI-8rQjpiOB_SG4yA"
                target="_blank"
                rel="noreferrer"
                className="text-white me-xl-4 me-4"
              >
                <span className="fab fa-youtube text-lg"></span>
              </a>
              <a
                href="https://www.linkedin.com/company/climactsuisse/about/"
                target="_blank"
                rel="noreferrer"
                className="text-white"
              >
                <span className="fab fa-linkedin text-lg"></span>
              </a>
            </div>
          </div>

          <div className="row my-2">
            <div className="col-12 text-center">
              <ul className="nav flex-row align-items-center mb-lg-3 mt-sm-0 justify-content-center">
                {nav_links?.map((data, index) => {
                  const { title, link } = data;
                  return (
                    <Link key={index} href={link} passHref>
                      <Nav.Link
                        className={
                          router.pathname == link
                            ? "fw-bolder text-white"
                            : "text-white"
                        }
                      >
                        {title}
                      </Nav.Link>
                    </Link>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-12 text-center">
              <p className="mb-0 text-white">
                {/* Link to Tagadart */}
                Copyright © {DateTime.now().year} Climact by{" "}
                <a
                  href="https://www.tagadart.com/"
                  rel="noreferrer"
                  target="_blank"
                >
                  Tagadart sarl
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
