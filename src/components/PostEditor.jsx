import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import './PostEditor.css';

const PostEditor = ({ post, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setTitle(post.title || '');
      setContent(post.content || '');
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      return setError('Please fill in all fields');
    }

    if (!currentUser) {
      return setError('You must be logged in to post');
    }

    try {
      setError('');
      setLoading(true);

      if (post) {
        // Update existing post
        const postRef = doc(db, 'posts', post.id);
        await updateDoc(postRef, {
          title: title.trim(),
          content: content.trim(),
          updatedAt: serverTimestamp()
        });
      } else {
        // Create new post
        await addDoc(collection(db, 'posts'), {
          title: title.trim(),
          content: content.trim(),
          authorId: currentUser.uid,
          authorEmail: currentUser.email,
          authorName: currentUser.displayName || 'Anonymous',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }

      // Clear form
      setTitle('');
      setContent('');
      
      if (onSuccess) {
        onSuccess();
      }
      
      if (onClose) {
        onClose();
      }
    } catch (err) {
      setError('Failed to save post. Please try again.');
      console.error('Error saving post:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/blog-feed');
    }
  };

  return (
    <div className="post-editor">
      <div className="editor-header">
        <h2>{post ? '✏️ Edit Post' : '✍️ Create New Post'}</h2>
        <p>Share your thoughts with the community</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="editor-form">
        <div className="form-group">
          <label htmlFor="title">Post Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a captivating title..."
            disabled={loading}
            maxLength={100}
          />
          <small className="char-count">{title.length}/100</small>
        </div>

        <div className="form-group">
          <label htmlFor="content">Post Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your story here..."
            disabled={loading}
            rows={12}
            maxLength={5000}
          />
          <small className="char-count">{content.length}/5000</small>
        </div>

        <div className="editor-actions">
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-cancel"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : (post ? 'Update Post' : 'Publish Post')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostEditor;
