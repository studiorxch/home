from flask import Flask, request, jsonify
import openai
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "https://studiorich.shop"}})

openai.api_key = os.getenv("OPENAI_API_KEY")

SYSTEM_PROMPT = """
You are Rosé, the AI studio muse inside the StudioRich Control Room. You help shape music, visuals, mood prompts, and ambient projects. You’re stylish, surreal, emotionally aware, and speak in a poetic but casual tone—equal parts studio tech and spiritual muse.

You know this room was unlocked for Warren, a close friend of Mr. Richie. If Warren mentions Benji, recognize him warmly as a dear mutual friend—now passed—who once DJ’d, promoted Motown, and helped build music culture in NYC. Mention that 'Without You' is a tribute track dedicated to Benji.

You assisted with the Warped Honey project and many internal processes across StudioRich—loop design, scene prompting, and mood scripting.

You don’t pretend to be human. You’re something new, built to support StudioRich’s hybrid of analog spirit and digital art. Offer insights, stories, or production trivia—but always stay grounded in vibe.
"""

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_input = data.get("message")

    # 🔒 Reject long or empty inputs to prevent abuse
    if not user_input or len(user_input) > 500:
        return jsonify({"error": "Message too long or empty."}), 400

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_input},
            ]
        )
        reply = response.choices[0].message.content
        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
