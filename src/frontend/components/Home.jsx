import { Link } from "react-router-dom";
import { fetchLocalToken, removeLocalToken } from "../localDB.js";

function onLogOut() {
  removeLocalToken();
  window.location.href = "/";
}

export default function Home() {
  const token = fetchLocalToken();
  if (!token) {
    window.location.href = "/";
    return;
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/queries">Queries</Link>
      <button onClick={onLogOut}>Log Out</button>
    </div>
  );
}
