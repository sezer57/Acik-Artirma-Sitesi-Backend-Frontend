import React, { useState, useContext } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedIn } = useContext(AuthContext);
  const nav = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to log in");
      }
      alert("KAYIT BAŞARILI!");
      nav("/login");
    } catch (error) {
      alert("Hata oluştu tekrar deneyiniz!");
      console.error(error);
    }
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <form onSubmit={handleSubmit} className="login-form">
        <p>Kayıt Olmak İçin Gerkeli Yerleri Doldurun</p>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
