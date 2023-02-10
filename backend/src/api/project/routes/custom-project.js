module.exports = {
  routes: [
    {
      method: "POST",
      path: "/project/act-now",
      handler: "project.actNow",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/project/update-member",
      handler: "project.updateMember",
      config: {
        policies: [],
      },
    },
  ],
};
