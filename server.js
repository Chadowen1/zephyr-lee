require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const db = require('./models');
const logger = require('./middleware/logger');

// Import all route files
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bienimmobilierRoutes = require('./routes/bienimmobilierRoutes');
const logementetrangerRoutes = require('./routes/logementetrangerRoutes');
const logementetrangeridRoutes = require('./routes/logementetrangeridRoutes');
const relocationAssistanceRoutes = require('./routes/relocationAssistanceRoutes');
const resourcesRoutes = require('./routes/resourcesRoutes');
const transporteurRoutes = require('./routes/transporteurRoutes');
const transporteuridRoutes = require('./routes/transporteuridRoutes');
const userQueriesRoutes = require('./routes/userQueriesRoutes');
const utilisateuridRoutes = require('./routes/utilisateuridRoutes');
const utilityuseridRoutes = require('./routes/utilityuseridRoutes');

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection with retry logic
const connectWithRetry = async () => {
  try {
    await db.sequelize.authenticate();
    logger.info('Database connection established.');
    
    // Sync models if needed (remove in production)
    await db.sequelize.sync({ alter: true });
    logger.info('Database synchronized.');
  } catch (error) {
    logger.error('Database connection failed:', error.message);
    // Retry after 5 seconds
    setTimeout(connectWithRetry, 5000);
  }
};

// 2. Security Middleware
app.use(helmet());

// Enhanced CORS Configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
  exposedHeaders: ['set-cookies']
}));

// 3. Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: 'Too many requests from this IP, please try again later'
});
app.use('/api', apiLimiter);
app.use('/auth', apiLimiter);

// 4. Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5. Request Logging Middleware
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.path}`);
  next();
});

// 6. Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/utilisateur', userRoutes);
app.use('/api/bienimmobilier', bienimmobilierRoutes);
app.use('/api/logementetranger', logementetrangerRoutes);
app.use('/api/transporteur', transporteurRoutes);
app.use('/api/logementetrangerid', logementetrangeridRoutes);
app.use('/api/transporteurid', transporteuridRoutes);
app.use('/api/utilisateurid', utilisateuridRoutes);
app.use('/api/utilityuser', utilityuseridRoutes);
app.use('/api/relocationassistance', relocationAssistanceRoutes);
app.use('/api/resources', resourcesRoutes);
app.use('/api/userqueries', userQueriesRoutes);

// Tomporary test route
app.get('/auth/test', (req, res) => {
  res.json({ message: "Auth endpoint is working!" });
});

// 7. API Welcome Endpoint
app.get('/api', (req, res) => {
  res.json({
    status: 'success',
    message: 'Welcome to Zephyr API',
    endpoints: {
      auth: '/auth',
      users: '/api/utilisateur',
      properties: '/api/bienimmobilier',
      foreignHousing: '/api/logementetranger',
      transporters: '/api/transporteur'
    },
    documentation: process.env.API_DOCS_URL || 'https://your-docs-url.com'
  });
});

// 8. Root Endpoint
app.get('/', (req, res) => {
  res.redirect('/api');
});

// 9. Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// 10. Static Files (Production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// 11. 404 Handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found',
    path: req.path
  });
});

// 12. Error Handler
app.use((err, req, res, next) => {
  console.error('API Error:', {
    path: req.path,
    method: req.method,
    body: req.body,
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
  next(err);
});


// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Available routes:`);
  logger.info(`- API Base: /api`);
  logger.info(`- Authentication: /auth`);
  logger.info(`- Users: /api/utilisateur`);
  logger.info(`- Properties: /api/bienimmobilier`);
  
  console.log(`Server running on port ${PORT}`);
});
