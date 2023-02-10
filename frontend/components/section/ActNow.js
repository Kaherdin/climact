import React, { useState } from "react";

import client from "@/context/Apollo";
import { GET_GLOBAL } from "@/lib/apollo-request";
import { useQuery } from "@apollo/client";

import { Button, Row, Col } from "react-bootstrap";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { postAxiosAPI } from "@/lib/request";
import { checkFormError } from "@/lib/helper";
import { useRouter } from "next/router";
import { parseEditorJS } from "@/lib/helper";

// Core Components
function ActNow({ project }) {
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const {
    loading,
    error,
    data: data_global,
  } = useQuery(
    GET_GLOBAL,
    // { fetchPolicy: "cache-first" },
    {
      variables: { locale: router.locale },
    }
  );

  // const emailLeader = project?.attributes?.leaders?.data?.map((leader) => {
  //   return leader?.attributes?.email;
  // });
  const emailLeader =
    project?.attributes?.leaders?.data?.[0]?.attributes?.email;

  const {
    first_name,
    last_name,
    your_message,
    email,
    act_now,
    subject = "Subject",
  } = data_global?.global?.data?.attributes || "";

  //Form Validation
  const Schema = Yup.object().shape({
    firstName: Yup.string().min(2, "Trop court").required("Requis"),
    lastName: Yup.string().min(2, "Trop court").required("Requis"),
    email: Yup.string().email("Adresse email invalide").required("Requis"),
    subject: Yup.string().min(2, "Trop court").required("Requis"),
    message: Yup.string().min(2, "Trop court").required("Requis"),
  });

  return (
    <>
      <div>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            subject: "",
            email: "",
            message: "",
            emailLeader: emailLeader,
            projectTitle: project?.attributes?.title,
          }}
          validationSchema={Schema}
          onSubmit={async (values, { resetForm }) => {
            try {
              let dataAct = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                subject: values.subject,
                message: values.message,
                emailLeader: values.emailLeader,
                projectTitle: values.projectTitle,
              };

              await postAxiosAPI(`/project/act-now`, dataAct);
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
              <h3 className="display-3 text-center mb-0">
                <i className="fa-solid fa-arrow-right-long text-primary fa-xl pe-3"></i>
                {act_now?.title}
                <i className="fa-solid fa-arrow-left-long text-primary fa-xl ps-3"></i>
              </h3>
              <p className="text-center text-secondary-400">
                {" "}
                {act_now?.subtitle}
              </p>

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
                        aria-label={subject}
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
                    Act now
                  </Button>
                </Col>
                {success && (
                  <div className="text-success mt-2">Message sent!</div>
                )}
              </Row>
            </Form>
          )}
        </Formik>
        {/* </Card>
        </Col> */}
      </div>
    </>
  );
}

export default ActNow;
