const express = require('express');
const twilio = require('twilio');
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));

// COMPLETE NEWTONLAB TUITION CENTRE DATA
const tuitionData = {
  centerName: "NewtonLab Tuition Centre",
  
  // Organized by Level with actual schedules from timetable
  subjects: {
    // PRIMARY 4
    primary4: {
      levelName: "Primary 4",
      subjects: {
        mathematics: {
          schedule: "Thursday - 4:00 PM to 5:30 PM",
          price: "$118/month",
          vacancy: "Available slots"
        },
        science: {
          schedule: "Wednesday - 5:00 PM to 6:30 PM",
          price: "$118/month", 
          vacancy: "Available slots"
        }
      }
    },
    
    // PRIMARY 5
    primary5: {
      levelName: "Primary 5",
      subjects: {
        mathematics: {
          schedule: "Monday - 3:30 PM to 5:00 PM",
          price: "$138/month",
          vacancy: "Available slots"
        },
        science: {
          schedule: "Friday - 3:30 PM to 5:00 PM",
          price: "$138/month",
          vacancy: "Available slots"
        }
      }
    },
    
    // PRIMARY 6
    primary6: {
      levelName: "Primary 6",
      subjects: {
        mathematics: {
          schedule: "Monday - 5:00 PM to 6:30 PM",
          price: "$138/month",
          vacancy: "Available slots"
        },
        science: {
          schedule: "Tuesday - 5:00 PM to 6:30 PM, Friday - 5:00 PM to 6:30 PM",
          price: "$138/month",
          vacancy: "Available slots"
        }
      }
    },
    
    // SECONDARY 1
    secondary1: {
      levelName: "Secondary 1",
      subjects: {
        mathematics: {
          schedule: "Wednesday - 6:45 PM to 8:00 PM",
          price: "$168/month",
          vacancy: "Available slots"
        },
        science: {
          schedule: "Monday - 6:30 PM to 8:00 PM",
          price: "$168/month",
          vacancy: "Available slots"
        }
      }
    },
    
    // SECONDARY 2
    secondary2: {
      levelName: "Secondary 2",
      subjects: {
        mathematics: {
          schedule: "Tuesday - 6:30 PM to 8:00 PM",
          price: "$168/month",
          vacancy: "Available slots"
        },
        science: {
          schedule: "Thursday - 5:00 PM to 6:30 PM",
          price: "$168/month",
          vacancy: "Available slots"
        }
      }
    },
    
    // SECONDARY 3
    secondary3: {
      levelName: "Secondary 3",
      subjects: {
        emathematics: {
          subjectName: "Elementary Mathematics",
          schedule: "Wednesday - 8:15 PM to 9:30 PM",
          price: "$198/month",
          vacancy: "Available slots"
        },
        amathematics: {
          subjectName: "Additional Mathematics", 
          schedule: "Thursday - 8:30 PM to 9:30 PM",
          price: "$198/month",
          vacancy: "Available slots"
        },
        chemistry: {
          subjectName: "Chemistry",
          schedule: "Monday - 8:30 PM to 9:30 PM",
          price: "$198/month",
          vacancy: "Available slots"
        }
      }
    },
    
    // SECONDARY 4
    secondary4: {
      levelName: "Secondary 4",
      subjects: {
        emathematics: {
          subjectName: "Elementary Mathematics",
          schedule: "Tuesday - 8:00 PM to 9:30 PM",
          price: "$198/month",
          vacancy: "Available slots"
        },
        amathematics: {
          subjectName: "Additional Mathematics",
          schedule: "Thursday - 6:30 PM to 8:00 PM",
          price: "$198/month",
          vacancy: "Available slots"
        },
        chemistry: {
          subjectName: "Chemistry",
          schedule: "Friday - 6:30 PM to 8:00 PM",
          price: "$198/month",
          vacancy: "Available slots"
        }
      }
    }
  },
  
  // Package deals based on pricing table
  packages: {
    primary_basic: {
      name: "Primary Basic Package",
      levels: "P3-P6",
      description: "2nd Subject Discount",
      twoSubjects: "2nd subject at reduced rate"
    },
    secondary_lower: {
      name: "Lower Secondary Package", 
      levels: "Sec 1-2",
      description: "2nd Subject Discount",
      twoSubjects: "2nd subject at $148/month"
    },
    secondary_upper: {
      name: "Upper Secondary Package",
      levels: "Sec 3-4",
      description: "Multiple Subject Discounts",
      twoSubjects: "2nd subject at $178/month",
      threeSubjects: "3rd subject at $118/month"
    }
  },
  
  // Contact and center information
  contact: {
    phone: "91070546",
    contactPerson: "Mr Tok",
    address: "Block 748, Jurong West St 73, #B1-127, Singapore 640748",
    email: "newtonlabtuition@gmail.com",
    hours: "Monday-Friday: 3:30PM-9:30PM, Saturday-Sunday: Available",
    facebook: "NEWTONLAB TUITION CENTRE"
  },
  
  // Special offers
  specialOffers: {
    trialClass: "1 FREE Trial Lesson for any subject",
    registrationFee: "$0 Registration Fee", 
    deposit: "$0 Deposit",
    materialFee: "$5/month Material Fee",
    bundleDiscount: "Up to $100 subject bundle discount"
  }
};

