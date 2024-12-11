import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

function App() {
  // Check if token exists in localStorage and set it in state
  const [token, setToken] = useState(localStorage.getItem('token')); 

  // Whenever token changes, update localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token); // Store token in localStorage
    } else {
      localStorage.removeItem('token'); // Remove token from localStorage on logout
    }
  }, [token]);

  // Handle logout by removing token
  const handleLogout = () => {
    setToken(null); // Remove token from state
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Task Manager</h1>
          <nav>
            <ul>
              {!token ? (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/signup">Signup</Link>
                  </li>
                </>
              ) : (
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
        </header>

        <main>
          <Switch>
            <Route path="/login">
              <Login setToken={setToken} />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/dashboard">
              {token ? (
                <Dashboard token={token} handleLogout={handleLogout} />
              ) : (
                <Login setToken={setToken} />
              )}
            </Route>
            <Route path="/">
              {token ? (
                <Dashboard token={token} handleLogout={handleLogout} />
              ) : (
                <Login setToken={setToken} />
              )}
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
