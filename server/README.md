# RuralSync Backend Express API

Node.js / Express REST API for **RuralSync e-Governance Citizen Portal**.

## Environment Configuration

Create a `.env` file in the `server` directory (or copy from `.env.example`):

```bash
cp .env.example .env
```

### Environment Variables (.env.example)

| Variable | Default Value | Description |
|---|---|---|
| `PORT` | `5000` | Server listening port |
| `NODE_ENV` | `development` | Node environment (`development` / `production`) |
| `JWT_SECRET` | `ruralsync_jwt_secret_key_...` | Secret key for signing JWT tokens |
| `JWT_EXPIRES_IN` | `7d` | Token validity duration |
| `CORS_ORIGIN` | `http://localhost:3000` | Allowed CORS origin for React frontend |
| `GEMINI_API_KEY` | *(Optional)* | Google Gemini AI Studio key for Gram Mitra Assistant |

---

## Getting Started

1. **Install Dependencies**:
   ```bash
   cd server
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm start
   ```
   The API will start running at **`http://localhost:5000`**.

---

## API Endpoints Reference

### 🔐 Auth & JWT (`/api/auth`)
- `POST /api/auth/register` - Register a new citizen account & receive JWT token
- `POST /api/auth/login` - Authenticate with mobile/Aadhaar & password to receive JWT token
- `GET /api/auth/me` - Fetch authenticated user profile (Requires `Authorization: Bearer <token>`)

### 🌾 Schemes & Subsidies (`/api/schemes`)
- `GET /api/schemes` - List all government schemes (filters: `category`, `search`)
- `GET /api/schemes/:id` - Fetch details for a specific scheme
- `POST /api/schemes/apply` - Submit scheme eligibility application

### 💧 Complaints & Grievances (`/api/complaints`)
- `GET /api/complaints` - Fetch ward complaints list (filters: `wardNo`, `status`)
- `POST /api/complaints` - Lodge a new public grievance complaint
- `PUT /api/complaints/:id/upvote` - Upvote / support an existing ward complaint

### 💼 MGNREGA Jobs (`/api/jobs`)
- `GET /api/jobs` - List open MGNREGA work & Panchayat job postings
- `POST /api/jobs/apply` - Register job demand

### 📢 Village Notices (`/api/notices`)
- `GET /api/notices` - Fetch latest Gram Sabha notices & urgent health alerts
- `POST /api/notices` - Create new village notice

### 📊 Village Stats (`/api/stats`)
- `GET /api/stats` - Village population, fund utilization, and resolution metrics

### 🤖 AI Gram Mitra Assistant (`/api/ai`)
- `POST /api/ai/chat` - Process citizen queries with Gemini API / Smart Rural Engine

### 🚨 Emergency Helplines (`/api/emergency`)
- `GET /api/emergency` - Emergency contacts (Ambulance, Police, Kisan Call Center)
