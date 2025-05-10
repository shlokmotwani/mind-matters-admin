import { useEffect, useState } from "react";
import { fetchAllQueries } from "./backend/fetchQueries";
import QueryTable from "./QueryTable";
import { Link } from "react-router-dom";

const LOCAL_STORAGE_TOKEN_VARIABLE_NAME = import.meta.env
  .VITE_LOCAL_STORAGE_TOKEN_VARIABLE;

export default function Queries() {
  const [queries, setQueries] = useState([]);
  useEffect(() => {
    async function fetchAll() {
      let response = await fetchAllQueries();
      setQueries(response);
    }
    fetchAll();

    return () => {
      setQueries([]);
    };
  }, []);

  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_VARIABLE_NAME);
  if (!token) {
    window.location.href = "/";
    return;
  }

  return (
    <div>
      <Link to="/">Home</Link>
      <h1>Queries</h1>
      {queries.length == 0 && <p>Loading ...</p>}
      {queries.length > 0 && <QueryTable queries={queries} />}
    </div>
  );
}
