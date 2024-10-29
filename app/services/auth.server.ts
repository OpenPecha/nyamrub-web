import { Authenticator } from "remix-auth";
import { Auth0Strategy } from "remix-auth-auth0";
import { sessionStorage } from "./session.server";




let { AUTH0_CALLBACK_URL, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_DOMAIN } =
  process.env;


// Create an instance of the authenticator, pass a generic with what your
// strategies will return and will be stored in the session
export const auth = new Authenticator(sessionStorage);

let auth0Strategy = new Auth0Strategy(
  {
    callbackURL: AUTH0_CALLBACK_URL,
    clientID: AUTH0_CLIENT_ID,
    clientSecret: AUTH0_CLIENT_SECRET,
    domain: AUTH0_DOMAIN,
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    // Get the user data from your DB or API using the tokens and profile
    //     // Use the returned information to process or write to the DB.
    //     //
        let id_token = extraParams?.id_token;
        let expires_on= parseJwt(id_token);
        return { id_token,expires_on, ...profile };
  },
);
auth.use(auth0Strategy);

export function isTokenExpired(expirationTime: number): boolean {
  return Date.now() >= expirationTime * 1000;
}

function parseJwt(token) {
  try {
    // Split the token into its three parts
    const [, payloadBase64] = token.split('.');
    
    // Base64 decode the payload
    const payloadJson = atob(payloadBase64);
    
    // Parse the JSON
    const payload = JSON.parse(payloadJson);
    
    // Extract and return the expiration time
    return payload.exp;
  } catch (e) {
    console.error('Error parsing JWT:', e);
    return null;
  }
}