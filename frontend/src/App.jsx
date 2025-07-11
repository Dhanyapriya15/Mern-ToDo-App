import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwt"));

  // Keep token in sync if user logs in during the session
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("jwt"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/home"
          element={token ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
