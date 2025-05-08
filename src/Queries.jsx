import { useEffect, useState } from "react";
import { fetchAllQueries } from "./fetchQueries";
import QueryTable from "./QueryTable";

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

  return (
    <div>
      <h1>Queries</h1>
      {queries.length == 0 && <p>Loading ...</p>}
      {queries.length > 0 && <QueryTable queries={queries} />}
    </div>
  );
}
