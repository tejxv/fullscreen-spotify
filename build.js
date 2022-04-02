const browserify = require("browserify");
const envify = require("envify");
const fs = require("fs");
require("dotenv").config();

var fullscreenInput = "./public/fullscreen/script-before-build.js";
var fullscreenOutput = fs.createWriteStream("./public/fullscreen/script.js");
var loginInput = "./public/login/script-before-build.js";
var loginOutput = fs.createWriteStream("./public/login/script.js");

const fullscreen = browserify();
const login = browserify();

fullscreen.add(fullscreenInput);
fullscreen.transform(
  envify({
    API_KEY: process.env.API_KEY,
    SECRET: process.env.SECRET,
  })
);
fullscreen.bundle().pipe(fullscreenOutput);

login.add(loginInput);
login.transform(
  envify({
    API_KEY: process.env.API_KEY,
    SECRET: process.env.SECRET,
  })
);
login.bundle().pipe(loginOutput);

/*
try {
    execSync(`npm install -g browserify envify`);
    console.log("[Fullscreen Spotify] Building the fullscreen script...");
    execSync(`browserify ./public/fullscreen/script-before-build.js -t [ envify --API_KEY ${process.env.API_KEY} --SECRET ${process.env.SECRET} ] > ./public/fullscreen/script.js`);
    console.log("[Fullscreen Spotify] Building the login script...");
    execSync(`browserify ./public/login/script-before-build.js -t [ envify --API_KEY ${process.env.API_KEY} ] > ./public/login/script.js`);
    console.log("[Fullscreen Spotify] Scripts are built!")
} catch (err) {
    console.log(err);
}*/
