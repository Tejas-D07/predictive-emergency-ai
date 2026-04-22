const express = require("express");
const { spawn } = require("child_process");

const router = express.Router();

router.get("/", (req, res) => {

    res.json({
        sound: "test",
        confidence: 0.8,
        danger: true
    })

    let data = "";

    python.stdout.on("data", (chunk) => {
        data += chunk.toString();
    });

    python.stderr.on("data", (err) => {
        console.error("Python error:", err.toString());
    });

    python.on("close", () => {
        try {
            res.json(JSON.parse(data));
        } catch {
            res.status(500).json({ error: "Invalid AI response" });
        }
    });
});

module.exports = router;