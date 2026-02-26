import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function UploadNotes() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <Sidebar />
      <Navbar />

      <div className="ml-64 mt-16 p-8">
        <h2 className="text-3xl font-bold mb-6">Upload Notes 📄</h2>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 w-full max-w-lg">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full text-gray-400"
          />

          <button
            onClick={handleUpload}
            className="mt-4 w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded-lg"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadNotes;
