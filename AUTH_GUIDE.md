# 🔐 Firebase Authentication Guide

## Overview
This app uses Firebase Authentication with email/password for user management.

## Authentication Flow

### 1️⃣ Signup Flow
1. User visits `/signup`
2. Enters: Name, Email, Password, Confirm Password
3. Validation checks:
   - All fields filled
   - Passwords match
   - Password minimum 6 characters
4. Firebase creates user account
5. User profile updated with display name
6. Auto-redirect to dashboard

**Error Handling:**
- Email already exists → Prompt to login
- Weak password → Request stronger password
- Network errors → Display error message

---

### 2️⃣ Login Flow
1. User visits `/login`
2. Enters: Email, Password
3. Firebase authenticates credentials
4. Auto-redirect to dashboard

**Error Handling:**
- Invalid credentials → Error message
- Network errors → Display error message

---

### 3️⃣ Password Reset Flow
1. User visits `/forgot-password`
2. Enters email address
3. Firebase sends password reset email
4. User clicks link in email
5. Redirected to Firebase-hosted password reset page
6. After reset, user can login with new password

**Error Handling:**
- Email not found → Display error
- Network errors → Display error message

---

### 4️⃣ Logout Flow
1. User clicks "Logout" button on dashboard
2. Firebase signs out user
3. Auth context clears current user
4. Auto-redirect to `/login`

---

## Protected Routes

All routes except `/login`, `/signup`, and `/forgot-password` are protected.

**ProtectedRoute Component:**
```jsx
<ProtectedRoute>
  <YourComponent />
</ProtectedRoute>
```

**Behavior:**
- Not logged in → Redirect to `/login`
- Logged in → Render component
- Loading → Show loading spinner

---

## Using Authentication in Components

### Access Current User
```jsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { currentUser } = useAuth();
  
  return <div>Hello, {currentUser?.email}</div>;
}
```

### Available Auth Methods
```jsx
const {
  currentUser,      // Current user object or null
  signup,           // (email, password, displayName) => Promise
  login,            // (email, password) => Promise
  logout,           // () => Promise
  resetPassword,    // (email) => Promise
  loading,          // Boolean - auth state loading
  error             // Last error message
} = useAuth();
```

---

## User Object Properties

When logged in, `currentUser` contains:
- `uid` - Unique user ID
- `email` - User's email
- `displayName` - User's name (if set)
- `emailVerified` - Email verification status
- `metadata` - Account creation/last sign-in times

---

## Firebase Console Setup

### Required Configuration:
1. **Enable Email/Password Authentication:**
   - Go to Firebase Console → Authentication → Sign-in method
   - Enable "Email/Password"

2. **Configure Authorized Domains:**
   - Add `localhost` for development
   - Add your production domain

3. **Email Templates (Optional):**
   - Customize password reset email template
   - Customize verification email template

---

## Security Best Practices

✅ **DO:**
- Always use HTTPS in production
- Keep Firebase credentials in `.env` (never commit)
- Validate user input on client and server
- Use Firebase Security Rules for Firestore
- Enable email verification for production

❌ **DON'T:**
- Expose API keys in client code (it's okay for Firebase)
- Store sensitive data in localStorage
- Trust client-side validation alone
- Allow weak passwords

---

## Firestore Security Rules Example

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated users can read/write
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

---

## Testing Authentication

### Manual Testing:
1. Create new account via signup
2. Logout
3. Login with same credentials
4. Test password reset
5. Try accessing protected routes while logged out

### Common Issues:
- **"Firebase not initialized"** → Check `.env` file exists
- **"Permission denied"** → Check Firestore security rules
- **"Network error"** → Check internet connection
- **"Email already in use"** → User exists, use login instead

---

## Next Steps

- Add email verification
- Add social login (Google, GitHub, etc.)
- Add user profile management
- Implement role-based access control (RBAC)
- Add "Remember Me" functionality
- Add 2FA (Two-Factor Authentication)

---

## Support

For Firebase Auth documentation: https://firebase.google.com/docs/auth
For React integration: https://firebase.google.com/docs/auth/web/start
