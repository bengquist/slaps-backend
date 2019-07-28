const date = new Date();

export default [
  {
    username: "blake",
    email: "blake@gmail.com",
    password: "blake",
    role: "ADMIN",
    messages: [
      {
        text: "Published the Road to learn React",
        createdAt: date.setSeconds(date.getSeconds() + 1)
      }
    ]
  },
  {
    username: "jessica",
    email: "jessica@gmail.com",
    password: "jessica",
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
