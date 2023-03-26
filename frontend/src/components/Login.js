import React, { useState, useContext } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import Cookies from "js-cookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedIn } = useContext(AuthContext);
  const nav = useNavigate();
  //const cookies = new Cookies();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to log in");
      }

      const responseBody = await response.text();
      if (responseBody.startsWith("login succes")) {
        const cookieValue = responseBody.split("cookie: ")[1];
        Cookies.set("JSESSIONID", cookieValue);
        localStorage.setItem("cookie", cookieValue); // Store the cookie in localStorage
        localStorage.setItem("username", username); // Store the username in localStorage
      }
      setLoggedIn(true);

      alert("giriş başarılı");
      nav("/");
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
        <p>Giriş Yapınız</p>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
