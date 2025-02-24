import React from 'react';

function Welcome({ onStart }) {
  return (
    <div className="welcome-container">
      <h1>Which Gap Is Costing You the Most?</h1>
      <p className="hook">
        Are you losing ground because of hidden learning failures? Take this quick assessment...
      </p>
      <div className="instructions">
        <p>In the next 5 minutes, you'll:</p>
        <ul>
          <li>Review simple statements about learning in your organization</li>
          <li>Check the ones that resonate with your experience</li>
          <li>Discover which gap might be holding you back the most</li>
        </ul>
      </div>
      <button className="primary-button" onClick={onStart}>
        Start Assessment
      </button>
    </div>
  );
}

export default Welcome; 