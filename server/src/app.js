const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const authRoutes = require('./routes/authRoutes');
const aiRoutes = require('./routes/aiRoutes');
const schemesRoutes = require('./routes/schemes');
const complaintsRoutes = require('./routes/complaints');
const jobsRoutes = require('./routes/jobs');
const noticesRoutes = require('./routes/notices');
const emergencyRoutes = require('./routes/emergency');
const weatherRoutes = require('./routes/weather');
const statsRoutes = require('./routes/stats');
const noticeRoutes = require('./routes/noticeRoutes');

const errorHandler = require('./middleware/errorMiddleware');
const { apiLimiter } = require('./middleware/rateLimiter');

const app = express();

// Security & Optimization Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration allowing Vite client & custom client URL
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Allow during local development
      }
    },
    credentials: true,
  })
);

// Apply Global Rate Limiting
app.use('/api', apiLimiter);

// --- MODULE ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/schemes', schemesRoutes);
app.use('/api/complaints', complaintsRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/notices', noticesRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/weather', weatherRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'RuralSync e-Governance REST API',
    module: 'Authentication & Rural Services Active',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

module.exports = app;
