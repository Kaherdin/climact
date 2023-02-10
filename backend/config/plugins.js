module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
    },
  },
  seo: {
    enabled: true,
  },
  vision: {
    enabled: true,
    resolve: "./src/plugins/vision",
    config: {
      contentTypes: [
        {
          uid: "api::post.post",
          targetField: "slug",
          draft: {
            query: {
              type: "post",
            },
            basePath: "post/preview",
          },
          published: {
            basePath: "post",
          },
        },
        {
          uid: "api::project.project",
          targetField: "slug",
          draft: {
            query: {
              type: "project",
            },
            basePath: "project/preview",
          },
          published: {
            basePath: "project",
          },
        },
        {
          uid: "api::event.event",
          targetField: "slug",
          draft: {
            query: {
              type: "event",
            },
            basePath: "event/preview",
          },
          published: {
            basePath: "event",
          },
        },
      ],
    },
  },
  email: {
    config: {
      provider: "strapi-provider-email-sendinblue",
      providerOptions: {
        sendinblue_api_key: env(
          "SIB_API_KEY",
          "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"
        ),
        sendinblue_default_replyto: env(
          "SIB_DEFAULT_REPLY_TO",
          "info@climact.ch"
        ),
        sendinblue_default_cc: env("SIB_DEFAULT_FROM", "info@climact.ch"),
        sendinblue_default_from: env("SIB_DEFAULT_FROM", "info@climact.ch"),
        sendinblue_default_from_name: env("SIB_DEFAULT_FROM_NAME", "Climact"),
      },
    },
  },
});
