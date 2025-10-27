import React from 'react';
import './DeleteModal.css';

const DeleteModal = ({ isOpen, onClose, onConfirm, loading, postTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>⚠️ Confirm Delete</h3>
        </div>
        
        <div className="modal-body">
          <p>Are you sure you want to delete this post?</p>
          {postTitle && (
            <p className="post-title-preview">
              <strong>"{postTitle}"</strong>
            </p>
          )}
          <p className="warning-text">This action cannot be undone.</p>
        </div>
        
        <div className="modal-actions">
          <button
            onClick={onClose}
            className="btn btn-cancel"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-delete"
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete Post'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
