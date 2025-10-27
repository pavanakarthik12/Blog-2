import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './BlogFeed.css';

const BlogFeed = () => {
  const { currentUser } = useAuth();

  return (
    <div className="blog-feed-page">
      <div className="blog-feed-container">
        <header className="blog-feed-header">
          <h1>📰 Blog Feed</h1>
          <p>Discover stories from our community</p>
        </header>

        <div className="blog-feed-content">
          <div className="welcome-message">
            <h2>Welcome, {currentUser?.displayName || 'Blogger'}! 👋</h2>
            <p>Your personalized blog feed is coming soon.</p>
          </div>

          {/* Placeholder for future blog posts */}
          <div className="placeholder-section">
            <div className="placeholder-card">
              <div className="placeholder-icon">📝</div>
              <h3>No Posts Yet</h3>
              <p>Start creating your first blog post to see it here!</p>
              <button className="btn btn-primary" style={{ marginTop: '1rem' }}>
                Create Your First Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogFeed;
