"use strict";

/**
 *  global controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::global.global", ({ strapi }) => ({
  async contact(ctx) {
    const { firstName, lastName, email, subject, message } = ctx.request.body;
    const emailTemplate = {
      subject: subject,
      text: `${firstName} ${lastName} (${email}).\n\n${message}`,
      html: `<h1>${firstName} ${lastName} (${email}).</h1>
              <h3>${subject}</h3>
              <p>${message}<p>`,
    };

    await strapi.plugins["email"].services.email.sendTemplatedEmail(
      {
        to: "info@climact.ch",
        cc: email,
      },
      emailTemplate
    );
    return "ok";
  },
}));
