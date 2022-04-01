const execSync = require("child_process").execSync;
require("dotenv").config();

try {
    console.log("[Fullscreen Spotify] Building the fullscreen script...");
    execSync(`npx browserify ./public/fullscreen/script-before-build.js -t [ envify --API_KEY ${process.env.API_KEY} --SECRET ${process.env.SECRET} ] > ./public/fullscreen/script.js`);
    console.log("[Fullscreen Spotify] Building the login script...");
    execSync(`npx browserify ./public/login/script-before-build.js -t [ envify --API_KEY ${process.env.API_KEY} ] > ./public/login/script.js`);
    console.log("[Fullscreen Spotify] Scripts are built!")
} catch (err) {
    console.log(err);
}
