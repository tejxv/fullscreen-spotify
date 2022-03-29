const express = require("express"),
  cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());

app.use("/login", express.static(__dirname + "/public/login"));
app.use("/fullscreen", express.static(__dirname + "/public/fullscreen"));

app.get("/", (req, res) => {
  if (req.query.token) {
    res.cookie("token", req.query.token);
    res.redirect("/fullscreen");
  } else {
    if (!req.cookies.username === "EMPTY") {
      res.redirect("/fullscreen");
    } else {
      res.redirect("/login")
    }
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
