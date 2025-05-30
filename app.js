const express = require('express');
const twilio = require('twilio');
const app = express();

app.use(express.urlencoded({ extended: false }));

// NEWTONLAB TUITION CENTRE DATA
const tuitionData = {
  centerName: "NewtonLab Tuition Centre",
  contact: {
    phone: "88061249",
    contactPerson: "Mr Tok",
    address: "Block 748, Jurong West St 73, #B1-127, Singapore 640748",
    email: "newtonlabtuition@gmail.com"
  }
};

// BOT RESPONSE FUNCTION
function getBotResponse(userMessage) {
  const message = userMessage.toLowerCase().trim();
  
  console.log("Processing message:", message);
  
  // TRIAL BOOKING
  if (message.includes('book') || message.includes('trial')) {
    return "📅 *Book Your FREE Trial Class*\n\n🎯 *Available This Week:*\n• Tomorrow 4:00 PM - P4 Math\n• Tomorrow 5:00 PM - P5 Science\n• This Saturday 2:00 PM - Sec 3 Chemistry\n\n📝 *To confirm your trial:*\n\n✅ Type \"CONFIRM\" to book\n❌ Type \"CANCEL\" if not interested\n📞 Call Mr Tok: 91070546\n\n⏰ We'll contact you within 1 hour!";
  }
  
  // CONFIRMATIONS
  if (message === 'confirm' || message === 'yes') {
    console.log("TRIAL BOOKING CONFIRMED");
    return "✅ *BOOKING CONFIRMED!*\n\n🎉 Your FREE trial is reserved!\n\n📞 Mr Tok will call you within 2 hours to arrange details.\n\n📱 Contact: 91070546\n📧 Email: newtonlabtuition@gmail.com\n\n🧪 See you at NewtonLab!";
  }
  
  if (message === 'cancel' || message === 'no') {
    return "❌ No problem! Our FREE trial is always available when ready.\n\n📞 Call Mr Tok: 91070546\n💬 Type \"menu\" for options";
  }
  
  // WELCOME
  if (message.includes('hello') || message.includes('hi') || message === 'menu') {
    return "🧪 *Welcome to NewtonLab Tuition Centre!*\n*Primary 1 - Secondary 4*\n\nWhat can I help you with?\n\n📝 Type these options:\n• \"pricing\" - Check our fees\n• \"schedule\" - View timetables\n• \"book trial\" - FREE trial class\n• \"contact\" - Get Mr Tok's details\n\n🆓 *Special: 1 FREE trial - no commitment!*\n📞 Mr Tok: 91070546";
  }
  
  // PRICING
  if (message.includes('price') || message.includes('fee') || message.includes('cost')) {
    return "💰 *NewtonLab Pricing:*\n\n📖 *Monthly Fees:*\n• P4: $118/month\n• P5, P6: $138/month\n• Sec 1, Sec 2: $168/month\n• Sec 3, Sec 4: $198/month\n\n🎁 *What's Included:*\n• Registration: $0\n• Deposit: $0\n• Material Fee: $5/month\n• 1 FREE Trial Class!\n\n✅ *Ready to try?*\nType \"book trial\" for FREE trial!\n📞 Call Mr Tok: 91070546";
  }
  
  // SCHEDULE
  if (message.includes('schedule') || message.includes('time')) {
    return "📅 *NewtonLab Schedules:*\n\n*Primary 4:*\n• Math: Thu 4:00-5:30 PM\n• Science: Wed 5:00-6:30 PM\n\n*Primary 5:*\n• Math: Mon 3:30-5:00 PM\n• Science: Fri 3:30-5:00 PM\n\n*Primary 6:*\n• Math: Mon 5:00-6:30 PM\n• Science: Tue & Fri 5:00-6:30 PM\n\n*Secondary 1:*\n• Math: Wed 6:45-8:00 PM\n• Science: Mon 6:30-8:00 PM\n\n*Secondary 2:*\n• Math: Tue 6:30-8:00 PM\n• Science: Thu 5:00-6:30 PM\n\n*Secondary 3:*\n• E.Math: Wed 8:15-9:30 PM\n• A.Math: Thu 8:30-9:30 PM\n• Chemistry: Mon 8:30-9:30 PM\n\n*Secondary 4:*\n• E.Math: Tue 8:00-9:30 PM\n• A.Math: Thu 6:30-8:00 PM\n• Chemistry: Fri 6:30-8:00 PM\n\n✅ Type \"book trial\" for FREE trial!\n📞 Mr Tok: 91070546";
  }
  
  // CONTACT
  if (message.includes('contact') || message.includes('phone') || message.includes('address')) {
    return "📞 *NewtonLab Contact:*\n\n👨‍🏫 Contact: Mr Tok\n☎️ Phone: 91070546\n📧 Email: newtonlabtuition@gmail.com\n\n📍 *Address:*\nBlock 748, Jurong West St 73\n#B1-127, Singapore 640748\n\n🕐 *Hours:*\nMon-Fri: 3:30PM-9:30PM\nSat-Sun: Available\n\n✅ Type \"book trial\" for FREE trial!";
  }
  
  // SPECIFIC LEVEL QUERIES (Check these BEFORE general pricing)
  if (message.includes('p4') || message.includes('primary 4')) {
    if (message.includes('price') || message.includes('fee') || message.includes('cost')) {
      return "💰 *Primary 4 Pricing:*\n\n• Mathematics: $118/month\n• Science: $118/month\n\n📅 *Schedule:*\n• Math: Thursday 4:00-5:30 PM\n• Science: Wednesday 5:00-6:30 PM\n\n🆓 Try P4 FREE!\n✅ Type \"book trial\"\n📞 Mr Tok: 91070546";
    }
    return "📚 *Primary 4 at NewtonLab:*\n\n*Mathematics:*\n⏰ Thursday 4:00-5:30 PM\n💰 $118/month\n\n*Science:*\n⏰ Wednesday 5:00-6:30 PM\n💰 $118/month\n\n🆓 Try P4 subjects FREE!\n✅ Type \"book trial\"\n📞 Call Mr Tok: 91070546";
  }
  
  if (message.includes('p5') || message.includes('primary 5')) {
    if (message.includes('price') || message.includes('fee') || message.includes('cost')) {
      return "💰 *Primary 5 Pricing:*\n\n• Mathematics: $138/month\n• Science: $138/month\n\n📅 *Schedule:*\n• Math: Monday 3:30-5:00 PM\n• Science: Friday 3:30-5:00 PM\n\n🆓 Try P5 FREE!\n✅ Type \"book trial\"\n📞 Mr Tok: 91070546";
    }
    return "📚 *Primary 5 at NewtonLab:*\n\n*Mathematics:*\n⏰ Monday 3:30-5:00 PM\n💰 $138/month\n\n*Science:*\n⏰ Friday 3:30-5:00 PM\n💰 $138/month\n\n🆓 Try P5 subjects FREE!\n✅ Type \"book trial\"\n📞 Call Mr Tok: 91070546";
  }
  
  if (message.includes('p6') || message.includes('primary 6')) {
    if (message.includes('price') || message.includes('fee') || message.includes('cost')) {
      return "💰 *Primary 6 Pricing:*\n\n• Mathematics: $138/month\n• Science: $138/month\n\n📅 *Schedule:*\n• Math: Monday 5:00-6:30 PM\n• Science: Tuesday & Friday 5:00-6:30 PM\n\n🆓 Try P6 FREE!\n✅ Type \"book trial\"\n📞 Mr Tok: 91070546";
    }
    return "📚 *Primary 6 at NewtonLab:*\n\n*Mathematics:*\n⏰ Monday 5:00-6:30 PM\n💰 $138/month\n\n*Science:*\n⏰ Tuesday & Friday 5:00-6:30 PM\n💰 $138/month\n\n🆓 Try P6 subjects FREE!\n✅ Type \"book trial\"\n📞 Call Mr Tok: 91070546";
  }
  
  if ((message.includes('sec 1') || message.includes('secondary 1') || message.includes('s1')) && !message.includes('sec 1')) {
    if (message.includes('price') || message.includes('fee') || message.includes('cost')) {
      return "💰 *Secondary 1 Pricing:*\n\n• Mathematics: $168/month\n• Science: $168/month\n\n📅 *Schedule:*\n• Math: Wednesday 6:45-8:00 PM\n• Science: Monday 6:30-8:00 PM\n\n🆓 Try Sec 1 FREE!\n✅ Type \"book trial\"\n📞 Mr Tok: 91070546";
    }
    return "📚 *Secondary 1 at NewtonLab:*\n\n*Mathematics:*\n⏰ Wednesday 6:45-8:00 PM\n💰 $168/month\n\n*Science:*\n⏰ Monday 6:30-8:00 PM\n💰 $168/month\n\n🆓 Try Sec 1 subjects FREE!\n✅ Type \"book trial\"\n📞 Call Mr Tok: 91070546";
  }
  
  if ((message.includes('sec 2') || message.includes('secondary 2') || message.includes('s2')) && !message.includes('sec 1') && !message.includes('sec 3')) {
    if (message.includes('price') || message.includes('fee') || message.includes('cost')) {
      return "💰 *Secondary 2 Pricing:*\n\n• Mathematics: $168/month\n• Science: $168/month\n\n📅 *Schedule:*\n• Math: Tuesday 6:30-8:00 PM\n• Science: Thursday 5:00-6:30 PM\n\n🆓 Try Sec 2 FREE!\n✅ Type \"book trial\"\n📞 Mr Tok: 91070546";
    }
    return "📚 *Secondary 2 at NewtonLab:*\n\n*Mathematics:*\n⏰ Tuesday 6:30-8:00 PM\n💰 $168/month\n\n*Science:*\n⏰ Thursday 5:00-6:30 PM\n💰 $168/month\n\n🆓 Try Sec 2 subjects FREE!\n✅ Type \"book trial\"\n📞 Call Mr Tok: 91070546";
  }
  
  if ((message.includes('sec 3') || message.includes('secondary 3') || message.includes('s3')) && !message.includes('sec 1') && !message.includes('sec 2')) {
    if (message.includes('price') || message.includes('fee') || message.includes('cost')) {
      return "💰 *Secondary 3 Pricing:*\n\n• E.Math: $198/month\n• A.Math: $198/month\n• Chemistry: $198/month\n\n📅 *Schedule:*\n• E.Math: Wednesday 8:15-9:30 PM\n• A.Math: Thursday 8:30-9:30 PM\n• Chemistry: Monday 8:30-9:30 PM\n\n🆓 Try Sec 3 FREE!\n✅ Type \"book trial\"\n📞 Mr Tok: 91070546";
    }
    return "📚 *Secondary 3 at NewtonLab:*\n\n*E.Mathematics:*\n⏰ Wednesday 8:15-9:30 PM\n💰 $198/month\n\n*A.Mathematics:*\n⏰ Thursday 8:30-9:30 PM\n💰 $198/month\n\n*Chemistry:*\n⏰ Monday 8:30-9:30 PM\n💰 $198/month\n\n🆓 Try Sec 3 subjects FREE!\n✅ Type \"book trial\"\n📞 Call Mr Tok: 91070546";
  }
  
  if ((message.includes('sec 4') || message.includes('secondary 4') || message.includes('s4')) && !message.includes('sec 1') && !message.includes('sec 2') && !message.includes('sec 3')) {
    if (message.includes('price') || message.includes('fee') || message.includes('cost')) {
      return "💰 *Secondary 4 Pricing:*\n\n• E.Math: $198/month\n• A.Math: $198/month\n• Chemistry: $198/month\n\n📅 *Schedule:*\n• E.Math: Tuesday 8:00-9:30 PM\n• A.Math: Thursday 6:30-8:00 PM\n• Chemistry: Friday 6:30-8:00 PM\n\n🆓 Try Sec 4 FREE!\n✅ Type \"book trial\"\n📞 Mr Tok: 91070546";
    }
    return "📚 *Secondary 4 at NewtonLab:*\n\n*E.Mathematics:*\n⏰ Tuesday 8:00-9:30 PM\n💰 $198/month\n\n*A.Mathematics:*\n⏰ Thursday 6:30-8:00 PM\n💰 $198/month\n\n*Chemistry:*\n⏰ Friday 6:30-8:00 PM\n💰 $198/month\n\n🆓 Try Sec 4 subjects FREE!\n✅ Type \"book trial\"\n📞 Call Mr Tok: 91070546";
  }
  
  if (message.includes('math')) {
    return "📖 *Mathematics Classes:*\n\n• P4: Thu 4:00-5:30 PM ($118)\n• P5: Mon 3:30-5:00 PM ($138)\n• P6: Mon 5:00-6:30 PM ($138)\n• Sec 1: Wed 6:45-8:00 PM ($168)\n• Sec 2: Tue 6:30-8:00 PM ($168)\n• Sec 3 E.Math: Wed 8:15-9:30 PM ($198)\n• Sec 3 A.Math: Thu 8:30-9:30 PM ($198)\n• Sec 4 E.Math: Tue 8:00-9:30 PM ($198)\n• Sec 4 A.Math: Thu 6:30-8:00 PM ($198)\n\n🆓 Try math FREE first!\n✅ Type \"book trial\"\n📞 Mr Tok: 91070546";
  }
  
  // THANKS
  if (message.includes('thank')) {
    return "🙏 You're welcome!\n\n🆓 Don't forget our FREE trial class!\n✅ Type \"book trial\" anytime\n📞 Mr Tok: 91070546";
  }
  
  // DEFAULT
  return "🤔 I didn't understand that.\n\n💡 *Try typing:*\n• \"pricing\" - Check fees\n• \"schedule\" - View timetables\n• \"book trial\" - FREE trial\n• \"contact\" - Mr Tok's details\n• \"menu\" - See all options\n\n📞 Direct help: Mr Tok 91070546";
}

