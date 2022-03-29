const { LastFmNode } = require("lastfm");

const cookieUsername = document.cookie
  .split("; ")
  .find((row) => row.startsWith("username="))
  .split("=")[1];

const settings = {
  api_key: "4eb725384190b171df788e34396d1fc9",
  secret: "d0cc230195130abe6eeadd2bf5921d7c",
  username: cookieUsername
};

const lastfm = new LastFmNode({
  api_key: settings.api_key,
  secret: settings.secret,
});

const cookieToken = document.cookie
  .split("; ")
  .find((row) => row.startsWith("token="))
  .split("=")[1];

lastfm.request("auth.getSession", {
  token: cookieToken,
  handlers: {
    success: function (data) {
      Object.assign(settings, { username: data.session.name })
      document.cookie = `username=${data.session.name}; path=/`;
      console.log(data);
    },
    error: function (data) {
      console.log(data);
    },
  },
});

if (settings.username === "EMPTY" || cookieUsername === "EMPTY") {
  document.getElementById("empty").innerText = "Please reload your browser.";
}

const trackStream = lastfm.stream(settings.username);

trackStream.start();

function replaceText(selector, text) {
  const element = document.getElementById(selector);
  if (element) element.innerText = text;
}

function replaceImg(selector, text) {
  const element = document.getElementById(selector);
  if (element) element.src = text;
}

function changeBackground(text) {
  document.querySelector("body").style.background = "no-repeat center url('" + text + "')";
  document.querySelector("body").style.backgroundSize = "cover";
}

trackStream.on("nowPlaying", function (track) {
  replaceText("name", track.name);
  replaceText("artist", track.artist["#text"]);
  replaceImg("album", track.image[3]["#text"]);
  changeBackground(track.image[3]["#text"]);
  console.log("Playing");
});

trackStream.on("stoppedPlaying", () => {
  console.log("Stopped playing");
});

document.getElementById("logout").onclick = () => {
  document.cookie = "username=EMPTY; Path=/";
  document.cookie = "token=EMPTY; Path=/";
  window.location.href = "../login";
}
