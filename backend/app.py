from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import PyPDF2
import ollama

app = Flask(__name__)

# Allow requests from your Vercel frontend
CORS(app, origins=["https://second-brain-frontend-h6ky6rynu-balasantis-projects.vercel.app"])

# Upload folder
UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

stored_text = ""

# -----------------------
# LOGIN
# -----------------------
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    # You can replace these with environment variables later
    if data["email"] == "admin@gmail.com" and data["password"] == "123":
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"message": "Invalid credentials"}), 401

# -----------------------
# UPLOAD PDF
# -----------------------
@app.route("/upload", methods=["POST"])
def upload():
    global stored_text

    if "file" not in request.files:
        return jsonify({"message": "No file part"}), 400

    file = request.files["file"]
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    reader = PyPDF2.PdfReader(filepath)
    stored_text = ""

    for page in reader.pages:
        stored_text += page.extract_text() or ""

    return jsonify({"message": "File uploaded"}), 200

# -----------------------
# ASK AI
# -----------------------
@app.route("/ask", methods=["POST"])
def ask():
    question = request.json.get("question", "")
    if not question:
        return jsonify({"answer": "No question provided"}), 400

    prompt = f"""
    Answer based on this PDF content:

    {stored_text}

    Question: {question}
    """

    response = ollama.chat(
        model="phi",
        messages=[{"role": "user", "content": prompt}]
    )

    answer = response["message"]["content"]

    return jsonify({"answer": answer}), 200

# -----------------------
# START SERVER
# -----------------------
if __name__ == "__main__":
    # Use Render-provided port or default 5000
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)