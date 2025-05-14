import "../style/querytable.css";

export default function QueryTable({ queries }) {
  return (
    <div id="query-table">
      <table>
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Query</th>
            <th>createdAt</th>
          </tr>
        </thead>
        <tbody>
          {queries.map((query, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{query.fullName}</td>
                <td>{query.email}</td>
                <td>{query.contact}</td>
                <td>{query.message}</td>
                <td>{query.createdAt}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
