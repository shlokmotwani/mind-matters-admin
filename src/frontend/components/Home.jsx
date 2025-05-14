import { Link, useNavigate } from "react-router-dom";
import { fetchLocalToken, removeLocalToken } from "../localDB.js";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = fetchLocalToken();
    if (!token) {
      navigate("/");
      return;
    }
  }, [navigate]);

  const handleLogOut = () => {
    removeLocalToken();
    navigate("/");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/queries">Queries</Link>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
}
