module.exports = {
  routes: [
    {
      method: "POST",
      path: "/global/contact",
      handler: "global.contact",
      config: {
        policies: [],
      },
    },
  ],
};
