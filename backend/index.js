import cors from "cors"; // Cross Origin Resource Sharing
import express from "express"; // Express framework
import session from "express-session";
import { createProxyMiddleware } from "http-proxy-middleware";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const devMode = process.env.DEV === "true";

let sessionConfig = {
  name: "sessionId",
  secret: process.env.SESSION_SECRET_KEY,
  cookie: {
    maxAge: 1000 * 60 * 5,
    secure: devMode ? true : false,
    httpOnly: false,
  },
  resave: false,
  saveUninitialized: false,
};

// Import routes for the API
import apiRouter from "./routes/api_v1.js";

//Create Constants and setup app
const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all requests
app.use(morgan("dev")); // Log requests to the console in DEV format
app.set("trust proxy", 1); // works alongside "secure" cookie setting
app.use(session(sessionConfig)); // Initializes session management with the specified configuration.
const port = 3000;

// Both API and static assets (the React app) served from same origin
if (!devMode) {
  console.log("running in PROD");
  app.use(express.static(path.join(__dirname, "../frontend", "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
} else {
  console.log("running in DEV");
  app.use(
    "/",
    createProxyMiddleware({
      target: "http://localhost:5173",
      changeOrigin: true,
      ws: true,
    })
  );
}

// Routes
app.use("/api/v1", apiRouter);

// Tell that the server is starting
app.listen(port, () => {
  console.log(`Server Started at http://localhost:${port}`);
});
