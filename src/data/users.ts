const date = new Date();

export default [
  {
    username: "rwieruch",
    email: "hello@robin.com",
    password: "rwieruch",
    role: "ADMIN",
    messages: [
      {
        text: "Published the Road to learn React",
        createdAt: date.setSeconds(date.getSeconds() + 1)
      }
    ]
  },
  {
    username: "ddavids",
    email: "hello@david.com",
    password: "ddavids",
    messages: [
      {
        text: "Happy to release ...",
        createdAt: date.setSeconds(date.getSeconds() + 1)
      },
      {
        text: "Published a complete ...",
        createdAt: date.setSeconds(date.getSeconds() + 1)
      }
    ]
  }
];
