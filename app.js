const express = require('express');
const twilio = require('twilio');
const app = express();

app.use(express.urlencoded({ extended: false }));

// Simple test response
function getBotResponse(userMessage) {
  const message = userMessage.toLowerCase().trim();
  
  if (message.includes('hello') || message.includes('hi')) {
    return "🧪 Hello! NewtonLab bot is working! Type 'help' for options.";
  }
  
  if (message.includes('help')) {
    return "📚 NewtonLab Tuition Centre\n📞 Contact Mr Tok: 91070546\nTest successful!";
  }
  
  return "✅ Bot is working! Type 'hello' or 'help' to test.";
}

// Webhook endpoint
app.post('/webhook', (req, res) => {
  const incomingMessage = req.body.Body;
  const from = req.body.From;
  
  console.log(`Message from ${from}: ${incomingMessage}`);
  
  const response = getBotResponse(incomingMessage);
  
  const twiml = new twilio.twiml.MessagingResponse();
  twiml.message(response);
  
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

// Health check
app.get('/', (req, res) => {
  res.send(`
    <h1>🧪 NewtonLab Test Bot</h1>
    <p>✅ Simple bot is running!</p>
    <p>📱 Test by sending WhatsApp message</p>
    <p>🔧 Time: ${new Date().toLocaleString()}</p>
  `);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Test bot running on port ${port}`);
});
