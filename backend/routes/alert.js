const express = require("express");

const router = express.Router();

// 🔥 Memory for danger confirmation
let dangerCount = 0;
let lastDetectionTime = Date.now();

router.post("/", (req, res) => {
    const { audioData, location } = req.body;

    const now = Date.now();

    // Reset if too much gap (avoid old triggers)
    if (now - lastDetectionTime > 10000) {
        dangerCount = 0;
    }

    lastDetectionTime = now;

    // Count danger signals
    if (audioData.danger) {
        dangerCount++;
        console.log("⚠️ Danger signal count:", dangerCount);
    } else {
        dangerCount = 0;
    }

    // 🔥 Trigger only after 2 confirmations
    if (dangerCount >= 2) {
        console.log("🚨 CONFIRMED ALERT");
        console.log("Sound:", audioData.sound);
        console.log("Location:", location);

        dangerCount = 0; // reset

        return res.json({ status: "ALERT_TRIGGERED" });
    }

    res.json({ status: "SAFE" });
});

module.exports = router;