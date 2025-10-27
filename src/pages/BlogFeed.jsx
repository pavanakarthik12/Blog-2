import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { fetchPosts, deletePost } from '../utils/PostManager';
import PostEditor from '../components/PostEditor';
import DeleteModal from '../components/DeleteModal';
import './BlogFeed.css';

const BlogFeed = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [expandedPosts, setExpandedPosts] = useState(new Set());
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, post: null });
  const [deleting, setDeleting] = useState(false);

  // Fetch posts from Realtime Database
  useEffect(() => {
    const unsubscribe = fetchPosts((postsData) => {
      setPosts(postsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleCreatePost = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setEditingPost(null);
    setShowEditor(true);
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setShowEditor(true);
  };

  const handleDeleteClick = (post) => {
    setDeleteModal({ isOpen: true, post });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.post) return;

    try {
      setDeleting(true);
      await deletePost(deleteModal.post.id);
      setDeleteModal({ isOpen: false, post: null });
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  const toggleExpand = (postId) => {
    setExpandedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Just now';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getContentSnippet = (content, maxLength = 150) => {
    if (!content) return '';
    return content.length > maxLength
      ? content.substring(0, maxLength) + '...'
      : content;
  };

  const isAuthor = (post) => {
    return currentUser && post.authorId === currentUser.uid;
  };

  if (showEditor) {
    return (
      <div className="blog-feed-page">
        <div className="editor-container">
          <PostEditor
            post={editingPost}
            onClose={() => {
              setShowEditor(false);
              setEditingPost(null);
            }}
            onSuccess={() => {
              setShowEditor(false);
              setEditingPost(null);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="blog-feed-page">
      {/* Hero Section */}
      <section className="feed-hero">
        <div className="hero-content">
          <h1 className="hero-title">Explore the Latest Posts 📰</h1>
          <p className="hero-subtitle">
            Read what others are sharing, or start your own story today!
          </p>
          
          <div className="hero-buttons">
            {currentUser ? (
              <>
                <button className="btn btn-hero btn-primary" onClick={handleCreatePost}>
                  ✍️ Create a New Post
                </button>
                <button className="btn btn-hero btn-secondary" onClick={() => navigate('/dashboard')}>
                  📊 Go to Dashboard
                </button>
              </>
            ) : (
              <button className="btn btn-hero btn-primary" onClick={() => navigate('/login')}>
                🔐 Login to Post
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Blog Feed Section */}
      <section className="feed-section">
        <div className="feed-container">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No Posts Yet</h3>
              <p>Be the first to share your story with the community!</p>
              {currentUser && (
                <button className="btn btn-primary" onClick={handleCreatePost}>
                  Create First Post
                </button>
              )}
            </div>
          ) : (
            <div className="posts-grid">
              {posts.map((post) => {
                const isExpanded = expandedPosts.has(post.id);
                const showFullContent = isExpanded || (post.content && post.content.length <= 150);
                
                return (
                  <article key={post.id} className="post-card">
                    <div className="post-header">
                      <h2 className="post-title">{post.title}</h2>
                      <div className="post-meta">
                        <span className="post-author">👤 {post.authorName || post.authorEmail}</span>
                        <span className="post-date">🕒 {formatDate(post.createdAt)}</span>
                      </div>
                    </div>

                    <div className="post-content">
                      <p>
                        {showFullContent
                          ? post.content
                          : getContentSnippet(post.content)}
                      </p>
                      {post.content && post.content.length > 150 && (
                        <button
                          className="read-more-btn"
                          onClick={() => toggleExpand(post.id)}
                        >
                          {isExpanded ? 'Show Less' : 'Read More'}
                        </button>
                      )}
                    </div>

                    {post.updatedAt && post.createdAt && post.updatedAt !== post.createdAt && (
                      <div className="post-updated">
                        <small>Last updated: {formatDate(post.updatedAt)}</small>
                      </div>
                    )}

                    {isAuthor(post) && (
                      <div className="post-actions">
                        <button
                          className="btn btn-edit"
                          onClick={() => handleEditPost(post)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn btn-delete"
                          onClick={() => handleDeleteClick(post)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, post: null })}
        onConfirm={handleDeleteConfirm}
        loading={deleting}
        postTitle={deleteModal.post?.title}
      />
    </div>
  );
};

export default BlogFeed;
