import "./App.css";
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Products from "./components/Product";
import Register from "./components/Register";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthProvider } from "./AuthContext";
import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Cookies from "js-cookie";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const cookie = localStorage.getItem("cookie");
    const username = localStorage.getItem("username");

    if (cookie && username) {
      Cookies.set("JSESSIONID", cookie);
      setLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      <div>
        <Header />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
