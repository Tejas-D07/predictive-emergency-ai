import json
import random

sounds = ["safe", "scream", "glass_break", "gunshot"]

choice = random.choice(sounds)

danger = choice != "safe"

print(json.dumps({
    "sound": choice,
    "confidence": round(random.uniform(0.6, 0.95), 2),
    "danger": danger
}))