import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  // Dynamic Page Title
  const getTitle = () => {
    if (location.pathname === "/dashboard") return "Dashboard";
    if (location.pathname === "/upload") return "Upload Notes";
    if (location.pathname === "/ask") return "Ask AI";
    return "";
  };

  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-gray-900 text-white flex items-center justify-between px-6 shadow-md z-50">
      <h1 className="text-xl font-semibold">{getTitle()}</h1>

      <button
        onClick={handleLogout}
        className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-black font-semibold"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;