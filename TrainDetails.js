import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TrainDetails = () => {
  const [train, setTrain] = useState({});
  const [error, setError] = useState(null);
  const { trainNumber } = useParams();

  useEffect(() => {
    // Fetch details for a specific train from your API
    // Replace '/api/trains/{trainNumber}' with your actual API endpoint
    fetch(`/api/trains/${trainNumber}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setTrain(data))
      .catch((error) => setError(error)); // Handle the error
  }, [trainNumber]);

  if (error) {
    return <div>Error: {error.message}</div>; // Display the error message
  }

  return (
    <div className="train-details">
      <h1>Train Details</h1>
      <p>Train Name: {train.trainName}</p>
      {/* Display other train details here */}
    </div>
  );
};

export default TrainDetails;