// WEBHOOK
app.post('/webhook', (req, res) => {
  try {
    const incomingMessage = req.body.Body || 'hello';
    const from = req.body.From || 'unknown';
    
    console.log(`Message from ${from}: ${incomingMessage}`);
    
    const response = getBotResponse(incomingMessage);
    
    const twiml = new twilio.twiml.MessagingResponse();
    twiml.message(response);
    
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
    
  } catch (error) {
    console.error('Error processing message:', error);
    
    const twiml = new twilio.twiml.MessagingResponse();
    twiml.message('Sorry, there was an error. Please contact Mr Tok at 91070546.');
    
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  }
});

// HEALTH CHECK
app.get('/', (req, res) => {
  res.send(`
    <h1>🧪 NewtonLab WhatsApp Bot</h1>
    <p>✅ Bot is running successfully!</p>
    <p>📱 Ready to receive WhatsApp messages</p>
    <p>📞 Contact: Mr Tok 91070546</p>
    <p>🔧 Updated: ${new Date().toLocaleString()}</p>
    <hr>
    <h3>Test Commands:</h3>
    <ul>
      <li><strong>"hello"</strong> - Welcome message</li>
      <li><strong>"pricing"</strong> - Show fees</li>
      <li><strong>"schedule"</strong> - Show timetables</li>
      <li><strong>"book trial"</strong> - Trial booking</li>
      <li><strong>"CONFIRM"</strong> - Confirm booking</li>
      <li><strong>"contact"</strong> - Contact details</li>
    </ul>
  `);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`NewtonLab bot running on port ${port}`);
});
