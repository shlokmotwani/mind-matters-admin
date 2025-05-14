import { assignLocalToken, fetchLocalToken } from "../localDB.js";
import "../style/login.css";
const VERIFY_USER_URL = import.meta.env.VITE_VERIFY_USER_URL;

export default function Login() {
  async function onSubmit(e) {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    let response = await fetch(VERIFY_USER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    //TODO: Check for successful login
    if (response.status === 200) {
      const responseJSON = await response.json();
      assignLocalToken(responseJSON.token);
      window.location.href = "/home";
    } else if (response.status === 401) {
      alert("You are not authorized.");
    } else {
      alert("Forbidden");
    }
  }

  const token = fetchLocalToken();
  if (token) {
    window.location.href = "/home";
    return;
  }

  return (
    <div id="login-outer">
      <h1>Mind Matters (admin)</h1>
      <form onSubmit={onSubmit} id="login-form">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email address"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
