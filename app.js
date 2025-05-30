// INTERACTIVE WHATSAPP BOT WITH BUTTONS AND CONFIRMATIONS
// Add this enhanced functionality to your existing bot

const express = require('express');
const twilio = require('twilio');
const app = express();

app.use(express.urlencoded({ extended: false }));

// Your existing tuitionData here...
const tuitionData = {
  centerName: "NewtonLab Tuition Centre",
  // ... your existing data
  contact: {
    phone: "88061249",
    contactPerson: "Mr Tok",
    address: "Block 748, Jurong West St 73, #B1-127, Singapore 640748",
    email: "newtonlabtuition@gmail.com"
  }
};

// ENHANCED BOT WITH INTERACTIVE FEATURES
function getBotResponse(userMessage, from) {
  const message = userMessage.toLowerCase().trim();
  
  // APPOINTMENT BOOKING SYSTEM
  if (message.includes('book') || message.includes('appointment') || message.includes('trial class')) {
    return createTrialBookingMessage();
  }
  
  // CONFIRMATION RESPONSES
  if (message === 'confirm' || message === 'yes' || message === '✅') {
    return handleConfirmation(from);
  }
  
  if (message === 'cancel' || message === 'no' || message === '❌') {
    return handleCancellation();
  }
  
  // SCHEDULE WITH INTERACTIVE OPTIONS
  if (message.includes('schedule') || message === '1') {
    return createScheduleWithOptions();
  }
  
  // ENROLLMENT PROCESS
  if (message.includes('enroll') || message.includes('register') || message.includes('join')) {
    return createEnrollmentProcess();
  }
  
  // Your existing bot responses...
  // [Include all your existing getBotResponse logic here]
  
  return `🤔 I'm not sure about that. Try typing "menu" for options!`;
}

// CREATE TRIAL CLASS BOOKING MESSAGE
function createTrialBookingMessage() {
  return `📅 *Book Your FREE Trial Class*\n\n🎯 *Available Trial Slots:*\n• Tomorrow 4:00 PM - P4 Math\n• Tomorrow 5:00 PM - P5 Science\n• This Saturday 2:00 PM - Sec 3 Chemistry\n\n📝 *To confirm your trial class:*\n\n✅ Reply "CONFIRM" to book\n❌ Reply "CANCEL" if not interested\n📞 Call Mr Tok directly: 91070546\n\n⏰ *We'll send you a confirmation message within 1 hour!*`;
}

// SCHEDULE WITH INTERACTIVE OPTIONS
function createScheduleWithOptions() {
  return `📅 *NewtonLab Class Schedules*\n\n📚 *Select your level:*\n\n1️⃣ Primary 4-6 Schedules\n2️⃣ Secondary 1-2 Schedules  \n3️⃣ Secondary 3-4 Schedules\n\n🆓 *Quick Actions:*\n✅ Type "BOOK TRIAL" for free trial\n📞 Type "CONTACT" for Mr Tok's details\n💰 Type "PRICING" for fees\n\n*Just reply with the number or action!*`;
}

// ENROLLMENT PROCESS
function createEnrollmentProcess() {
  return `📝 *NewtonLab Enrollment Process*\n\n*Step 1: FREE Trial Class* 🆓\n✅ Book and attend trial class\n❌ No fees required\n\n*Step 2: If You Like It* 👍\n📋 Complete registration form\n💳 Pay first month fee\n📚 Start regular classes\n\n*Step 3: If You Don't Like It* 👎\n🚪 Walk away - no charges!\n\n🎯 *Ready to start?*\n✅ Reply "BOOK TRIAL" \n📞 Reply "CALL MR TOK"\n❓ Reply "MORE INFO"`;
}

// HANDLE CONFIRMATIONS
function handleConfirmation(phoneNumber) {
  // Log the confirmation for manual follow-up
  console.log(`TRIAL BOOKING CONFIRMED by ${phoneNumber} at ${new Date()}`);
  
  return `✅ *Booking Confirmed!*\n\n🎉 *Your FREE trial class is reserved!*\n\n📞 *Mr Tok will contact you within 2 hours to:*\n• Confirm your preferred subject\n• Arrange the trial timing\n• Share the center location\n\n📱 *Contact Details:*\nWhatsApp/Call: 91070546\n📧 Email: newtonlabtuition@gmail.com\n\n🎯 *What to expect:*\n• 1.5 hour trial lesson\n• Meet the teacher\n• Experience our teaching style\n• No pressure to continue\n\n📍 See you soon at NewtonLab! 🧪`;
}

