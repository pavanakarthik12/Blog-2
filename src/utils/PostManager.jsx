import { ref, set, push, update, remove, onValue, query, orderByChild, limitToLast } from 'firebase/database';
import { db } from '../firebase/config';

/**
 * Create a new blog post
 * @param {Object} user - Current authenticated user
 * @param {string} title - Post title
 * @param {string} content - Post content
 * @returns {Promise<string>} - New post ID
 */
export const createPost = async (user, title, content) => {
  if (!user) {
    throw new Error('User must be authenticated to create a post');
  }

  const postsRef = ref(db, 'posts');
  const newPostRef = push(postsRef);
  
  const newPost = {
    title: title.trim(),
    content: content.trim(),
    authorId: user.uid,
    authorEmail: user.email,
    authorName: user.displayName || 'Anonymous',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  await set(newPostRef, newPost);
  console.log('✅ Post created:', newPostRef.key);
  return newPostRef.key;
};

/**
 * Fetch all posts with real-time updates
 * @param {Function} callback - Callback function to receive posts array
 * @returns {Function} - Unsubscribe function
 */
export const fetchPosts = (callback) => {
  const postsRef = ref(db, 'posts');
  
  const unsubscribe = onValue(postsRef, (snapshot) => {
    const data = snapshot.val();
    
    if (data) {
      // Convert object to array and add IDs
      const postList = Object.entries(data).map(([id, post]) => ({
        id,
        ...post
      }));
      
      // Sort by createdAt descending (newest first)
      postList.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      
      console.log(`📚 Fetched ${postList.length} posts`);
      callback(postList);
    } else {
      console.log('📚 No posts found');
      callback([]);
    }
  }, (error) => {
    console.error('❌ Error fetching posts:', error);
    callback([]);
  });

  return unsubscribe;
};

/**
 * Fetch recent posts (limited number)
 * @param {number} limit - Number of posts to fetch
 * @param {Function} callback - Callback function to receive posts array
 * @returns {Function} - Unsubscribe function
 */
export const fetchRecentPosts = (limit, callback) => {
  const postsRef = ref(db, 'posts');
  
  const unsubscribe = onValue(postsRef, (snapshot) => {
    const data = snapshot.val();
    
    if (data) {
      const postList = Object.entries(data).map(([id, post]) => ({
        id,
        ...post
      }));
      
      // Sort by createdAt descending and limit
      postList.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      const limitedPosts = postList.slice(0, limit);
      
      console.log(`📚 Fetched ${limitedPosts.length} recent posts`);
      callback(limitedPosts);
    } else {
      callback([]);
    }
  }, (error) => {
    console.error('❌ Error fetching recent posts:', error);
    callback([]);
  });

  return unsubscribe;
};

/**
 * Update an existing post
 * @param {string} postId - ID of the post to update
 * @param {Object} updatedData - Data to update (title, content)
 * @returns {Promise<void>}
 */
export const updatePost = async (postId, updatedData) => {
  if (!postId) {
    throw new Error('Post ID is required');
  }

  const postRef = ref(db, `posts/${postId}`);
  const updates = {
    ...updatedData,
    updatedAt: Date.now()
  };

  await update(postRef, updates);
  console.log('✅ Post updated:', postId);
};

/**
 * Delete a post
 * @param {string} postId - ID of the post to delete
 * @returns {Promise<void>}
 */
export const deletePost = async (postId) => {
  if (!postId) {
    throw new Error('Post ID is required');
  }

  const postRef = ref(db, `posts/${postId}`);
  await remove(postRef);
  console.log('✅ Post deleted:', postId);
};

/**
 * Get a single post by ID
 * @param {string} postId - ID of the post
 * @param {Function} callback - Callback function to receive post data
 * @returns {Function} - Unsubscribe function
 */
export const getPost = (postId, callback) => {
  if (!postId) {
    callback(null);
    return () => {};
  }

  const postRef = ref(db, `posts/${postId}`);
  
  const unsubscribe = onValue(postRef, (snapshot) => {
    if (snapshot.exists()) {
      const post = {
        id: postId,
        ...snapshot.val()
      };
      callback(post);
    } else {
      callback(null);
    }
  }, (error) => {
    console.error('❌ Error fetching post:', error);
    callback(null);
  });

  return unsubscribe;
};

export default {
  createPost,
  fetchPosts,
  fetchRecentPosts,
  updatePost,
  deletePost,
  getPost
};
