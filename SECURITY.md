# 🔐 Vaidya Platform Security Documentation

This document outlines the security measures implemented on the Vaidya Ayurvedic Platform.

## 🛡️ Implemented Protections

### 1. Authentication & Session Management
- **HttpOnly Cookies**: JWT tokens are stored in `HttpOnly`, `Secure`, and `SameSite: Strict` cookies. This makes them inaccessible to client-side scripts, protecting against XSS-based token theft.
- **Refresh Token System**: Short-lived (15m) access tokens and long-lived (7d) refresh tokens are used. Refresh tokens are rotated on each use.
- **Brute Force Protection**: 
  - 5 failed login attempts trigger a 30-minute account lockout.
  - Rate limiting on auth endpoints (10 attempts per 15 minutes per IP).

### 2. API & Network Security
- **Rate Limiting**: 
  - Global API: 100 req / 15 min.
  - Auth: 10 req / 15 min.
  - Payments: 20 req / 1 hour.
  - Forms: 5 req / 1 hour.
- **Helmet.js**: Implements standard security headers.
- **CORS Protection**: Restricted to authorized origins.
- **Honeypot**: Hidden fields in forms to detect and reject bot submissions.

### 3. Data Integrity & Sanitization
- **NoSQL Injection**: `express-mongo-sanitize` strips operator characters from inputs.
- **XSS Cleaning**: `xss-clean` filters HTML tags from user inputs.
- **Input Validation**: `express-validator` (ready for integration in controllers).
- **Payload Limits**: JSON bodies limited to 10kb to prevent DoS via large payloads.

### 4. Storage & Payment Security
- **File Uploads**: 
  - Strict MIME type checking (JPEG, PNG, PDF, DOCX).
  - 5MB file size limit.
  - Secure Cloudinary integration.
- **Payment Verification**: 
  - Hashed signature verification for all Razorpay transactions.
  - Webhook verification (to be finalized with deployment).

### 5. Monitoring & Logging
- **Winston Logger**: 
  - `security.log`: Tracks injection attempts, rate limit breaches, and unauthorized access.
  - `auth.log`: Tracks logins, logouts, and failed attempts.
  - `error.log`: Tracks system exceptions.
- **Error Handling**: Stack traces are hidden in production and replaced with generic error messages.

## 🚀 Deployment Checklist

Before moving to production:

1. [ ] **SSL/HTTPS**: Ensure the site is served over HTTPS.
2. [ ] **Secrets**: Generate long, random strings for `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET`.
3. [ ] **Database**: Enable MongoDB authentication and restrict IP access.
4. [ ] **Logs**: Set up a log rotation or external logging service (like Sentry or Datadog).
5. [ ] **Environment**: Set `NODE_ENV=production` in your environment variables.
6. [ ] **CORS**: Set `CLIENT_URL` to your production domain.


