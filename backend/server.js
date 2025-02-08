import express from 'express';
import cors from 'cors';
import { connectDB } from "./config/db.js";
import router from "./routes/commonRoute.js";

const PORT = process.env.PORT || 5000;

const app = express();

// ✅ Enable CORS (Allow frontend to make requests)
app.use(cors({
	origin: "http://localhost:5173", // Allow frontend origin
	methods: ["GET", "POST", "PUT", "DELETE"], // Allowed request methods
	allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
}));
  
app.use(express.json());

app.use("", router);

app.listen(PORT, () => {
	connectDB();
	console.log("server started at http://localhost:" + PORT);
});




