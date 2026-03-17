const express = require("express");
const cors = require("cors");

const app = express();

// Mode1: дозволяємо всі origin
app.use(cors());

app.use(express.static(__dirname));

// API нових повідомлень
app.get("/new-messages", (req, res) => {
    res.json({ count: 2 });
});

app.listen(4000, () => {
    console.log("TrustCo running on http://localhost:4000");
});