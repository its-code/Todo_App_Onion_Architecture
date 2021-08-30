const express =  require("express")
const router = express.Router()
const queryString = require('query-string');
const {GOOGLE_CLIENT_ID} = require("../../config/auth.config")


const redirectURI = "auth/google";

function getGoogleAuthURL() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: `http://localhost:4000/${redirectURI}`,
    client_id: GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  return `${rootUrl}?${queryString.stringify(options)}`;
}

// Getting login URL
router.get("/auth/google/url", (req, res) => {
  return res.send(getGoogleAuthURL());
});


module.exports = router
