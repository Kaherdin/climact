module.exports = ({ env }) => ({
  auth: {
    // secret: env("API_TOKEN_SALT", "6a0e6763b6e0b14234d9571bae5d8a0f"),
    secret: env("ADMIN_JWT_SECRET", "6a0e6763b6e0b14234d9571bae5d8a0f"),
  },
  apiToken: {
    // secret: env("ADMIN_JWT_SECRET", "6a0e6763b6e0b14234d9571bae5d8a0f"),
    salt: env("API_TOKEN_SALT", "6a0e6763b6e0b14234d9571bae5d8a0f"),
  },
});
