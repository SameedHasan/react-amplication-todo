// import { createUrl, get, isStoredJwt, post, setStoredJwt } from "./http";

// export const me = async () => {
//   return isStoredJwt()
//     ? (await get(createUrl("/api/me")).catch(() => null))?.data
//     : null;
// };

// export const login = async (username, password) => {
//   const result = (
//     await post(createUrl("/api/login"), { username, password }).catch(
//       () => null
//     )
//   )?.data;

//   if (!result) {
//     return alert("Could not login");
//   }
//   setStoredJwt(result.accessToken);
//   return me();
// };

// export const signup = async (username, password) => {
//   const result = (
//     await post(createUrl("/api/signup"), { username, password }).catch(
//       () => null
//     )
//   )?.data;

//   if (!result) {
//     return alert("Could not sign up");
//   }
//   setStoredJwt(result.accessToken);
//   return me();
// };

import { gql, isStoredJwt, setStoredJwt, client } from "./apollo";
const GET_ME = gql`
  query me {
    me {
      id
    }
  }
`;

export const me = async () => {
  return isStoredJwt()
    ? (await client.query({ query: GET_ME }).catch(() => null))?.data.me
    : null;
};

const LOGIN = gql`
  mutation login($credentials: Credentials!) {
    login(credentials: $credentials) {
      accessToken
    }
  }
`;

export const login = async (username, password) => {
  const result = (
    await client
      .mutate({
        mutation: LOGIN,
        variables: { credentials: { username, password } },
      })
      .catch(() => null)
  )?.data.login;

  if (!result) {
    return alert("Could not login");
  }
  setStoredJwt(result.accessToken);
  return me();
};

const SIGNUP = gql`
  mutation signup($credentials: Credentials!) {
    signup(credentials: $credentials) {
      accessToken
    }
  }
`;

export const signup = async (username, password) => {
  const result = (
    await client
      .mutate({
        mutation: SIGNUP,
        variables: { credentials: { username, password } },
      })
      .catch(() => null)
  )?.data.signup;

  if (!result) {
    return alert("Could not sign up");
  }
  setStoredJwt(result.accessToken);
  return me();
};
