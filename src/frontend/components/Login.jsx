import { useEffect, useState } from "react";
import { assignLocalToken, fetchLocalToken } from "../localDB.js";
import "../style/login.css";
import { useNavigate } from "react-router-dom";

const VERIFY_USER_URL = import.meta.env.VITE_VERIFY_USER_URL;

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.elements.email.value.trim();
    const password = e.target.elements.password.value;

    if (!email || !password) {
      alert("Both fields are required");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(VERIFY_USER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      //Check for successful login
      if (response.status === 200) {
        const { token } = await response.json();
        assignLocalToken(token);
        navigate("/home");
      } else if (response.status === 401) {
        alert("You are not authorized.");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please check your connection");
      console.error("Login error.", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = fetchLocalToken();
    if (token) {
      navigate("/home");
      return;
    }
  }, [navigate]);

  return (
    <div id="login-outer">
      <h1>Mind Matters (admin)</h1>
      <form onSubmit={handleSubmit} id="login-form">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email address"
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
        />
        <button disabled={loading}>{loading ? "Loading..." : "Submit"}</button>
      </form>
    </div>
  );
}
