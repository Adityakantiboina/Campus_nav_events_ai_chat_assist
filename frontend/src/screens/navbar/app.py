from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import json
import os
from chat import generate_llm_response

app = Flask(__name__)
CORS(app)

@app.route('/generate-response', methods=['POST'])
def generate_response():
    data = request.json
    prompt = data.get("prompt")

    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    english_text = generate_llm_response(prompt)
    print(english_text, "             #######")

    json_data = {
        "englishText": english_text,  
    }

    try:
        with open('saved_data.json', 'w') as f:
            json.dump(json_data, f, indent=4)
        print("JSON data saved successfully.")
    except Exception as e:
        print("Error saving JSON data:", e)
        return jsonify({"error": "Failed to save JSON data"}), 500

    return jsonify(json_data)

if __name__ == '__main__':  # Corrected this line
    app.run(host="0.0.0.0",port=4000,debug=True)
