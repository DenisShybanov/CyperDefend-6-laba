const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// режими
let breachMode = false;

// переключення режиму через URL
app.get("/mode/:type", (req, res) => {
    const type = req.params.type;

    if (type === "breach") {
        breachMode = true;
        console.log("Breach Mode ON");
        res.send("Breach Mode ON");
    } else {
        breachMode = false;
        console.log("Normal Mode ON");
        res.send("Normal Mode ON");
    }
});

// проксі
app.use(
    "/",
    createProxyMiddleware({
        target: "http://localhost:3000",
        changeOrigin: true,

        onProxyReq: (proxyReq, req, res) => {
            if (breachMode) {
                const cookies = req.headers.cookie;

                if (cookies) {
                    console.log("🍪 Intercepted Cookies:", cookies);
                } else {
                    console.log("No cookies");
                }
            }
        }
    })
);

app.listen(8080, () => {
    console.log("Proxy running on http://localhost:8080");
});