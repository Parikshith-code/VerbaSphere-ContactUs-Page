// Chatbot functionality
const chatForm = document.getElementById('chat-form');
const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('user-input');

// Predefined responses for the chatbot
const botResponses = {
  'hello': 'Hello! Welcome to VerbaSphere. How can I assist you today?',
  'hi': 'Hi there! What can I help you with?',
  'help': 'I\'m here to help! You can ask me about our services, blogs, or any questions you have.',
  'blog': 'VerbaSphere is a platform for sharing and discovering amazing blog content. You can write your own blogs or explore our community posts!',
  'support': 'For technical support, please email us at support@verbasphere.com or use our contact form below.',
  'contact': 'You can reach us via email at contact@verbasphere.com, or fill out the contact form on this page.',
  'hours': 'Our live chat is available 24/7, and email support typically responds within 24 hours.',
  'pricing': 'VerbaSphere is free to use! You can read and write blogs without any cost.',
  'default': 'Thank you for your message! If you need immediate assistance, please email us at contact@verbasphere.com'
};

// Add message to chat function
function addMessage(text, className) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${className}`;
  messageDiv.textContent = text;
  chatbox.appendChild(messageDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Generate bot response function
function generateBotResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();
  
  // Check for keywords in the message
  for (const keyword in botResponses) {
    if (lowerMessage.includes(keyword) && keyword !== 'default') {
      return botResponses[keyword];
    }
  }
  
  return botResponses['default'];
}

// Show typing indicator function
function showTypingIndicator() {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'message bot-message typing';
  typingDiv.innerHTML = 'VerbaSphere is typing...';
  typingDiv.id = 'typing-indicator';
  chatbox.appendChild(typingDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Remove typing indicator function
function removeTypingIndicator() {
  const typingIndicator = document.getElementById('typing-indicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

// Chat form submit event listener
chatForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const message = userInput.value.trim();
  if (message === '') return;

  // Add user message to chat
  addMessage(message, 'user-message');

  // Clear input
  userInput.value = '';

  // Show typing indicator
  showTypingIndicator();

  // Generate bot response with delay
  setTimeout(() => {
    removeTypingIndicator();
    const response = generateBotResponse(message);
    addMessage(response, 'bot-message');
  }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
});

// Contact form functionality
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');
  
  // Simulate form submission
  alert(`Thank you, ${name}! Your message has been sent successfully. We'll get back to you at ${email} soon.`);
  
  // Reset form
  contactForm.reset();
});

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

