import axios from "axios";

const API_URL = `http://localhost:${process.env.PORT || 3000}/graphql`;

export const user = async variables => {
  try {
    const { data } = await axios.post(API_URL, {
      query: `
        query ($id: ID!) {
          user(id: $id) {
            id
            username
            email
            role
          }
        }
      `,
      variables
    });

    return data;
  } catch (e) {
    console.info(e.message);
  }
};

export const users = async () => {
  try {
    const { data } = await axios.post(API_URL, {
      query: `
      {
        users {
          email
          role
          username
        }
      }
      `
    });

    console.log(data);

    return data;
  } catch (e) {
    console.info(e.message);
  }
};
