const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./routes/auth.routes");
const errorMiddleware = require("./middleware/error.middleware");
const visitorRoutes = require("./routes/visitor.routes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Visitor API is running" });
});

app.get("/healthEx", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Visitor API is healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});


app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Visitor API is healthy",
  });
});

app.use("/api/auth", authRoutes);

app.use(errorMiddleware);

app.use("/api/visitors", visitorRoutes);

module.exports = app;