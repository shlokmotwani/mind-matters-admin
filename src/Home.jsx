import { Link } from "react-router-dom";

const LOCAL_STORAGE_TOKEN_VARIABLE_NAME = import.meta.env
  .VITE_LOCAL_STORAGE_TOKEN_VARIABLE;

export default function Home() {
  function onLogOut() {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_VARIABLE_NAME);
    window.location.href = "/";
  }
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_VARIABLE_NAME);
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
