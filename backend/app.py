from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import PyPDF2
import ollama

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

stored_text = ""

# LOGIN
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    if data["email"] == "admin@gmail.com" and data["password"] == "123":
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"message": "Invalid credentials"}), 401


# UPLOAD PDF
@app.route("/upload", methods=["POST"])
def upload():
    global stored_text

    file = request.files["file"]
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    reader = PyPDF2.PdfReader(filepath)
    stored_text = ""

    for page in reader.pages:
        stored_text += page.extract_text()

    return jsonify({"message": "File uploaded"})


# ASK AI (FREE using Ollama)
@app.route("/ask", methods=["POST"])
def ask():
    question = request.json["question"]

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

    return jsonify({"answer": answer})


if __name__ == "__main__":
    app.run(debug=True, port=5000)