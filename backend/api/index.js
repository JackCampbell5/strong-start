import cors from "cors"; // Cross Origin Resource Sharing
import express from "express"; // Express framework

// Import routes for the API
import apiRouter from "#routes/api_v1.js";

//Create Constants and setup app
const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all requests
const port = 3000;

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
