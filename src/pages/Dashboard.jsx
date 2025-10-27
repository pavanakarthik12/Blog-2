import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { currentUser } = useAuth();

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>📊 Dashboard</h1>
          <p>Manage your account and content</p>
        </header>

        <div className="dashboard-content">
          {/* User Info Card */}
          <div className="dashboard-card">
            <h2>👤 Account Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Name:</span>
                <span className="info-value">
                  {currentUser?.displayName || 'Not set'}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{currentUser?.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">User ID:</span>
                <span className="info-value">{currentUser?.uid}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Account Created:</span>
                <span className="info-value">
                  {formatDate(currentUser?.metadata?.creationTime)}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Last Sign In:</span>
                <span className="info-value">
                  {formatDate(currentUser?.metadata?.lastSignInTime)}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Email Verified:</span>
                <span className="info-value">
                  {currentUser?.emailVerified ? '✅ Yes' : '❌ No'}
                </span>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="dashboard-card">
            <h2>📈 Your Stats</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">0</div>
                <div className="stat-label">Posts</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">0</div>
                <div className="stat-label">Followers</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">0</div>
                <div className="stat-label">Following</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">0</div>
                <div className="stat-label">Likes</div>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="dashboard-card">
            <h2>⚡ Quick Actions</h2>
            <div className="actions-grid">
              <button className="action-btn">
                <span className="action-icon">✍️</span>
                <span>Write New Post</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">⚙️</span>
                <span>Edit Profile</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">🔔</span>
                <span>Notifications</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">📊</span>
                <span>Analytics</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
