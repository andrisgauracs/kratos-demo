# Kratos Demo - Identity Authentication Flow

![ory_sample](https://github.com/user-attachments/assets/2cf45f74-a6f3-4703-bdc1-64f2bb629eca)

A complete identity and access management authentication flow demonstration using [Ory Kratos](https://www.ory.sh/kratos/) and a Next.js application.

## Overview

This project demonstrates a full authentication flow with:

- **Kratos**: Open-source identity and access management platform
- **kratos-auth**: Next.js frontend application with authentication UI
- **Docker**: Containerized services for easy setup and development

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- npm or yarn

## Quick Start

### 1. Start the Kratos Docker Container

From the project root directory, start the Kratos services:

```bash
docker-compose -f docker/docker-compose.yml up -d
```

This will start:

- **Kratos** (Identity Management) - Public: http://127.0.0.1:4433, Admin: http://127.0.0.1:4434
- **Kratos Database Migration** - Runs automatically on startup
- **Mailslurper** (Email Testing) - http://127.0.0.1:4436
- **Kratos Self-Service UI Node** - http://127.0.0.1:3001

> **Note**: The first startup may take 30-60 seconds as it initializes the SQLite database. Monitor logs with: `docker-compose -f docker/docker-compose.yml logs -f kratos`

### 2. Install Dependencies (kratos-auth app)

Navigate to the kratos-auth directory and install dependencies:

```bash
cd kratos-auth
npm install
```

### 3. Start the Next.js Application

Start the development server:

```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

## Full Authentication Flow

### Access the Application

1. Open http://localhost:3000 in your browser
2. You'll see the home page with authentication options

### Registration Flow

1. Click **"Sign Up"** button
2. Fill in your email and password
3. Submit the form
4. Check your email (Mailslurper at http://127.0.0.1:4436) for verification link
5. Click the verification link to complete registration

### Login Flow

1. Click **"Sign In"** button
2. Enter your registered email and password
3. Upon successful login, you'll see:
   - Your session information (JSON format)
   - Links to Settings and Logout

### Account Settings

1. After login, click **"Settings"** to access account management
2. Features available:
   - Update profile information
   - Change password
   - Enable/disable two-factor authentication
   - Manage recovery codes
   - View security settings

### Logout

1. Click the **"Logout"** button on the home page
2. You'll be redirected to the home page in unauthenticated state

### Password Recovery

1. On the login page, click **"Forgot password?"**
2. Enter your email address
3. Check Mailslurper for recovery link
4. Click the link to reset your password
5. Set a new password and login with your new credentials

## Configuration

### Kratos Configuration

The main Kratos configuration is located at: `docker/config/kratos.yml`

Key settings:

- **DSN**: SQLite database path
- **Public URL**: http://127.0.0.1:4433 (used by frontend)
- **Admin URL**: http://127.0.0.1:4434 (admin API)
- **CORS**: Allows requests from http://127.0.0.1:3000
- **Self-service flows**: Login, registration, password recovery, settings, logout

### Identity Schema

User identity schema is defined in: `docker/config/identity.schema.json`

This controls what user attributes are collected and stored.

### Next.js Configuration

The Next.js app includes:

- `ory.config.ts` - Ory SDK configuration
- `middleware.ts` - Session and authentication middleware
- Routes for: login, register, logout, recovery, settings, verification

## Services & Ports

| Service          | Port | Purpose                       |
| ---------------- | ---- | ----------------------------- |
| Kratos Public    | 4433 | Frontend authentication API   |
| Kratos Admin     | 4434 | Admin API for user management |
| Mailslurper      | 4436 | Email testing UI              |
| Mailslurper SMTP | 4437 | SMTP server for email capture |
| Next.js App      | 3000 | Web application               |

## Useful Commands

### Docker Commands

```bash
# Start all services
docker-compose -f docker/docker-compose.yml up -d

# Stop all services
docker-compose -f docker/docker-compose.yml down

# View logs
docker-compose -f docker/docker-compose.yml logs -f

# View specific service logs
docker-compose -f docker/docker-compose.yml logs -f kratos

# Restart services
docker-compose -f docker/docker-compose.yml restart
```

### Next.js Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Troubleshooting

### "Connection refused" errors

**Issue**: Frontend cannot connect to Kratos  
**Solution**:

1. Ensure Docker services are running: `docker-compose -f docker/docker-compose.yml ps`
2. Check Kratos is healthy: `docker-compose -f docker/docker-compose.yml logs kratos`
3. Verify CORS configuration in `docker/config/kratos.yml` includes your frontend URL

### Email verification not working

**Issue**: Not receiving verification emails  
**Solution**:

1. Check Mailslurper UI at http://127.0.0.1:4436
2. Verify Kratos logs for courier/email service: `docker-compose -f docker/docker-compose.yml logs kratos | grep -i courier`
3. Check that email settings are configured in `kratos.yml`

### Database errors on startup

**Issue**: "database is locked" or migration fails  
**Solution**:

1. Stop all services: `docker-compose -f docker/docker-compose.yml down`
2. Remove the database file: `rm users.db`
3. Start services again: `docker-compose -f docker/docker-compose.yml up -d`

### Port already in use

**Issue**: Port 3000, 4433, or 4434 is already in use  
**Solution**: Either stop the process using the port or modify the port mappings in `docker-compose.yml`

## API Endpoints

### Kratos Public API (http://127.0.0.1:4433)

- `GET /schemas` - List available identity schemas
- `POST /self-service/login/flows` - Create login flow
- `POST /self-service/registration/flows` - Create registration flow
- `POST /self-service/recovery/flows` - Create recovery flow
- `POST /self-service/settings/flows` - Create settings flow
- `GET /sessions/whoami` - Get current session

### Kratos Admin API (http://127.0.0.1:4434)

- `GET /admin/identities` - List all identities
- `POST /admin/identities` - Create identity
- `GET /admin/identities/{id}` - Get identity details
- `DELETE /admin/identities/{id}` - Delete identity

See [Kratos API Documentation](https://www.ory.sh/kratos/docs/reference/api) for more details.

## Development Tips

### Adding Custom Authentication Pages

The Next.js app uses Ory Elements for pre-built UI components. You can customize:

- `kratos-auth/app/login/page.tsx` - Login page
- `kratos-auth/app/register/page.tsx` - Registration page
- `kratos-auth/app/settings/page.tsx` - Account settings

### Inspecting Sessions

Use the `/` home page to see your current session data in JSON format after logging in.

### Testing with cURL

```bash
# Create a login flow
curl http://127.0.0.1:4433/self-service/login/flows

# Get current session
curl http://127.0.0.1:4433/sessions/whoami -b "ory_kratos_session=..."
```

## Resources

- [Ory Kratos Documentation](https://www.ory.sh/kratos/docs/)
- [Ory Elements Documentation](https://www.ory.sh/docs/elements)
- [Next.js Documentation](https://nextjs.org/docs)
- [Docker Documentation](https://docs.docker.com/)

## License

MIT
