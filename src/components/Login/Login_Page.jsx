import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";

export default function Login_Page() {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSignin() {
    if (Username === "" || Password === "") {
      alert("Enter valid Username and Password");
    } else {
      navigate("/Home");
    }
  }

  return (
    <div id="login-form">
      <h1>Sign In</h1>
      <form>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          value={Username}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={Password}
          required
        />
        <span>
          <button type="button" className="button-17" onClick={handleSignin}>
            Sign In
          </button>
          <Link to="/signup">
            <button type="button" className="button-17">
              Sign Up
            </button>
          </Link>
        </span>
      </form>
    </div>
  );
}
