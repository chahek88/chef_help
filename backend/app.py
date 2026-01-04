from dotenv import load_dotenv
load_dotenv()
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os, base64
import traceback

app = Flask(__name__)
CORS(app)

# Folder for uploaded images
UPLOAD_FOLDER = "static/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# OpenAI client (use environment variable)
client = OpenAI(api_key=os.getenv("enter_your_api_key"))

# ---------------- RECIPES API ----------------
@app.route("/api/recipes", methods=["POST"])
def recipes():
    data = request.get_json()
    ingredients = data.get("ingredients", "")

    prompt = f"""
    Suggest 2 simple vegetarian recipes using these ingredients:
    {ingredients}

    Provide short and easy cooking steps.
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )

    return jsonify({
        "result": response.choices[0].message.content
    })

# ---------------- LEFTOVER API ----------------
@app.route("/api/leftover", methods=["POST"])
def leftover():
    data = request.get_json()
    leftover_items = data.get("leftover", "")

    prompt = f"""
    Suggest creative vegetarian dishes that can be made using the following leftover food:
    {leftover_items}

    Keep the ideas simple and practical.
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )

    return jsonify({
        "result": response.choices[0].message.content
    })

# ---------------- IMAGE API ----------------
@app.route("/api/image", methods=["POST"])
def image():
    try:
        if "image" not in request.files:
            return jsonify({"success": False, "error": "No image provided"}), 400

        image_file = request.files["image"]
        image_bytes = image_file.read()
        image_base64 = base64.b64encode(image_bytes).decode("utf-8")

        response = client.responses.create(
            model="gpt-4.1-mini",
            input=[{
                "role": "user",
                "content":[
                    {
                      "type": "input_text",
                      "text": (
                       "You are a culinary expert helping a home cook.\n\n"
                       "Identify the food ingredient in the image.\n\n"
                       "Respond in clean paragraphs (not bullet points).\n"
                       "Use headings like:\n"
                       "Ingredient (most likely):\n"
                       "Possible alternatives:\n"
                       "How to distinguish at home:\n"
                       "Explain each section in 2–3 short sentences." )
                    },
                    {
                        "type": "input_image",
                        "image_url": f"data:image/jpeg;base64,{image_base64}"
                    }
                ]
            }]
        )

        # ✅ CORRECT extraction (official & safe)
        result_text = response.output_text

        if not result_text or not result_text.strip():
            result_text = "I can see a food ingredient in the image, but I could not confidently identify it."

        return jsonify({
            "success": True,
            "result": result_text.strip()
        })

    except Exception:
        print("IMAGE ANALYSIS ERROR")
        traceback.print_exc()
        return jsonify({"success": False, "error": "Failed to analyze image"}), 500
# ---------------- RUN APP ----------------
if __name__ == "__main__":
    app.run(port=5001, debug=True)

