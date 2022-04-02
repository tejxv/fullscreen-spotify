const exec = require("child_process").exec;
require("dotenv").config()

console.log(process.ENV)

try {
    console.log("[Fullscreen Spotify] Building the fullscreen script...");
    exec(`npx browserify ./public/fullscreen/script-before-build.js -t [ envify --API_KEY ${process.env.API_KEY} --SECRET ${process.env.SECRET} ] > ./public/fullscreen/script.js`);
    console.log("[Fullscreen Spotify] Building the login script...");
    exec(`npx browserify ./public/login/script-before-build.js -t [ envify --API_KEY ${process.env.API_KEY} ] > ./public/login/script.js`);
    console.log("[Fullscreen Spotify] Scripts are built!")
} catch (err) {
    console.log(err);
}
