require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Initialize Express app
const app = express();

// Security and Performance Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000' // Adjust based on your frontend URL
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Enhanced chatbot response logic
const getChatbotResponse = (message) => {
  const trimmedMsg = message.toLowerCase().trim();
  
  const responseMap = {
    hello: "Hi there! I'm Amara. What would you like to talk about today?",
    hi: "Hello! How are you feeling right now?",
    anxious: "I hear you're feeling anxious. That's completely valid. What's been on your mind lately?",
    stress: "Stress can be overwhelming. Would you like to share what's causing this feeling?",
    sad: "I'm sorry to hear you're feeling this way. Remember, it's okay to not be okay sometimes.",
    default: "I want to understand better. Could you tell me more about what you're experiencing?"
  };

  // Check for specific keywords
  if (trimmedMsg.includes('anxious')) return responseMap.anxious;
  if (trimmedMsg.includes('stress')) return responseMap.stress;
  if (trimmedMsg.includes('sad')) return responseMap.sad;
  if (trimmedMsg.includes('hello') || trimmedMsg.includes('hi')) return responseMap.hello;

  return responseMap.default;
};

// API Endpoints
app.post('/api/chat', (req, res) => {
  try {
    if (!req.body.message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Simulate processing delay (remove in production)
    setTimeout(() => {
      const botResponse = getChatbotResponse(req.body.message);
      res.json({ response: botResponse });
    }, 800); // Simulate AI processing time
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API ready at http://localhost:${PORT}/api/chat`);
});