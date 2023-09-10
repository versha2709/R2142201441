// src/App.js
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import PrivateRoute from './PrivateRoute';
import Login from './Login';
import TrainList from './TrainList'; 
import TrainDetails from './TrainDetails'; 

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem('token'))
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isAuthenticated ? (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <PrivateRoute
          path="/private"
          element={<PrivateComponent />}
          isAuthenticated={isAuthenticated}
        />

    <Routes>
        <Route path="/" element={<TrainList />} />
        <Route path="/train/:trainNumber" element={<TrainDetails />} />
      </Routes>
      </Routes>
    </BrowserRouter>
  );
};

const Home = () => {
  return <h1>Home</h1>;
};

const PrivateComponent = () => {
  return <h1>Private Component (Authenticated)</h1>;
};

export default App;
