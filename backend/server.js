const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/contact", (req, res) => {
  const newMessage = req.body;

  let messages = [];

  if (fs.existsSync("messages.json")) {
    const data = fs.readFileSync("messages.json");
    messages = JSON.parse(data);
  }

  messages.push(newMessage);
  fs.writeFileSync("messages.json", JSON.stringify(messages, null, 2));

  res.json({ message: "Message stored successfully" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});