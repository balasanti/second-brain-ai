import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-black text-white p-6 border-r border-gray-800">
      <h2 className="text-2xl font-bold text-green-400 mb-8">
        🧠 Second Brain
      </h2>

      <nav className="space-y-4">
        <Link
          to="/dashboard"
          className={`block p-2 rounded ${
            location.pathname === "/dashboard"
              ? "bg-green-500 text-black"
              : "hover:bg-gray-800"
          }`}
        >
          Dashboard
        </Link>

        <Link
          to="/upload"
          className={`block p-2 rounded ${
            location.pathname === "/upload"
              ? "bg-green-500 text-black"
              : "hover:bg-gray-800"
          }`}
        >
          Upload Notes
        </Link>

        <Link
          to="/ask"
          className={`block p-2 rounded ${
            location.pathname === "/ask"
              ? "bg-green-500 text-black"
              : "hover:bg-gray-800"
          }`}
        >
          Ask AI
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;