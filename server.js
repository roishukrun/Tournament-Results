const express = require("express");

const request = require("request");

const app = express();

const BASE_URL = "http://localhost:20000"; // The base URL of the real API server.
const PORT = 5000;

/* Used to fix CORS error while trying to fetch from different domain. */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.get("/api/v1/players/suspects", (req, res) => {
  createRequestAndResponse(req.originalUrl, res);
});

app.get("/api/v1/players", (req, res) => {
  createRequestAndResponse(req.originalUrl, res);
});

function createRequestAndResponse(url, res) {
  request({ url: BASE_URL + url }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.status(500).json({ type: "error", message: err.message });
    }
    res.send({ headers: response.headers, body: body });
  });
}
