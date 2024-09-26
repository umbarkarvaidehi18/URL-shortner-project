import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/dbConfig";
import shortUrl from "./routes/shortUrl";
dotenv.config();
connectDb();

const port = process.env.PORT || 5001;

const app = express();
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
//routes
app.use("/api/", shortUrl);

//server setup
app.listen(port, () => {
  console.log(`server started on port:${port}`);
});
