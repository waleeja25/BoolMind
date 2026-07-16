import "reflect-metadata"
import express from "express";
// import router from "./routes/index.js";
// import { connectDB } from "./config/db.js";

const app = express();
const PORT = 5000;

app.use(express.json());
// app.use("/api", router);

// app.get("/", (req, res) => {
//   res.send("Server is running!");
// });
// connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});