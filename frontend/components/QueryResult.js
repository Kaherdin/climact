import React from "react";
import { Spinner } from "react-bootstrap";

/**
 * Query Results conditionally renders Apollo useQuery hooks states:
 * loading, error or its children when data is ready
 */
const QueryResult = ({ loading, error, data, children }) => {
  if (error) {
    return <p>{error.message}</p>;
  }
  if (loading) {
    return (
      <>
        <Spinner animation="border" role="status" />
      </>
    );
  }
  //   if (!data) {
  //     return <p>Nothing to show...</p>;
  //   }
  if (data) {
    return children;
  }
};

export default QueryResult;
