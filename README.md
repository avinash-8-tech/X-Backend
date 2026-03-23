# X Backend

A full-featured REST API backend for a Twitter/X clone with real-time messaging, notifications & media upload — built with Node.js, Express, Prisma, Neon(PostgreSQL), Better Auth, Socket.io and Cloudinary

## 🌟 Features

- **Authentication** — Email/Password + Google OAuth (Better Auth)
- **Tweets** — Create, Delete, Retweet with Image/Video upload
- **Social** — Follow/Unfollow system
- **Interactions** — Like, Unlike, Comment
- **Feed** — Home feed based on following
- **Search** — Search users and tweets
- **Notifications** — Real-time notifications (Like, Follow, Comment)
- **Direct Messages** — Real-time DMs with Socket.io
- **Media Upload** — Image/Video upload via Cloudinary
- **Real-time** — Socket.io for live notifications and messaging

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js + Express | Server framework |
| PostgreSQL (Neon) | Database |
| Prisma ORM | Database queries |
| Better Auth | Authentication |
| Cloudinary | Media storage |
| Socket.io | Real-time features |
| Multer | File uploads |

## 📁 Project Structure
```
x-backend/
├── src/
│   ├── config/
│   │   ├── auth.js              # Better Auth config
│   │   ├── cloudinary.js        # Cloudinary config
│   │   └── db.js                # Prisma client
│   │
│   ├── controllers/
│   │   ├── comment.controller.js
│   │   ├── follow.controller.js
│   │   ├── like.controller.js
│   │   ├── message.controller.js
│   │   ├── notification.controller.js
│   │   ├── search.controller.js
│   │   ├── tweet.controller.js
│   │   └── user.controller.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js    # JWT verify
│   │   ├── error.middleware.js   # Global error handler
│   │   └── upload.middleware.js  # Multer file upload
│   │
│   ├── routes/
│   │   ├── comment.routes.js
│   │   ├── follow.routes.js
│   │   ├── like.routes.js
│   │   ├── message.routes.js
│   │   ├── notification.routes.js
│   │   ├── search.routes.js
│   │   ├── tweet.routes.js
│   │   └── user.routes.js
│   │
│   ├── services/
│   │   ├── comment.service.js
│   │   ├── follow.service.js
│   │   ├── like.service.js
│   │   ├── message.service.js
│   │   ├── notification.service.js
│   │   ├── search.service.js
│   │   ├── tweet.service.js
│   │   └── user.service.js
│   │
│   ├── socket/
│   │   └── socket.js            # Socket.io real-time events
│   │
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   ├── asyncHandler.js
│   │   └── uploadToCloudinary.js
│   │
│   └── app.js                   # Express app setup
│
├── prisma/
│   ├── migrations/              # DB migrations history
│   ├── prisma.config.js         # Prisma configuration
│   └── schema.prisma            # Database schema
│
├── .envexample                  # Environment variables template
├── .gitignore
├── package-lock.json
├── package.json
└── server.js                    # Entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL (or Neon free tier)
- Cloudinary account
- Google OAuth credentials

### Installation

1. Clone the repo
```bash
git clone https://github.com/avinash-8-tech/X-Backend.git
cd X-Backend
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
cp .envexample .env
```

4. Fill in `.env` file
```env
PORT=8000
DATABASE_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:8000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

5. Setup database
```bash
npx prisma migrate dev
npx prisma generate
```

6. Start the server
```bash
npm run dev
```

## 📡 API Endpoints

### Auth
```
POST   /api/auth/sign-up/email    Register
POST   /api/auth/sign-in/email    Login
POST   /api/auth/sign-out         Logout
GET    /api/auth/get-session      Current user info
GET    /api/auth/sign-in/google   Google OAuth
```

### Tweets
```
POST   /api/tweets                Create tweet (with media)
GET    /api/tweets/feed/home      Home feed
GET    /api/tweets/:id            Single tweet
DELETE /api/tweets/:id            Delete tweet
POST   /api/tweets/:id/retweet    Retweet
```

### Users
```
GET    /api/users/:username           User profile
GET    /api/users/:username/tweets    User tweets
PUT    /api/users/profile/update      Update profile
PUT    /api/users/profile/avatar      Update avatar
PUT    /api/users/profile/cover       Update cover image
```

### Follow
```
POST   /api/follow/:id/toggle     Follow/Unfollow
GET    /api/follow/:id/followers  Followers list
GET    /api/follow/:id/following  Following list
```

### Likes
```
POST   /api/likes/:id/toggle      Like/Unlike
GET    /api/likes/:id/likes       Tweet likes
```

### Comments
```
POST   /api/comments/:id/comment     Add comment
GET    /api/comments/:id/comments    Get comments
DELETE /api/comments/comment/:id     Delete comment
```

### Search
```
GET    /api/search/users?q=       Search users
GET    /api/search/tweets?q=      Search tweets
```

### Notifications
```
GET    /api/notifications          Get notifications
PUT    /api/notifications/read     Mark as read
GET    /api/notifications/unread   Unread count
```

### Messages
```
GET    /api/messages               Conversation list
GET    /api/messages/:id           Get conversation
POST   /api/messages/:id           Send message
```

## 🔌 Socket.io Events

### Client → Server
```
user:online       User came online
message:send      Send a message
notification:send Send a notification
```

### Server → Client
```
users:online         Online users list
message:receive      New message received
notification:receive New notification received
```

## 🗄️ Database Schema

- **User** — Profile, auth info
- **Tweet** — Content, media, retweets, quotes
- **Like** — User-Tweet relationship
- **Comment** — Tweet comments
- **Follow** — User-User relationship
- **Notification** — Like, Follow, Comment notifications
- **Message** — Direct messages
- **Account/Session** — Better Auth tables

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
