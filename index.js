var express = require("express");
var cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

var bodyParser = require("body-parser");

const CLIENT_ID = "b5d1d0f74e1b8428438b";
const CLIENT_SECRET = "59b22cab4f3c5ac8aaaaac86290c1e0948dbb500";

var app = express();
app.use(cors());
app.use(bodyParser.json());

// Route to handle getting access token
app.get("/getAccessToken", async function (req, res) {
  // Extract code from query parameter
  req.query.code;
  const params =
    "?client_id=" +
    CLIENT_ID +
    "&client_secret=" +
    CLIENT_SECRET +
    "&code=" +
    req.query.code;

  // Make request to GitHub OAuth endpoint to exchange code for access token
  await fetch("https://github.com/login/oauth/access_token" + params, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      res.json(data);
    });
});

// Route to handle getting user data
app.get("/getUserData", async function (req, res) {
  // Extract Authorization header
  req.get("Authorization");

  // Make request to GitHub API to get user data
  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"),
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      res.json(data);
    });
});

// Start the server
app.listen(4000, function () {
  console.log("CORS server running on port 4000");
});
