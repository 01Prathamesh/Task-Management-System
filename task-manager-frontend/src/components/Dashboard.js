import React from 'react';

function Dashboard({ token, handleLogout }) {
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>You are logged in with token: {token}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
