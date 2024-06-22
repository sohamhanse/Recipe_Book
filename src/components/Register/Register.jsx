import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/LoginForm.css";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSingup() {
    if (username === "" || password === "" || email === "") {
      alert("Enter valid Username and Password");
    } else {
      try {
        const response = await axios.post(
          "https://recipe-backend-qgg0.onrender.com/register",
          {
            username: username,
            password: password,
            email: email,
          }
        );
        console.log(response.data);
        navigate("/");
      } catch (error) {
        console.error(error.response.data);
        alert("Signup failed. Please check your credentials.");
      }
    }
  }

  return (
    <div id="login-form">
      <h1>Sign Up</h1>
      <form onSubmit={handleSingup}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <span id="spansignup">
          <button type="submit" className="button-17">
            Sign Up
          </button>
        </span>
      </form>
    </div>
  );
}
