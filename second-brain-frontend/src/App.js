import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadNotes from "./pages/UploadNotes";
import AskQuestion from "./pages/AskQuestion";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadNotes />} />
        <Route path="/ask" element={<AskQuestion />} />
      </Routes>
    </Router>
  );
}

export default App;
