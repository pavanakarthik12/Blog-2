import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Hero.css';

const Hero = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Blogify ✍️</h1>
        <p className="hero-subtitle">
          A place to share your stories, thoughts, and creativity.
        </p>
        
        <div className="hero-buttons">
          {currentUser ? (
            <button 
              className="btn btn-hero btn-primary"
              onClick={() => navigate('/blog-feed')}
            >
              Go to Blog Feed
            </button>
          ) : (
            <>
              <button 
                className="btn btn-hero btn-primary"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
              <button 
                className="btn btn-hero btn-secondary"
                onClick={() => navigate('/signup')}
              >
                Signup
              </button>
            </>
          )}
        </div>
        
        {currentUser && (
          <p className="hero-welcome">
            👋 Welcome back, <strong>{currentUser.displayName || currentUser.email}</strong>!
          </p>
        )}
      </div>
    </section>
  );
};

export default Hero;
