// Node Module Imports
import cors from "cors"; // Cross Origin Resource Sharing
import express from "express"; // Express framework
import session from "express-session"; // Session management

// Local Imports
import apiRouter from "#routes/api_v1.js";

const dev = process.env.DEV === "true"; // Check if we are in development mode

//Create Constants and setup app
const app = express();
app.use(express.json());

// Enable CORS
app.use(
  cors({
    credentials: true,
    origin: dev ? "http://localhost:5173" : process.env.FRONTEND_URL, // Replace with your client's origin
  })
);
const port = 3000;

// Session Configuration
let sessionConfig = {
  name: "sessionId",
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 5, // 5 hours
    secure: dev ? false : true,
    httpOnly: true,
    sameSite: dev ? "lax" : "none",
  },
  resave: false,
  saveUninitialized: false,
};

app.set("trust proxy", true); // works alongside "secure" cookie setting
app.use(session(sessionConfig)); // Tell the app to use the session middleware

// Default path
app.get("/", (req, res) => {
  res.send("It works!");
});

// Routes
app.use("/api/v1", apiRouter);

// Tell that the server is starting
app.listen(port, () => {
  console.log(`Server Started at http://localhost:${port}`);
});

export default app;
