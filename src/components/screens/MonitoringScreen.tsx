import { motion } from 'motion/react';
import { Mic, Navigation, Activity, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function MonitoringScreen({
  isActive,
  onToggle,
  onTriggerAlert
}: any) {

  const [riskScore, setRiskScore] = useState(0);
  const [statusText, setStatusText] = useState("Idle");
  const [soundLabel, setSoundLabel] = useState("None");

  // 🔥 MAIN DETECTION FUNCTION
  const runDetection = async () => {
    try {
      const audioRes = await fetch("http://localhost:5002/api/audio", {
        method: "POST"
      });

      const audioData = await audioRes.json();

      const position: any = await new Promise((resolve) =>
        navigator.geolocation.getCurrentPosition(
          resolve,
          () => resolve({ coords: { latitude: 0, longitude: 0 } })
        )
      );

      const alertRes = await fetch("http://localhost:5002/api/alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audioData,
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        })
      });

      const result = await alertRes.json();

      const score = Math.floor(audioData.confidence * 100);

      // 🔥 UI updates
      setRiskScore(score);
      setSoundLabel(audioData.sound);

      if (audioData.danger) {
        setStatusText(`⚠️ ${audioData.sound.toUpperCase()} DETECTED`);
      } else {
        setStatusText("Environment Safe");
      }

      if (result.status === "ALERT_TRIGGERED") {
        onTriggerAlert();
      }

    } catch (err) {
      console.error(err);
      setStatusText("Error");
    }
  };

  // 🔁 Continuous loop
  useEffect(() => {
    let interval: any;

    if (isActive) {
      runDetection();
      interval = setInterval(runDetection, 4000);
    } else {
      setRiskScore(0);
      setStatusText("Idle");
      setSoundLabel("None");
    }

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">

      {/* BUTTON */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
        className="w-60 h-60 rounded-full border-4 flex flex-col items-center justify-center border-blue-500"
      >
        <span className="text-2xl font-bold">
          {isActive ? "MONITORING" : "START"}
        </span>
      </motion.button>

      {/* STATUS */}
      <div className="mt-6 text-center">
        <p className="text-lg">{statusText}</p>
        <p className="text-sm text-gray-400 mt-2">
          Sound: {soundLabel}
        </p>
      </div>

      {/* RISK SCORE */}
      <div className="mt-6 w-64">
        <div className="text-center text-3xl font-bold">
          {riskScore}%
        </div>

        <div className="w-full bg-gray-800 h-2 mt-2 rounded">
          <div
            style={{ width: `${riskScore}%` }}
            className="bg-blue-500 h-full"
          />
        </div>
      </div>

      {/* TEST BUTTON */}
      <button
        onClick={runDetection}
        className="mt-6 px-4 py-2 bg-orange-500 rounded"
      >
        Test Detection
      </button>

    </div>
  );
}