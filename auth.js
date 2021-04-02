const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Authentication service started on port 3000");
});

const users = [
  {
    username: "john",
    password: "password123admin",
    role: "admin",
  },
  {
    username: "anna",
    password: "password123member",
    role: "member",
  },
];

const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const accessTokenSecret = "youraccesstokensecret";

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });

  if (user) {
    // Generate an access token
    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      accessTokenSecret
    );

    res.json({
      accessToken,
    });
  } else {
    res.send("Username or password incorrect");
  }
});
