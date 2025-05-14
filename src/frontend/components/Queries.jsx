import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import QueryTable from "./QueryTable";
import { fetchLocalToken } from "../localDB.js";

const FETCH_ALL_QUERIES_URL = import.meta.env.VITE_FETCH_ALL_QUERIES_URL;

export default function Queries() {
  const [queries, setQueries] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = fetchLocalToken();
    if (!token) {
      navigate("/");
      return;
    }

    async function fetchAll() {
      try {
        const response = await fetch(FETCH_ALL_QUERIES_URL, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch queries");
        }

        const data = await response.json();
        setQueries(data);
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching queries.");
      } finally {
        setFetched(true);
      }
    }
    fetchAll();
  }, []);

  return (
    <div>
      <Link to="/">Home</Link>
      <h1>Queries</h1>
      {!fetched && <p>Loading ...</p>}
      {fetched && error && <p>{error}</p>}
      {fetched && queries.length === 0 && !error && <p>Nothing to show</p>}
      {queries.length > 0 && <QueryTable queries={queries} />}
    </div>
  );
}
