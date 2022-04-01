const browserify = require("browserify");
const envify = require("envify");
const fs = require('fs');
require("dotenv").config();

browserify()
    .add("./public/fullscreen/script-before-build.js")
    .transform(envify({
        API_KEY: process.env.API_KEY,
        SECRET: process.env.SECRET
    }))
    .bundle()
    .pipe(fs.createWriteStream("./public/fullscreen/script.js"))

browserify()
    .add("./public/login/script-before-build.js")
    .transform(envify({
        API_KEY: process.env.API_KEY
    }))
    .bundle()
    .pipe(fs.createWriteStream("./public/login/script.js"))

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
