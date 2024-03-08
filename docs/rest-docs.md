 <!-- - /api/v1
    - /auth
        - /signup (POST) - to signup - also sends a verification email
        - /login (POST) - to Log in User
        - /verify (GET) - endpoint that is sent in verification email
        - /reset-password (POST) - create a password reset link and send it to the owner email
        - /reset-password (PUT) - the reset password link that is sent in email
    - /users
        - / (PUT) - Update or change the user profile (Login Required)
        - /:username (GET) - Get user information
        - /:username/tweets (GET) - Get tweets of a username (pqp)
        - /:username/follow (POST) - Follow/unfollow the User toggle (secure)
        - /:username/followers (GET) - Get the followers of user
        - /:username/following (GET) - Get the following of a user
    - /tweets
        - / (POST) - uploading a new tweet (secure)
        - /:tweetId (GET) - Getting a specific tweet 
        - /:tweetId/like (POST) - like/unlike toggle a tweet (secure)
        - /:tweetId/reply (POST) - create a tweet as a reply to a tweet in tweetId (secure)
        - /:tweetId/replies (GET) - Get replies to a specific Tweet (pqp)
        - /:tweetId/retweet (POSt) - Retweet a specific tweet (secure)
        - /:tweetId (DELETE) - delete your specific tweet (secure)
    - /search 
        - /users (GET) - query param = `search` -- search a user among users using keyword -  (pqp)
        - /tweets (GET) - query param = `search` -- search a tweet among tweets using keyword -  (pqp)
    - /feed
        - / (GET) - Gets a personalized news feed of tweets - (pqp) (secure)
    - /uploads
        - / (POST) - posting a file to server  (secure)
        - / (GET) - get all uploads a logged in user uploaded (secure) -->



# Twitter Backend API Routes

## Base URL

All endpoints are relative to the base URL:
```
/api/v1
```

## Authentication

### Signup
- **Endpoint**: `/auth/signup` (POST)
  - Create a new user account and send a verification email.

### Login
- **Endpoint**: `/auth/login` (POST)
  - Log in a user.

### Email Verification
- **Endpoint**: `/auth/verify` (GET)
  - Verify the user account using the link sent in the verification email.

### Password Reset
- **Create Reset Link**
  - **Endpoint**: `/auth/reset-password` (POST)
    - Create a password reset link and send it to the owner's email.

## User Operations

### Update User Profile
- **Endpoint**: `/users` (PUT)
  - Update or change the user profile.
  - **Authentication**: Required (Login Required).

### Get User Information
- **Endpoint**: `/users/:username` (GET)
  - Get user information.

### Get User Tweets
- **Endpoint**: `/users/:username/tweets` (GET)
  - Get tweets of a user (pagination).

### Follow/Unfollow User
- **Endpoint**: `/users/:username/follow` (POST)
  - Follow/unfollow the user toggle.
  - **Authentication**: Required (Login Required).

### Get Followers
- **Endpoint**: `/users/:username/followers` (GET)
  - Get followers of a user.

### Get Following
- **Endpoint**: `/users/:username/following` (GET)
  - Get the users that the specified user is following.

## Tweet Operations

### Upload Tweet
- **Endpoint**: `/tweets` (POST)
  - Upload a new tweet.
  - **Authentication**: Required (Login Required).

### Get Specific Tweet
- **Endpoint**: `/tweets/:tweetId` (GET)
  - Get details of a specific tweet.

### Like/Unlike Tweet
- **Endpoint**: `/tweets/:tweetId/like` (POST)
  - Like/unlike toggle for a tweet.
  - **Authentication**: Required (Login Required).

### Reply to Tweet
- **Endpoint**: `/tweets/:tweetId/reply` (POST)
  - Reply to a tweet.
  - **Authentication**: Required (Login Required).

### Get Tweet Replies
- **Endpoint**: `/tweets/:tweetId/replies` (GET)
  - Get replies to a specific tweet (pagination).

### Retweet
- **Endpoint**: `/tweets/:tweetId/retweet` (POST)
  - Retweet a specific tweet.
  - **Authentication**: Required (Login Required).

### Delete Tweet
- **Endpoint**: `/tweets/:tweetId` (DELETE)
  - Delete a specific tweet.
  - **Authentication**: Required (Login Required).

## Search

### Search Users
- **Endpoint**: `/search/users` (GET)
  - Search users using a keyword (pagination).

### Search Tweets
- **Endpoint**: `/search/tweets` (GET)
  - Search tweets using a keyword (pagination).

## Feed

### Personalized News Feed
- **Endpoint**: `/feed` (GET)
  - Get a personalized news feed of tweets (pagination).
  - **Authentication**: Required (Login Required).

## File Uploads

### Upload File
- **Endpoint**: `/uploads` (POST)
  - Upload a file to the server.
  - **Authentication**: Required (Login Required).

### Get Uploaded Files
- **Endpoint**: `/uploads` (GET)
  - Get all uploads by the logged-in user.
  - **Authentication**: Required (Login Required).