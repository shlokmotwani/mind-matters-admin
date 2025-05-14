import { useEffect, useState } from "react";
import QueryTable from "./QueryTable";
import { Link } from "react-router-dom";
import { fetchLocalToken } from "../localDB.js";
const FETCH_ALL_QUERIES_URL = import.meta.env.VITE_FETCH_ALL_QUERIES_URL;

export default function Queries() {
  const [queries, setQueries] = useState([]);
  const [fetched, setFetched] = useState(false);
  useEffect(() => {
    async function fetchAll() {
      const token = fetchLocalToken();
      let response = await fetch(FETCH_ALL_QUERIES_URL, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      response = await response.json();
      setQueries(response);
      setFetched(true);
    }
    fetchAll();

    return () => {
      setQueries([]);
      setFetched(false);
    };
  }, []);

  const token = fetchLocalToken();
  if (!token) {
    window.location.href = "/";
    return;
  }

  return (
    <div>
      <Link to="/">Home</Link>
      <h1>Queries</h1>
      {!fetched && queries.length == 0 && <p>Loading ...</p>}
      {fetched && queries.length == 0 && <p>Nothing to show</p>}
      {queries.length > 0 && <QueryTable queries={queries} />}
    </div>
  );
}
