// import '@dotenvx/dotenvx/config'
const FETCH_ALL_QUERIES_URL = "http://localhost:3000/queries";

async function fetchAllQueries() {
  let queries = await fetch(FETCH_ALL_QUERIES_URL);
  queries = await queries.json();
  return queries;
}

export { fetchAllQueries };