// HANDLE CANCELLATIONS
function handleCancellation() {
  return `❌ *No problem at all!*\n\n💭 *Take your time to think about it.*\n\n🆓 *Our FREE trial offer is always available when you're ready.*\n\n💡 *Still have questions?*\n📞 Call Mr Tok: 91070546\n💬 Continue chatting with me\n📧 Email: newtonlabtuition@gmail.com\n\n🎯 *Type "MENU" anytime to see all options!*\n\nThank you for considering NewtonLab! 🧪`;
}

// WEBHOOK WITH ENHANCED INTERACTIVITY
app.post('/webhook', (req, res) => {
  const incomingMessage = req.body.Body;
  const from = req.body.From;
  const profileName = req.body.ProfileName || 'Student';
  
  console.log(`Message from ${profileName} (${from}): ${incomingMessage}`);
  
  const response = getBotResponse(incomingMessage, from);
  
  const twiml = new twilio.twiml.MessagingResponse();
  
  // ENHANCED WELCOME MESSAGE WITH BUTTONS
  if (incomingMessage.toLowerCase().includes('hello') || incomingMessage.toLowerCase().includes('hi')) {
    const welcomeMsg = `🧪 Hello ${profileName}! Welcome to *NewtonLab Tuition Centre*!\n\n*Primary 1 - Secondary 4*\n*Math • Science • Bio • Chem • Physics*\n\n🎯 *Quick Actions:*\n✅ BOOK TRIAL - Free trial class\n📅 SCHEDULE - View timetables\n💰 PRICING - Check fees\n📞 CONTACT - Speak to Mr Tok\n\n💬 *Or just tell me what you need!*\n\n🆓 *Special: 1 FREE trial class - no commitment!*`;
    
    twiml.message(welcomeMsg);
  } else {
    twiml.message(response);
  }
  
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

// APPOINTMENT REMINDER SYSTEM (Advanced Feature)
function sendAppointmentReminder(phoneNumber, appointmentDetails) {
  // This would be called by a scheduled job
  const reminderMessage = `📅 *Appointment Reminder*\n\n⏰ *Your trial class is coming up:*\n${appointmentDetails.date} at ${appointmentDetails.time}\n\n📍 *Location:*\nBlock 748, Jurong West St 73, #B1-127\nSingapore 640748\n\n🎯 *What to bring:*\n• Student's school materials\n• Notebook and pen\n• Any questions about the subject\n\n✅ Reply "CONFIRM" if you're coming\n❌ Reply "RESCHEDULE" if you need to change\n📞 Call Mr Tok: 91070546\n\n*See you soon! 🧪*`;
  
  // Send via Twilio (implementation depends on your setup)
  return reminderMessage;
}

// FEEDBACK COLLECTION AFTER TRIAL
function sendTrialFeedback(phoneNumber) {
  const feedbackMessage = `🎓 *How was your trial class?*\n\n📝 *Please let us know:*\n\n⭐ Rate your experience:\n5️⃣ Excellent\n4️⃣ Good  \n3️⃣ Average\n2️⃣ Below Average\n1️⃣ Poor\n\n💬 *Quick feedback:*\n✅ "CONTINUE" - I want to enroll\n❓ "QUESTIONS" - I have questions\n⏰ "THINK" - I need time to decide\n\n📞 *Speak to Mr Tok directly:* 91070546\n\nThank you for trying NewtonLab! 🧪`;
  
  return feedbackMessage;
}

// REST OF YOUR SERVER CODE
app.get('/', (req, res) => {
  res.send(`
    <h1>🧪 NewtonLab Interactive WhatsApp Bot</h1>
    <p>✅ Bot is running with interactive features!</p>
    <p>📱 Students can now book trials with confirmations</p>
    <p>🎯 Features: Buttons, confirmations, appointment booking</p>
    <p>📞 Contact: 91070546 (Mr Tok)</p>
    <p>🔧 Last updated: ${new Date().toLocaleString()}</p>
  `);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`NewtonLab Interactive WhatsApp bot running on port ${port}`);
});
