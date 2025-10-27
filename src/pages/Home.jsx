import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

const Home = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch 5 most recent posts
  useEffect(() => {
    const postsQuery = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc'),
      limit(5)
    );

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRecentPosts(postsData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching recent posts:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStartWriting = () => {
    if (currentUser) {
      navigate('/blog-feed');
    } else {
      navigate('/signup');
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Just now';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getContentSnippet = (content, maxLength = 150) => {
    if (!content) return '';
    return content.length > maxLength
      ? content.substring(0, maxLength) + '...'
      : content;
  };

  const handlePostClick = (postId) => {
    navigate('/blog-feed');
  };
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Blogify ✨</h1>
          <p className="hero-subtitle">
            Discover stories, share your thoughts, and connect through words.
          </p>
          
          <div className="hero-buttons">
            <button 
              className="btn btn-hero btn-primary"
              onClick={handleStartWriting}
            >
              ✍️ Start Writing
            </button>
            <button 
              className="btn btn-hero btn-secondary"
              onClick={() => navigate('/blog-feed')}
            >
              📚 Explore All Posts
            </button>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="recent-posts">
        <div className="recent-posts-container">
          <h2 className="section-title">Recent Posts</h2>
          
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading recent posts...</p>
            </div>
          ) : recentPosts.length === 0 ? (
            <div className="empty-state">
              <p className="empty-message">No posts yet — be the first to write!</p>
              <button 
                className="btn btn-primary"
                onClick={handleStartWriting}
              >
                Write First Post
              </button>
            </div>
          ) : (
            <div className="posts-grid">
              {recentPosts.map((post) => (
                <article 
                  key={post.id} 
                  className="post-card"
                  onClick={() => handlePostClick(post.id)}
                >
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-snippet">
                    {getContentSnippet(post.content)}
                  </p>
                  <div className="post-meta">
                    <span className="post-author">👤 {post.authorName || post.authorEmail}</span>
                    <span className="post-date">📅 {formatDate(post.createdAt)}</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>© 2025 Blogify. Built with Firebase + React.</p>
      </footer>
    </div>
  );
};

export default Home;
