import React, { useEffect, useState } from 'react';

const TrainList = () => {
  const [trains, setTrains] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch train data from your API
    // Replace '/api/trains' with your actual API endpoint
    fetch('/api/trains')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setTrains(data))
      .catch((error) => setError(error)); // Handle the error
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>; // Display the error message
  }

  return (
    <div className="train-list">
      <h1>All Trains</h1>
      <ul>
        {trains.map((train) => (
          <li key={train.trainNumber}>{train.trainName}</li>
        ))}
      </ul>
    </div>
  );
};

export default TrainList;