// INTERACTIVE RESPONSE FUNCTIONS
function createTrialBookingMessage() {
  return `📅 *Book Your FREE Trial Class*\n\n🎯 *Available This Week:*\n• **Tomorrow 4:00 PM** - P4 Math\n• **Tomorrow 5:00 PM** - P5 Science\n• **This Saturday 2:00 PM** - Sec 3 Chemistry\n• **Call for other subjects/times**\n\n📝 *To confirm your trial class:*\n\n✅ **Reply "CONFIRM"** to book a slot\n❌ **Reply "CANCEL"** if not interested\n📞 **Call Mr Tok directly:** ${tuitionData.contact.phone}\n\n⏰ *We'll contact you within 1 hour to finalize details!*\n\n🎁 *Remember: 100% FREE with no commitment!*`;
}

function handleConfirmation(phoneNumber) {
  // Log the confirmation for Mr Tok to follow up
  console.log(`🔔 TRIAL BOOKING CONFIRMED by ${phoneNumber} at ${new Date()}`);
  
  return `✅ **TRIAL CLASS BOOKING CONFIRMED!**\n\n🎉 *Your FREE trial class is reserved!*\n\n📞 **Mr Tok will contact you within 2 hours to:**\n• Confirm your preferred subject & level\n• Arrange the best trial timing for you\n• Share exact location details\n• Answer any questions you have\n\n📱 **Contact Details:**\n• WhatsApp/Call: ${tuitionData.contact.phone}\n• Email: ${tuitionData.contact.email}\n\n🎯 **What to expect in your trial:**\n• 1.5 hour actual lesson experience\n• Meet your potential teacher\n• See our teaching methods\n• No pressure to continue whatsoever\n\n📍 **Location:** ${tuitionData.contact.address}\n\n🧪 **We're excited to meet you at NewtonLab!**`;
}

function handleCancellation() {
  return `❌ **No problem at all!**\n\n💭 *Take your time to think about it.*\n\n🆓 **Our FREE trial offer is always available** when you're ready.\n\n💡 **Still have questions?**\n📞 Call Mr Tok: ${tuitionData.contact.phone}\n💬 Continue chatting with me anytime\n📧 Email: ${tuitionData.contact.email}\n\n🎯 **Type "MENU"** anytime to see all options!\n\nThank you for considering NewtonLab! 🧪`;
}

function createQuickActions() {
  return `🎯 **Quick Actions for You:**\n\n✅ **"BOOK TRIAL"** - Reserve your FREE trial class\n📅 **"SCHEDULE"** - View all class timetables\n💰 **"PRICING"** - Check fees & packages\n📞 **"CONTACT"** - Get Mr Tok's details\n🎁 **"OFFERS"** - See special promotions\n\n💬 **Or just ask me anything like:**\n• "P4 math timing"\n• "Sec 3 chemistry price"\n• "How to register"\n\n🧪 **Ready to start your learning journey?**`;
}

