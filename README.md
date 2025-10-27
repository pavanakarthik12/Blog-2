# Blogify - React + Firebase App

A modern React application with Firebase integration, built with Vite.

## 🚀 Features

- ⚛️ React 19 with Hooks
- 🔥 Firebase Authentication & Firestore
- 🔐 Email/Password Authentication
- 🛡️ Protected Routes
- 📧 Password Reset via Email
- 🎨 Modern UI with gradient design
- 🛣️ React Router for navigation
- ⚡ Vite for fast development
- 🔐 Environment variables for secure configuration

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase project

## 🛠️ Setup Instructions

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure Firebase**
   - Copy `.env.example` to `.env`
   - Fill in your Firebase credentials from the Firebase Console
   ```bash
   cp .env.example .env
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
blog-2/
├── src/
│   ├── components/
│   │   └── ProtectedRoute.jsx # Route protection component
│   ├── contexts/
│   │   └── AuthContext.jsx    # Authentication context & provider
│   ├── firebase/
│   │   └── config.js          # Firebase initialization
│   ├── pages/
│   │   ├── Login.jsx          # Login page
│   │   ├── Signup.jsx         # Signup page
│   │   ├── ForgotPassword.jsx # Password reset page
│   │   └── AuthPages.css      # Auth pages styling
│   ├── App.jsx                # Main app component
│   ├── App.css                # App styles
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── .env                       # Environment variables (not in git)
├── .env.example               # Template for environment variables
└── vite.config.js             # Vite configuration
```

## 🔐 Environment Variables

Required environment variables (see `.env.example`):

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID` (optional)

## 🔍 Verification

Open the browser and you'll see:
1. **Login Page** at `/login` - Sign in with your credentials
2. **Signup Page** at `/signup` - Create a new account
3. **Forgot Password** at `/forgot-password` - Reset your password
4. **Protected Dashboard** at `/` - Only accessible when logged in

### Authentication Features:
- ✅ User signup with email/password
- ✅ User login
- ✅ User logout
- ✅ Password reset via email
- ✅ Protected routes (redirect to login if not authenticated)
- ✅ Display user info (email, name, UID)

## 📦 Dependencies

- `react` - UI framework
- `react-router-dom` - Client-side routing
- `firebase` - Backend services
- `vite` - Build tool

## 🚨 Security Notes

- Never commit the `.env` file to version control
- The `.env` file is already in `.gitignore`
- Use `.env.example` as a template for collaborators

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License
