// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.querySelector(".send-btn");
  const chatInput = document.querySelector(".chat-input");
  const chatBox = document.querySelector(".chat-box");

  // Handle send click
  sendBtn.addEventListener("click", () => {
    const userText = chatInput.value.trim();

    if (userText !== "") {
      appendUserMessage(userText);
      chatInput.value = "";
      setTimeout(() => {
        generateAmaraResponse(userText);
      }, 600); // simulate Amara "thinking"
    }
  });

  // Allow pressing Enter to send
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendBtn.click();
    }
  });

  // Add user message
  function appendUserMessage(message) {
    const userMsg = document.createElement("div");
    userMsg.classList.add("user-msg");
    userMsg.textContent = message;
    chatBox.appendChild(userMsg);
    scrollChatToBottom();
  }

  // Generate a simple Amara response
  function generateAmaraResponse(userText) {
    const amaraMsg = document.createElement("div");
    amaraMsg.classList.add("amara-msg");

    // Sample responses (you can make this smarter later)
    const responses = [
      "That's really interesting. How does that make you feel?",
      "Tell me more about that.",
      "I'm here for you. You're doing great by sharing this.",
      "It’s okay to feel that way. Let’s work through it together.",
      "Would you like to try a breathing exercise or a mood tracker?"
    ];

    const response =
      responses[Math.floor(Math.random() * responses.length)];

    amaraMsg.textContent = response;
    chatBox.appendChild(amaraMsg);
    scrollChatToBottom();
  }

  // Auto-scroll chat
  function scrollChatToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});







