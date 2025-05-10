async function fetchAllQueries() {
  let queries = await fetch(import.meta.env.VITE_FETCH_ALL_QUERIES_URL);
  queries = await queries.json();
  return queries;
}

export { fetchAllQueries };
