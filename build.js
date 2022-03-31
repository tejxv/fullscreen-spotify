const exec = require("child_process").exec;
require("dotenv").config();
console.log("Building the fullscreen script...")
exec(`npx browserify ./public/fullscreen/script-before-build.js -t [ envify --API_KEY ${process.env.API_KEY} --SECRET ${process.env.SECRET} ] > ./public/fullscreen/script.js`);
console.log("Building the login script...")
exec(`npx browserify ./public/login/script-before-build.js -t [ envify --API_KEY ${process.env.API_KEY} ] > ./public/login/script.js`);
