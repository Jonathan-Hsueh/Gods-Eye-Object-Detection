import React from 'react';

const ResultsDisplay = ({ result }) => {
  return (
    <div className="results-display">
      {result ? <p>Detection Result: {result}</p> : <p>No results yet</p>}
    </div>
  );
};

export default ResultsDisplay;
