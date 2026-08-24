# Backend Middleware Folder

Contains custom express middleware functions:
- **authMiddleware.js**: Checks authorization header, verifies JWT validity, extracts payload, and registers auth state.
- **uploadMiddleware.js**: Set up Multer with Cloudinary configuration for dynamic file uploading capability.
