import React from 'react';
import Hero from '../components/Hero';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      
      <section className="features">
        <div className="features-content">
          <h2 className="features-title">Why Blogify?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Easy to Use</h3>
              <p>Start writing and sharing your thoughts with just a few clicks.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>Share Globally</h3>
              <p>Connect with readers from around the world.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Express Yourself</h3>
              <p>Customize your blog and make it uniquely yours.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>Your data is protected with Firebase security.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
