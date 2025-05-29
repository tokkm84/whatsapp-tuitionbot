// NEWTONLAB TUITION CENTRE DATA STRUCTURE
// Complete bot code with actual schedules and pricing

const express = require('express');
const twilio = require('twilio');
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));

// NEWTONLAB TUITION CENTRE DATA
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
    phone: "88061249",
    contactPerson: "Mr Tok",
    address: "Block 748, Jurong West St 73, #B1-127, Singapore 640748",
    email: "newtonlabtuition@gmail.com",
    hours: "Monday-Friday: 3:30PM-9:30PM, Saturday: Available",
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

// Enhanced bot response function for NewtonLab
function getBotResponse(userMessage) {
  const message = userMessage.toLowerCase().trim();
  
  // Welcome message
  if (message.includes('hello') || message.includes('hi') || message === '1' || message.includes('start') || message.includes('menu')) {
    return `🧪 Welcome to *${tuitionData.centerName}*!\n*Primary 1 - Secondary 4*\n*Math • Science • Bio • Chem • Physics*\n\nHow can I help you today?\n\n1️⃣ View Class Schedules\n2️⃣ Check Pricing & Packages\n3️⃣ Check Availability\n4️⃣ Browse by Level\n5️⃣ Contact Information\n6️⃣ Special Offers\n\n💬 *Quick searches:*\n• "Primary 4 math"\n• "Sec 3 chemistry" \n• "A math timing"\n• "Free trial"\n\n📞 Contact Mr Tok: ${tuitionData.contact.phone}`;
  }
  
  // All schedules from timetable
  if (message.includes('schedule') || message.includes('time') || message.includes('timetable') || message === '1') {
    let response = "📅 *NewtonLab Class Schedules 2025:*\n\n";
    
    Object.keys(tuitionData.subjects).forEach(level => {
      const levelData = tuitionData.subjects[level];
      response += `📚 *${levelData.levelName}*\n`;
      
      Object.keys(levelData.subjects).forEach(subject => {
        const subjectData = levelData.subjects[subject];
        const subjectName = subjectData.subjectName || subject.charAt(0).toUpperCase() + subject.slice(1);
        response += `• ${subjectName}: ${subjectData.schedule}\n`;
      });
      response += "\n";
    });
    
    response += "⏰ *Schedule starts November 2024*\n";
    response += "💡 Ask for specific levels like 'P5 schedule' or 'Sec 3 timing'";
    return response;
  }
  
  // Pricing information with package deals
  if (message.includes('price') || message.includes('fee') || message.includes('cost') || message === '2') {
    let response = "💰 *NewtonLab Pricing Structure:*\n\n";
    
    // Individual subject prices by level
    response += "📖 *Individual Subject Prices:*\n";
    response += "• P4: $118/month\n";
    response += "• P5, P6: $138/month\n"; 
    response += "• Sec 1, Sec 2: $168/month\n";
    response += "• Sec 3, Sec 4: $198/month\n\n";
    
    // Package deals
    response += "🎯 *Package Discounts:*\n";
    response += "• *Lower Sec*: 2nd subject $148/month\n";
    response += "• *Upper Sec*: 2nd subject $178/month\n";
    response += "• *Upper Sec*: 3rd subject $118/month\n";
    response += "• Bundle discount up to $100!\n\n";
    
    // Special offers
    response += "🎁 *Special Offers:*\n";
    response += "• Registration Fee: $0\n";
    response += "• Deposit: $0\n";
    response += "• Material Fee: $5/month\n";
    response += "• 1 FREE Trial Class!\n\n";
    
    response += "📞 Contact Mr Tok for package details: " + tuitionData.contact.phone;
    return response;
  }
  
  // Availability check
  if (message.includes('vacancy') || message.includes('available') || message.includes('slot') || message === '3') {
    let response = "📊 *Current Availability:*\n\n";
    
    Object.keys(tuitionData.subjects).forEach(level => {
      const levelData = tuitionData.subjects[level];
      response += `📚 *${levelData.levelName}*\n`;
      
      Object.keys(levelData.subjects).forEach(subject => {
        const subjectData = levelData.subjects[subject];
        const subjectName = subjectData.subjectName || subject.charAt(0).toUpperCase() + subject.slice(1);
        response += `✅ ${subjectName}: ${subjectData.vacancy}\n`;
      });
      response += "\n";
    });
    
    response += "🆓 *Try 1 FREE Trial Class first!*\n";
    response += "📞 Contact Mr Tok to book: " + tuitionData.contact.phone;
    return response;
  }
  
  // Browse by level
  if (message.includes('level') || message === '4') {
    return `📚 *Browse NewtonLab by Level:*\n\n🎒 *Primary Levels:*\n• P4: Math ($118), Science ($118)\n• P5: Math ($138), Science ($138)\n• P6: Math ($138), Science ($138)\n\n🎓 *Secondary Levels:*\n• Sec 1: Math ($168), Science ($168)\n• Sec 2: Math ($168), Science ($168)\n• Sec 3: E.Math ($198), A.Math ($198), Chemistry ($198)\n• Sec 4: E.Math ($198), A.Math ($198), Chemistry ($198)\n\n💡 Ask like: "P5 details" or "Sec 3 subjects"\n🆓 FREE trial available for all subjects!`;
  }
  
  // Contact information
  if (message.includes('contact') || message.includes('phone') || message.includes('address') || message === '5') {
    return `📞 *NewtonLab Contact Information:*\n\n👨‍🏫 Contact Person: ${tuitionData.contact.contactPerson}\n☎️ Phone: ${tuitionData.contact.phone}\n📧 Email: ${tuitionData.contact.email}\n\n📍 *Address:*\n${tuitionData.contact.address}\n\n🕐 *Operating Hours:*\n${tuitionData.contact.hours}\n\n📘 Facebook: ${tuitionData.contact.facebook}\n\n💬 WhatsApp us anytime or call directly!`;
  }
  
  // Special offers
  if (message.includes('offer') || message.includes('trial') || message.includes('free') || message === '6') {
    return `🎁 *NewtonLab Special Offers:*\n\n🆓 *${tuitionData.specialOffers.trialClass}*\n• Try for free without any fees\n• If your child doesn't like our class, walk away after the free class without paying anything!\n\n💸 *Low Cost Structure:*\n• ${tuitionData.specialOffers.registrationFee}\n• ${tuitionData.specialOffers.deposit}\n• ${tuitionData.specialOffers.materialFee}\n\n🎯 *${tuitionData.specialOffers.bundleDiscount}*\n\n🏆 *Additional Benefits:*\n• Free homework guidance\n• Small class sizes\n• Experienced teachers\n\n📞 Book your FREE trial: ${tuitionData.contact.phone}`;
  }
  
  // Level-specific queries
  for (let level of Object.keys(tuitionData.subjects)) {
    const levelData = tuitionData.subjects[level];
    const levelName = levelData.levelName.toLowerCase();
    
    if (message.includes(levelName) || 
        message.includes(level) || 
        message.includes(levelName.replace(' ', '')) ||
        (levelName.includes('primary') && message.includes('p' + levelName.slice(-1))) ||
        (levelName.includes('secondary') && (message.includes('sec' + levelName.slice(-1)) || message.includes('s' + levelName.slice(-1))))) {
      
      let response = `📚 *${levelData.levelName} at NewtonLab:*\n\n`;
      
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
        // Show specific subject details
        const subjectData = levelData.subjects[specificSubject];
        const subjectName = subjectData.subjectName || specificSubject.charAt(0).toUpperCase() + specificSubject.slice(1);
        
        response = `📖 *${levelData.levelName} - ${subjectName}*\n\n`;
        response += `⏰ *Schedule:* ${subjectData.schedule}\n`;
        response += `💰 *Price:* ${subjectData.price}\n`;
        response += `✅ *Availability:* ${subjectData.vacancy}\n\n`;
        response += `🆓 *Try 1 FREE trial class first!*\n`;
        response += `📞 Book now with Mr Tok: ${tuitionData.contact.phone}`;
      } else {
        // Show all subjects for this level
        Object.keys(levelData.subjects).forEach(subject => {
          const subjectData = levelData.subjects[subject];
          const subjectName = subjectData.subjectName || subject.charAt(0).toUpperCase() + subject.slice(1);
          response += `📖 *${subjectName}*\n`;
          response += `⏰ ${subjectData.schedule}\n`;
          response += `💰 ${subjectData.price}\n`;
          response += `✅ ${subjectData.vacancy}\n\n`;
        });
        response += `🆓 FREE trial available for all subjects!\n`;
        response += `💡 Ask for specific subjects like "${levelData.levelName} math"`;
      }
      
      return response;
    }
  }
  
  // Subject-specific queries across all levels
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
        let response = `📖 *${term.toUpperCase()} Classes at NewtonLab:*\n\n`;
        let found = false;
        
        Object.keys(tuitionData.subjects).forEach(level => {
          const levelData = tuitionData.subjects[level];
          if (levelData.subjects[subjectKey]) {
            const subjectData = levelData.subjects[subjectKey];
            const subjectName = subjectData.subjectName || subjectKey.charAt(0).toUpperCase() + subjectKey.slice(1);
            response += `🎓 *${levelData.levelName}*\n`;
            response += `⏰ ${subjectData.schedule}\n`;
            response += `💰 ${subjectData.price}\n`;
            response += `✅ ${subjectData.vacancy}\n\n`;
            found = true;
          }
        });
        
        if (found) {
          response += `🆓 Try FREE trial class first!\n`;
          response += `📞 Contact Mr Tok: ${tuitionData.contact.phone}`;
          return response;
        }
      }
    }
  }
  
  // Registration/enrollment queries
  if (message.includes('register') || message.includes('enroll') || message.includes('join') || message.includes('sign up')) {
            return `📝 *How to Join NewtonLab:*\n\n1️⃣ *Book FREE Trial Class*\n📞 Call/WhatsApp Mr Tok: ${tuitionData.contact.phone}\n\n2️⃣ *Try the Class*\n🆓 Attend 1 free lesson - no fees required\n\n3️⃣ *If You Like It*\n✅ Continue with regular classes\n💰 Pay monthly fees + $5/month material fee\n\n4️⃣ *If You Don't Like It*\n🚪 Walk away - no extra charges!\n\n📍 *Location:* ${tuitionData.contact.address}\n\n💡 *Why Choose NewtonLab?*\n• Small class sizes\n• Experienced teachers\n• Free homework guidance\n• No registration fee or deposit`;
  }
  
  // Thanks/gratitude
  if (message.includes('thank') || message.includes('thanks')) {
    return `🙏 You're welcome! Happy to help!\n\n🆓 Don't forget - we offer 1 FREE trial class for any subject!\n\nNeed anything else? Type 'menu' for options or call Mr Tok directly.\n\n📞 ${tuitionData.contact.phone}`;
  }
  
  // Default response for unrecognized queries
  return `🤔 I'm not sure about that, but I'm here to help!\n\n💡 *Try asking:*\n• "P5 math schedule"\n• "Sec 3 chemistry price" \n• "Free trial class"\n• "A math timing"\n• "Contact information"\n\nOr type *'menu'* to see all options!\n\n📞 For direct enquiries, contact Mr Tok: ${tuitionData.contact.phone}`;
}

// Webhook endpoint for receiving WhatsApp messages
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

// Health check endpoint
app.get('/', (req, res) => {
  res.send(`
    <h1>🧪 ${tuitionData.centerName} WhatsApp Bot</h1>
    <p>✅ Bot is running successfully!</p>
    <p>📱 Students can now chat with your WhatsApp bot</p>
    <p>📞 Contact: ${tuitionData.contact.phone} (${tuitionData.contact.contactPerson})</p>
    <p>📍 ${tuitionData.contact.address}</p>
    <p>🔧 Last updated: ${new Date().toLocaleString()}</p>
  `);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`NewtonLab WhatsApp bot server running on port ${port}`);
});
