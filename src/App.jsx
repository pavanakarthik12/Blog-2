import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import './App.css';

function Home() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };

  return (
    <div className="page">
      <h1>🔥 Welcome to Blogify!</h1>
      <div className="status-card">
        <h2>Dashboard</h2>
        <p>✅ You are logged in as <strong>{currentUser?.email}</strong></p>
        {currentUser?.displayName && (
          <p>👤 Name: <strong>{currentUser.displayName}</strong></p>
        )}
        <button onClick={handleLogout} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Logout
        </button>
      </div>
      <div className="info">
        <p><strong>Project ID:</strong> {import.meta.env.VITE_FIREBASE_PROJECT_ID}</p>
        <p><strong>Auth Domain:</strong> {import.meta.env.VITE_FIREBASE_AUTH_DOMAIN}</p>
        <p><strong>User ID:</strong> {currentUser?.uid}</p>
      </div>
    </div>
  );
}

function About() {
  const { currentUser } = useAuth();

  return (
    <div className="page">
      <h1>About Blogify</h1>
      <div className="status-card">
        <p>Blogify is a modern blogging platform built with React and Firebase.</p>
        <p>Create, share, and discover amazing content!</p>
        {currentUser && (
          <p style={{ marginTop: '1rem' }}>✅ Logged in as: <strong>{currentUser.email}</strong></p>
        )}
      </div>
    </div>
  );
}

function App() {
  const { currentUser } = useAuth();

  return (
    <div className="App">
      {currentUser && (
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      )}
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
