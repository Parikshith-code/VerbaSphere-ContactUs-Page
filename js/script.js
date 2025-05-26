document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const nav = document.querySelector("nav");

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function () {
      nav.classList.toggle("active");
      this.classList.toggle("active");
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
          otherItem.querySelector(".faq-toggle").textContent = "+";
        }
      });

      // Toggle current item
      item.classList.toggle("active");
      const toggleIcon = item.querySelector(".faq-toggle");
      toggleIcon.textContent = item.classList.contains("active") ? "−" : "+";
    });
  });

  // Chatbot functionality
  const chatForm = document.getElementById("chat-form");
  const chatbox = document.getElementById("chatbox");
  const userInput = document.getElementById("user-input");
  const suggestionBtns = document.querySelectorAll(".suggestion-btn");

  // Predefined responses for the chatbot
  const botResponses = {
    hello: "Hello! Welcome to VerbaSphere. How can I assist you today?",
    hi: "Hi there! What can I help you with?",
    help: "I'm here to help! You can ask me about our services, blogs, or any questions you have.",
    blog: "VerbaSphere is a platform for sharing and discovering amazing blog content. You can write your own blogs or explore our community posts!",
    support:
      "For technical support, please email us at support@verbasphere.com or use our contact form below.",
    contact:
      "You can reach us via email at contact@verbasphere.com, or fill out the contact form on this page.",
    hours:
      "Our live chat is available 24/7, and email support typically responds within 24 hours.",
    pricing:
      "VerbaSphere is free to use! You can read and write blogs without any cost.",
    create:
      'To create a blog, sign in to your account, click on "Write Blog" in the navigation menu, and follow the step-by-step guide!',
    subscription:
      "We offer free basic access and premium plans starting at $9.99/month with additional features like analytics and priority support.",
    human:
      "I'll connect you with a human agent right away. Please hold for a moment while I transfer you.",
    default:
      "Thank you for your message! If you need immediate assistance, please email us at contact@verbasphere.com or try asking another question.",
  };

  // Add message to chat function
  function addMessage(content, isBot = false) {
    const messageDiv = document.createElement("div");
    messageDiv.className = isBot
      ? "message bot-message"
      : "message user-message";

    const messageContent = document.createElement("div");
    messageContent.className = "message-content";

    // Handle multiple paragraphs
    if (typeof content === "string") {
      const paragraphs = content.split("\n").filter((p) => p.trim() !== "");
      paragraphs.forEach((paragraph) => {
        const p = document.createElement("p");
        p.textContent = paragraph;
        messageContent.appendChild(p);
      });
    } else {
      const p = document.createElement("p");
      p.textContent = content;
      messageContent.appendChild(p);
    }

    messageDiv.appendChild(messageContent);

    // Add timestamp
    const timestamp = document.createElement("span");
    timestamp.className = "message-time";
    timestamp.textContent = "Just now";
    messageDiv.appendChild(timestamp);

    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
  }

  // Generate bot response function
  function generateBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();

    // Check for keywords in the message
    for (const keyword in botResponses) {
      if (lowerMessage.includes(keyword) && keyword !== "default") {
        return botResponses[keyword];
      }
    }

    return botResponses["default"];
  }

  // Show typing indicator function
  function showTypingIndicator() {
    const typingDiv = document.createElement("div");
    typingDiv.className = "message bot-message";

    const typingContent = document.createElement("div");
    typingContent.className = "message-content typing";
    typingContent.innerHTML =
      "<p>Typing<span>.</span><span>.</span><span>.</span></p>";

    typingDiv.appendChild(typingContent);
    typingDiv.id = "typing-indicator";

    chatbox.appendChild(typingDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
  }

  // Remove typing indicator function
  function removeTypingIndicator() {
    const typingIndicator = document.getElementById("typing-indicator");
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  // Handle chat form submission
  if (chatForm) {
    chatForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const message = userInput.value.trim();
      if (message === "") return;

      // Add user message to chat
      addMessage(message, false);

      // Clear input
      userInput.value = "";

      // Show typing indicator
      showTypingIndicator();

      // Generate bot response with delay
      setTimeout(() => {
        removeTypingIndicator();
        const response = generateBotResponse(message);
        addMessage(response, true);
      }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    });
  }

  // Handle suggestion buttons
  if (suggestionBtns) {
    suggestionBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const query = this.getAttribute("data-query");
        if (userInput) {
          userInput.value = query;

          // Trigger form submission
          const submitEvent = new Event("submit", {
            bubbles: true,
            cancelable: true,
          });
          chatForm.dispatchEvent(submitEvent);
        }
      });
    });
  }

  // Character counter for message textarea
  const messageTextarea = document.getElementById("message");
  const charCount = document.getElementById("char-count");

  if (messageTextarea && charCount) {
    messageTextarea.addEventListener("input", function () {
      const count = this.value.length;
      charCount.textContent = count;

      // Visual feedback when approaching limit
      if (count > 450) {
        charCount.style.color = "#ff6b6b";
      } else {
        charCount.style.color = "";
      }
    });
  }

  // Contact form validation and submission
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Basic validation
      let isValid = true;
      const requiredFields = contactForm.querySelectorAll("[required]");

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add("error");
        } else {
          field.classList.remove("error");
        }
      });

      // Email validation
      const emailField = contactForm.querySelector('[type="email"]');
      if (emailField && emailField.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
          isValid = false;
          emailField.classList.add("error");
        }
      }

      if (isValid) {
        // Simulate form submission
        const formData = new FormData(contactForm);
        const name = formData.get("name");

        // Create success message
        const successMessage = document.createElement("div");
        successMessage.className = "form-success";
        successMessage.innerHTML = `
          <div class="success-icon">✓</div>
          <h3>Thank you, ${name}!</h3>
          <p>Your message has been sent successfully. We'll get back to you soon.</p>
        `;

        // Replace form with success message
        contactForm.style.opacity = "0";
        setTimeout(() => {
          contactForm.parentNode.replaceChild(successMessage, contactForm);
          successMessage.style.opacity = "0";
          setTimeout(() => {
            successMessage.style.opacity = "1";
          }, 50);
        }, 300);
      }
    });
  }

  // Testimonial slider
  const testimonialSlider = document.querySelector(".testimonials-slider");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".testimonial-nav.prev");
  const nextBtn = document.querySelector(".testimonial-nav.next");

  if (testimonialSlider && dots.length && prevBtn && nextBtn) {
    let currentSlide = 0;
    const testimonials = document.querySelectorAll(".testimonial");
    const maxSlides = testimonials.length;

    // Initialize - hide all except first
    testimonials.forEach((slide, index) => {
      if (index !== 0) {
        slide.style.display = "none";
      }
    });

    // Function to show slide
    function showSlide(index) {
      testimonials.forEach((slide, i) => {
        slide.style.display = i === index ? "block" : "none";
      });

      // Update dots
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });

      currentSlide = index;
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => showSlide(index));
    });

    // Event listeners for prev/next buttons
    prevBtn.addEventListener("click", () => {
      let newIndex = currentSlide - 1;
      if (newIndex < 0) newIndex = maxSlides - 1;
      showSlide(newIndex);
    });

    nextBtn.addEventListener("click", () => {
      let newIndex = currentSlide + 1;
      if (newIndex >= maxSlides) newIndex = 0;
      showSlide(newIndex);
    });

    // Auto-advance slides every 5 seconds
    setInterval(() => {
      let newIndex = currentSlide + 1;
      if (newIndex >= maxSlides) newIndex = 0;
      showSlide(newIndex);
    }, 5000);
  }

  // Add smooth scrolling for links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId !== "#") {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Live chat button functionality
  const startChatBtn = document.querySelector(".start-chat-btn");

  if (startChatBtn) {
    startChatBtn.addEventListener("click", function () {
      // Scroll to chatbot section
      const chatbotSection = document.querySelector(".chatbot-section");
      if (chatbotSection) {
        chatbotSection.scrollIntoView({ behavior: "smooth" });

        // Focus on input after scrolling
        setTimeout(() => {
          if (userInput) userInput.focus();
        }, 1000);
      }
    });
  }

  // Back to Top Button Functionality
  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    // Show/hide the button based on scroll position
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });

    // Scroll to top when clicked
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Newsletter Form Submission
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const emailInput = document.getElementById("newsletter-email");
      const email = emailInput.value.trim();
      
      if (email && isValidEmail(email)) {
        // Simulate submission to a server
        showNotification("Thank you for subscribing to our newsletter!", "success");
        emailInput.value = "";
        
        // In a real application, you would send this data to your backend
        console.log("Newsletter subscription:", email);
      } else {
        showNotification("Please enter a valid email address.", "error");
      }
    });
  }
  
  // Helper Functions
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.right = "20px";
    notification.style.padding = "12px 20px";
    notification.style.borderRadius = "4px";
    notification.style.color = "white";
    notification.style.fontSize = "14px";
    notification.style.zIndex = "1000";
    notification.style.transform = "translateY(100px)";
    notification.style.opacity = "0";
    notification.style.transition = "all 0.3s ease";
    
    // Set color based on type
    if (type === "success") {
      notification.style.backgroundColor = "#4caf50";
    } else if (type === "error") {
      notification.style.backgroundColor = "#f44336";
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
      notification.style.transform = "translateY(0)";
      notification.style.opacity = "1";
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
      notification.style.transform = "translateY(100px)";
      notification.style.opacity = "0";
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 4000);
  }
});