// ENHANCED BOT RESPONSE FUNCTION WITH INTERACTIVE FEATURES
function getBotResponse(userMessage, from) {
  const message = userMessage.toLowerCase().trim();
  
  // INTERACTIVE BOOKING SYSTEM
  if (message.includes('book') || message.includes('trial') || message.includes('free class')) {
    return createTrialBookingMessage();
  }
  
  // CONFIRMATION RESPONSES
  if (message === 'confirm' || message === 'yes' || message === 'book now') {
    return handleConfirmation(from);
  }
  
  if (message === 'cancel' || message === 'no' || message === 'not interested') {
    return handleCancellation();
  }
  
  // ENHANCED WELCOME MESSAGE WITH INTERACTIVE OPTIONS
  if (message.includes('hello') || message.includes('hi') || message === '1' || message.includes('start') || message.includes('menu')) {
    return `🧪 **Welcome to ${tuitionData.centerName}!**\n*Primary 1 - Secondary 4*\n*Math • Science • Bio • Chem • Physics*\n\nHow can I help you today?\n\n${createQuickActions()}\n\n🆓 **SPECIAL OFFER:** 1 FREE trial class - no commitment required!\n\n📞 **Direct contact:** Mr Tok ${tuitionData.contact.phone}`;
  }
  
  // ENHANCED SCHEDULE WITH INTERACTIVE OPTIONS
  if (message.includes('schedule') || message.includes('timetable') || message.includes('time')) {
    let response = "📅 **NewtonLab Class Schedules 2025:**\n\n";
    
    Object.keys(tuitionData.subjects).forEach(level => {
      const levelData = tuitionData.subjects[level];
      response += `📚 **${levelData.levelName}**\n`;
      
      Object.keys(levelData.subjects).forEach(subject => {
        const subjectData = levelData.subjects[subject];
        const subjectName = subjectData.subjectName || subject.charAt(0).toUpperCase() + subject.slice(1);
        response += `• ${subjectName}: ${subjectData.schedule}\n`;
      });
      response += "\n";
    });
    
    response += "⏰ *Schedule starts November 2024*\n\n";
    response += "🎯 **Ready to try a FREE trial class?**\n✅ **Reply "BOOK TRIAL"** to get started!\n\n💡 Ask for specific levels like 'P5 schedule' for details.";
    return response;
  }
  
  // ENHANCED PRICING WITH BOOKING CALL-TO-ACTION
  if (message.includes('price') || message.includes('fee') || message.includes('cost')) {
    let response = "💰 **NewtonLab Pricing Structure:**\n\n";
    
    response += "📖 **Individual Subject Prices:**\n";
    response += "• P4: $118/month\n";
    response += "• P5, P6: $138/month\n"; 
    response += "• Sec 1, Sec 2: $168/month\n";
    response += "• Sec 3, Sec 4: $198/month\n\n";
    
    response += "🎯 **Package Discounts:**\n";
    response += "• *Lower Sec*: 2nd subject $148/month\n";
    response += "• *Upper Sec*: 2nd subject $178/month\n";
    response += "• *Upper Sec*: 3rd subject $118/month\n";
    response += "• Bundle discount up to $100!\n\n";
    
    response += "🎁 **What's Included:**\n";
    response += "• Registration Fee: $0\n";
    response += "• Deposit: $0\n";
    response += "• Material Fee: $5/month\n";
    response += "• 1 FREE Trial Class!\n\n";
    
    response += "🚀 **Ready to start?**\n✅ **Reply "BOOK TRIAL"** for your FREE trial!\n📞 Contact Mr Tok for package details: " + tuitionData.contact.phone;
    return response;
  }
  
  // ENHANCED AVAILABILITY WITH BOOKING OPTION
  if (message.includes('vacancy') || message.includes('available') || message.includes('slot')) {
    let response = "📊 **Current Availability:**\n\n";
    
    Object.keys(tuitionData.subjects).forEach(level => {
      const levelData = tuitionData.subjects[level];
      response += `📚 **${levelData.levelName}**\n`;
      
      Object.keys(levelData.subjects).forEach(subject => {
        const subjectData = levelData.subjects[subject];
        const subjectName = subjectData.subjectName || subject.charAt(0).toUpperCase() + subject.slice(1);
        response += `✅ ${subjectName}: ${subjectData.vacancy}\n`;
      });
      response += "\n";
    });
    
    response += "🆓 **Try before you commit!**\n✅ **Reply "BOOK TRIAL"** to secure your FREE trial spot!\n📞 Contact Mr Tok: " + tuitionData.contact.phone;
    return response;
  }
  
  // ENHANCED CONTACT WITH QUICK ACTIONS
  if (message.includes('contact') || message.includes('phone') || message.includes('address')) {
    return `📞 **NewtonLab Contact Information:**\n\n👨‍🏫 **Contact Person:** ${tuitionData.contact.contactPerson}\n☎️ **Phone:** ${tuitionData.contact.phone}\n📧 **Email:** ${tuitionData.contact.email}\n\n📍 **Address:**\n${tuitionData.contact.address}\n\n🕐 **Operating Hours:**\n${tuitionData.contact.hours}\n\n📘 **Facebook:** ${tuitionData.contact.facebook}\n\n🎯 **Quick Actions:**\n✅ **Reply "BOOK TRIAL"** for FREE trial class\n💬 **Continue chatting** with me anytime\n📞 **Call/WhatsApp** Mr Tok directly!`;
  }
  
  // ENHANCED SPECIAL OFFERS
  if (message.includes('offer') || message.includes('special') || message.includes('promotion')) {
    return `🎁 **NewtonLab Special Offers:**\n\n🆓 **${tuitionData.specialOffers.trialClass}**\n• Try for FREE with zero commitment\n• Experience our teaching style\n• Meet your potential teacher\n• If you don't like it, walk away!\n\n💸 **Low Cost Structure:**\n• ${tuitionData.specialOffers.registrationFee}\n• ${tuitionData.specialOffers.deposit}\n• ${tuitionData.specialOffers.materialFee}\n\n🎯 **${tuitionData.specialOffers.bundleDiscount}**\n\n🏆 **Additional Benefits:**\n• Free homework guidance\n• Small class sizes\n• Experienced teachers\n\n✅ **Ready to try? Reply "BOOK TRIAL"**\n📞 **Or call Mr Tok:** ${tuitionData.contact.phone}`;
  }
  
  // LEVEL-SPECIFIC QUERIES WITH BOOKING OPTION
  for (let level of Object.keys(tuitionData.subjects)) {
    const levelData = tuitionData.subjects[level];
    const levelName = levelData.levelName.toLowerCase();
    
    if (message.includes(levelName) || 
        message.includes(level) || 
        message.includes(levelName.replace(' ', '')) ||
        (levelName.includes('primary') && message.includes('p' + levelName.slice(-1))) ||
        (levelName.includes('secondary') && (message.includes('sec' + levelName.slice(-1)) || message.includes('s' + levelName.slice(-1))))) {
      
      let response = `📚 **${levelData.levelName} at NewtonLab:**\n\n`;
      
      // Check for specific subject within the level
      let specificSubject = null;
      for (let subject of Object.keys(levelData.subjects)) {
        const subjectData = levelData.subjects[subject];
        const subjectName = (subjectData.subjectName || subject).toLowerCase();
        
        if (message.includes(subject) || 
            message.includes(subjectName) ||
            (subject === 'emathematics' && (message.includes('e math') || message.includes('emath') || message.includes('elementary'))) ||
            (subject === 'amathematics' && (message.includes('a math') || message.includes('amath') || message.includes('additional')))) {
          specificSubject = subject;
          break;
        }
      }
      
      if (specificSubject) {
        // Show specific subject details with booking option
        const subjectData = levelData.subjects[specificSubject];
        const subjectName = subjectData.subjectName || specificSubject.charAt(0).toUpperCase() + specificSubject.slice(1);
        
        response = `📖 **${levelData.levelName} - ${subjectName}**\n\n`;
        response += `⏰ **Schedule:** ${subjectData.schedule}\n`;
        response += `💰 **Price:** ${subjectData.price}\n`;
        response += `✅ **Availability:** ${subjectData.vacancy}\n\n`;
        response += `🆓 **Want to try this subject FREE?**\n✅ **Reply "BOOK TRIAL"** to reserve your spot!\n📞 **Call Mr Tok:** ${tuitionData.contact.phone}`;
      } else {
        // Show all subjects for this level with booking option
        Object.keys(levelData.subjects).forEach(subject => {
          const subjectData = levelData.subjects[subject];
          const subjectName = subjectData.subjectName || subject.charAt(0).toUpperCase() + subject.slice(1);
          response += `📖 **${subjectName}**\n`;
          response += `⏰ ${subjectData.schedule}\n`;
          response += `💰 ${subjectData.price}\n`;
          response += `✅ ${subjectData.vacancy}\n\n`;
        });
        response += `🆓 **Try any subject FREE!**\n✅ **Reply "BOOK TRIAL"** to get started!\n💡 Ask for specific subjects like "${levelData.levelName} math"`;
      }
      
      return response;
    }
  }
  
  // SUBJECT-SPECIFIC QUERIES WITH BOOKING
  const searchTerms = {
    mathematics: ['math', 'maths', 'mathematics'],
    emathematics: ['e math', 'emath', 'elementary math'],
    amathematics: ['a math', 'amath', 'additional math'],
    science: ['science'],
    chemistry: ['chemistry', 'chem']
  };
  
  for (let [subjectKey, terms] of Object.entries(searchTerms)) {
    for (let term of terms) {
      if (message.includes(term)) {
        let response = `📖 **${term.toUpperCase()} Classes at NewtonLab:**\n\n`;
        let found = false;
        
        Object.keys(tuitionData.subjects).forEach(level => {
          const levelData = tuitionData.subjects[level];
          if (levelData.subjects[subjectKey]) {
            const subjectData = levelData.subjects[subjectKey];
            response += `🎓 **${levelData.levelName}**\n`;
            response += `⏰ ${subjectData.schedule}\n`;
            response += `💰 ${subjectData.price}\n`;
            response += `✅ ${subjectData.vacancy}\n\n`;
            found = true;
          }
        });
        
        if (found) {
          response += `🆓 **Try ${term} FREE first!**\n✅ **Reply "BOOK TRIAL"** to start!\n📞 **Contact Mr Tok:** ${tuitionData.contact.phone}`;
          return response;
        }
      }
    }
  }
  
  // REGISTRATION/ENROLLMENT WITH INTERACTIVE FLOW
  if (message.includes('register') || message.includes('enroll') || message.includes('join') || message.includes('sign up')) {
    return `📝 **How to Join NewtonLab:**\n\n**Step 1: 🆓 Book FREE Trial Class**\n✅ **Reply "BOOK TRIAL"** now\n📞 Or call Mr Tok: ${tuitionData.contact.phone}\n\n**Step 2: 🎯 Try the Class**\n🆓 Attend 1 free lesson - no fees required\n👨‍🏫 Experience our teaching style\n\n**Step 3: 💫 If You Like It**\n✅ Continue with regular classes\n💰 Pay monthly fees + $5/month material fee\n\n**Step 4: 🚪 If You Don't Like It**\n❌ Walk away - no extra charges!\n\n📍 **Location:** ${tuitionData.contact.address}\n\n💡 **Why Choose NewtonLab?**\n• Small class sizes • Experienced teachers\n• Free homework guidance • No hidden costs\n\n🚀 **Ready to start? Reply "BOOK TRIAL"!**`;
  }
  
  // GRATITUDE WITH BOOKING REMINDER
  if (message.includes('thank') || message.includes('thanks')) {
    return `🙏 **You're very welcome! Happy to help!**\n\n🆓 **Don't forget** - we offer 1 FREE trial class for any subject with zero commitment!\n\n🎯 **Ready to try?**\n✅ **Reply "BOOK TRIAL"** anytime\n💬 **Type "MENU"** for all options\n📞 **Call Mr Tok:** ${tuitionData.contact.phone}\n\n🧪 **Looking forward to meeting you at NewtonLab!**`;
  }
  
  // DEFAULT RESPONSE WITH INTERACTIVE OPTIONS
  return `🤔 **I'm not sure about that, but I'm here to help!**\n\n💡 **Try asking:**\n• "P5 math schedule"\n• "Sec 3 chemistry price" \n• "Book trial class"\n• "What are your offers?"\n\n🎯 **Quick Actions:**\n✅ **"BOOK TRIAL"** - Reserve FREE trial\n📞 **"CONTACT"** - Get Mr Tok's details\n💬 **"MENU"** - See all options\n\n📞 **For direct help:** Mr Tok ${tuitionData.contact.phone}`;
}

