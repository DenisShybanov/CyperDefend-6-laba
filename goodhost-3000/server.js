const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

// === USERS ===
const users = {
    john: "1234",
    anna: "5678"
};

// === LOGIN ===
app.get("/login", (req, res) => {

    const username = req.query.username;
    const password = req.query.password;

    if (users[username] && users[username] === password) {

        const sessionId = `${username}-session-123`;

        // Lab 5 FIX (HttpOnly + Secure + SameSite + Path)
        res.setHeader(
            "Set-Cookie",
            `SessionID=${sessionId}; Path=/api; HttpOnly; Secure; SameSite=Strict`
        );

        res.send(`Login successful. Logged in as ${username}`);
    } 
    else {
        res.status(401).send("Invalid credentials");
    }
});

// === READ CONFIG ===
const version = fs.readFileSync(
    path.join(__dirname, "version.txt"),
    "utf8"
).trim();

const config = JSON.parse(
    fs.readFileSync(
        path.join(__dirname, "config.json"),
        "utf8"
    )
);

// === MODE 1 CORS ===
if (config.mode === "mode1") {
    app.use(cors());
}

// === CSP STRICT ===
if (config.mode === "csp-strict") {
    app.use((req, res, next) => {
        res.setHeader(
            "Content-Security-Policy",
            "default-src 'self';"
        );
        next();
    });
}

// === CSP BALANCED ===
if (config.mode === "csp-balanced") {
    app.use((req, res, next) => {
        res.setHeader(
            "Content-Security-Policy",
            "default-src 'self'; img-src *; style-src *; script-src 'self' http://localhost:4000 http://localhost:7000;"
        );
        next();
    });
}

// === EMAIL DATA ===
const emails = [
    {
        id: 1,
        sender: "Wolf@example.com",
        subject: "Welcome to SecureMail",
        body: "Hello John, welcome to SecureMail Pro."
    },
    {
        id: 2,
        sender: "Stash@example.com",
        subject: "Meeting Reminder",
        body: "John, don't forget our meeting at 3 PM today."
    }
];

// === API ===
app.get("/api/emails", (req, res) => {
    res.json(emails);
});

// === STATIC ===
app.use(express.static(path.join(__dirname)));

// === MAIN PAGE ===
app.get("/", (req, res) => {

    res.send(`
        <html>
        <head>
            <title>${config.appName}</title>
            <link rel="stylesheet" href="http://localhost:7000/styles.css">
        </head>

        <body>

            <div class="logo-container">
                <img src="http://localhost:7000/logo.png">
            </div>

            <h1>${config.appName}</h1>
            <p>Version: ${version}</p>

            <h2>Login</h2>

            <input id="username" placeholder="username">
            <input id="password" placeholder="password">

            <button onclick="login()">Login</button>

            <div id="status"></div>

            <div id="sidebar"></div>
            <div id="main">
                <p>Select an email to view its content</p>
            </div>

            <script src="http://localhost:7000/react-mock.js"></script>
            <script src="http://localhost:4000/support.js"></script>
            <script src="http://localhost:5000/weather-widget.js"></script>

            <script src="main.js"></script>

        </body>
        </html>
    `);
});

// === START ===
app.listen(3000, () => {
    console.log(`[System] Starting ${config.appName} v${version}...`);
    console.log(`Mode: ${config.mode}`);
    console.log("GoodHost running on http://localhost:3000");
});