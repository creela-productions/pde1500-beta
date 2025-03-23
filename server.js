const WebSocket = require("ws");

// Start WebSocket Server
const wss = new WebSocket.Server({ port: 8080 });

let worlds = {
  world1: { name: "Fantasy Land", players: 2 },
  world2: { name: "Sci-Fi Zone", players: 3 }
};

// Broadcast world list to all connected clients
function broadcastWorlds() {
  const worldList = JSON.stringify({ type: "world-list", worlds });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(worldList);
    }
  });
}

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.send(JSON.stringify({ type: "world-list", worlds }));

  ws.on("message", (message) => {
    const data = JSON.parse(message);
    if (data.type === "join-world") {
      if (worlds[data.world]) {
        worlds[data.world].players += 1;
        broadcastWorlds();
      }
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server running on ws://localhost:8080");