// WEBHOOK ENDPOINT WITH ENHANCED INTERACTIVITY
app.post('/webhook', (req, res) => {
  const incomingMessage = req.body.Body;
  const from = req.body.From;
  const profileName = req.body.ProfileName || 'Student';
  
  console.log(`📱 Message from ${profileName} (${from}): ${incomingMessage}`);
  
  const response = getBotResponse(incomingMessage, from);
  
  const twiml = new twilio.twiml.MessagingResponse();
  twiml.message(response);
  
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

// HEALTH CHECK ENDPOINT
app.get('/', (req, res) => {
  res.send(`
    <h1>🧪 ${tuitionData.centerName} Interactive WhatsApp Bot</h1>
    <p>✅ Bot is running successfully with interactive features!</p>
    <p>📱 Students can now book trials with confirmations</p>
    <p>🎯 Features: Trial booking, confirmations, enhanced responses</p>
    <p>📞 Contact: ${tuitionData.contact.phone} (${tuitionData.contact.contactPerson})</p>
    <p>📍 ${tuitionData.contact.address}</p>
    <p>🔧 Last updated: ${new Date().toLocaleString()}</p>
    <hr>
    <h3>🧪 Test Commands:</h3>
    <ul>
      <li><strong>"hello"</strong> - Enhanced welcome with quick actions</li>
      <li><strong>"book trial"</strong> - Interactive trial booking</li>
      <li><strong>"CONFIRM"</strong> - Confirm trial booking</li>
      <li><strong>"CANCEL"</strong> - Cancel booking</li>
      <li><strong>"pricing"</strong> - Enhanced pricing with booking CTA</li>
    </ul>
  `);
});

// START THE SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🧪 NewtonLab Interactive WhatsApp bot running on port ${port}`);
});
