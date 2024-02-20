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

app.get("/getAccessToken", async function (req, res) {
  req.query.code;
  const params =
    "?client_id=" +
    CLIENT_ID +
    "&client_secret=" +
    CLIENT_SECRET +
    "&code=" +
    req.query.code;

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

app.get("/getUserData", async function (req, res) {
  req.get("Authorization");
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

app.listen(4000, function () {
  console.log("CORS server running on port 4000");
});
