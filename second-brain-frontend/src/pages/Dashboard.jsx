import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <Sidebar />
      <Navbar />

      {/* Main Content */}
      <div className="ml-64 pt-20 p-8">
        <h2 className="text-3xl font-bold mb-4">
          Welcome to Your Second Brain 🧠
        </h2>

        <p className="text-gray-400">
          Upload notes and ask questions to interact with your AI assistant.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;