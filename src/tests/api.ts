import axios from "axios";

const API_URL = `http://localhost:${process.env.PORT || 3000}/graphql`;

export const user = async variables => {
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
};

export const users = async () => {
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

  return data;
};

export const signIn = async variables => {
  const { data } = await axios.post(API_URL, {
    query: `
      mutation ($login: String!, $password: String!) {
        signIn(login: $login, password: $password) {
          token
        }
      }
    `,
    variables
  });

  return data;
};

export const deleteUser = async (variables, token) => {
  const { data } = await axios.post(
    API_URL,
    {
      query: `
      mutation ($id: ID!) {
        deleteUser(id: $id)
      }
    `,
      variables
    },
    {
      headers: {
        "x-token": token
      }
    }
  );

  return data;
};
