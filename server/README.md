# Dify Proxy Server

A secure backend proxy for protecting Dify API keys.

## Setup

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment

```bash
# Copy the example environment file
cp ../.env.server.example ../.env.server

# Edit .env.server and add your actual Dify API key
vi ../.env.server
# 或使用你喜欢的文本编辑器
```

### 3. Run the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will run on `http://localhost:3001` by default.

## API Endpoints

### Health Check
```
GET /health
```

### Chat with Dify
```
POST /api/chat
Content-Type: application/json

{
  "query": "Your message here",
  "conversation_id": "optional-conversation-id"
}
```

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard:
   - `DIFY_API_KEY`
   - `DIFY_API_URL`
   - `FRONTEND_URL`

### Deploy to Railway

1. Create a new project on Railway
2. Connect your GitHub repository
3. Set the root directory to `/server`
4. Add environment variables:
   - `DIFY_API_KEY`
   - `DIFY_API_URL`
   - `FRONTEND_URL`

### Deploy to Render

1. Create a new Web Service
2. Connect your repository
3. Set build command: `cd server && npm install`
4. Set start command: `cd server && npm start`
5. Add environment variables

## Security Notes

- ✅ API keys are stored server-side
- ✅ CORS is configured to only allow your frontend
- ✅ No sensitive data in client code
- ⚠️ Consider adding rate limiting for production
- ⚠️ Consider adding authentication for production
