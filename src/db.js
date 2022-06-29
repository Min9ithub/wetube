import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

const handleOpen = () => console.log("✔ Connected to DB ");
const handleError = (error) => console.log("❌ DB Error", error);

db.once("open", handleOpen);
db.on("error", handleError);

// once는 한번만 나타남, on은 여러번 나타낼 수 있음