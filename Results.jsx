import React from "react";
import Card from "./Card";

function Results({ results, onSearch, currentPage, totalPages, onPageChange }) {
  return (
    <>
      <div id="results">
      <button onClick={onSearch} class="search-btn">Search</button>
      <h2>Results:</h2>
      <div id="cards">
        {results.length > 0 ? (
          results.map((result, index) => (
            <Card key={index} data={result} />
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
      <div className="pagination">
        <button 
          disabled={currentPage === 1} 
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          disabled={currentPage === totalPages} 
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
      </div>
    </>
  );
}

export default Results;
