const axios = require("axios");
const fs = require("fs"); // Required for writing to index.html

const loginUrl =
  "https://cloud.ufxtv.com/api/user/login/?user_email=BE0268&user_password=1111&kauth=";
const playBaseUrl =
  "https://cloud.ufxtv.com/api/tv/channels/play/?c=uflix-epl1&kauth=";

// Function to get playlist URL
async function getPlaylist(user_loggedsession) {
  const playUrl = `${playBaseUrl}&user_loggedsession=${user_loggedsession}`;
  try {
    const response = await axios.get(playUrl); // Using axios.get() for GET request
    const text = response.data; // Access the response body using response.data
    return text.includes("<clear_url>") ? text : null;
  } catch (error) {
    console.error("Error fetching playlist:", error);
    return null;
  }
}

// Login to get session
async function login() {
  try {
    const response = await axios.get(loginUrl); // Using axios.get() for GET request
    const text = response.data; // Access the response body using response.data
    const sessionMatch = text.match(
      /<user_loggedsession>(.*?)<\/user_loggedsession>/
    );
    return sessionMatch ? sessionMatch[1] : null;
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
}

// Extract clear_url from XML response
function extractClearUrl(xml) {
  const match = xml.match(/<clear_url>(.*?)<\/clear_url>/);
  return match ? match[1] : null;
}

// Generate and render playlist
function renderPlaylist(clearUrl) {
  const fixedUrl = clearUrl.replace("playlist.m3u8", "chunks.m3u8");
  const output = `
      #EXTM3U
      ########################################
      ### Uflix ### 
      ########################################
      #EXTINF:-1 group-title="กีฬา" tvg-logo="https://static.uflixtv.com/images/tv/channels_icons/epl-1.png",EPL-1
      ${fixedUrl}
      `;
  return output; // Return the rendered playlist
}

// Start the process
(async function () {
  const session = await login();
  if (session) {
    const xmlData = await getPlaylist(session);
    const clearUrl = extractClearUrl(xmlData);
    if (clearUrl) {
      const playlist = renderPlaylist(clearUrl);
      fs.writeFileSync("index.html", playlist); // Write the playlist to index.html
    } else {
      console.error("No clear_url found in the response");
    }
  } else {
    console.error("Login failed");
  }
})();
