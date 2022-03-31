document.getElementById("lastfm").onclick = () => {
    window.location.href = `https://www.last.fm/api/auth?api_key=${process.env.API_KEY}`
}
