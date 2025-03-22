const express = require("express");
const WebSocket = require("ws");
const path = require("path");

const PORT = process.env.PORT || 10000;
const app = express();
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    console.log("New client connected");
    ws.send("Welcome to the WebSocket server!");

    ws.on("message", (message) => {
        console.log(`Received: ${message}`);
        ws.send(`Echo: ${message}`);
    });

    ws.on("close", () => console.log("Client disconnected"));
});

// Serve static files (including index.html)
app.use(express.static(__dirname));

// Serve index.html for root requests
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});
