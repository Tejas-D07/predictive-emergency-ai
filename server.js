const express = require("express");
const cors = require("cors");

const audioRoute = require("./routes/audio");
const alertRoute = require("./routes/alert");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/audio", audioRoute);
app.use("/api/alert", alertRoute);

app.listen(5002, () => {
    console.log("🚀 Backend running on http://localhost:5002");

    app.get("/", (req, res) => {
        res.send("✅ Backend is running");
    });
});