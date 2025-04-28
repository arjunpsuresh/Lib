import React, { useState } from 'react';
import './Chatbot.css'; // (we will create this next)

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const faq = {
    "what are library timings": "The library is open from 9 AM to 7 PM.",
    "where is the library located": "The library is located at XYZ Road, City Center.",
    "how to get a library membership": "You can register online through the Membership section or visit us directly.",
    "what is the contact number": "You can call us at +91-12345-67890.",
    "do you have digital books": "Yes, we offer a wide range of eBooks accessible to members."
  };

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    let response = "Sorry, I didn't understand that. Please ask something else!";
    for (const question in faq) {
      if (input.toLowerCase().includes(question)) {
        response = faq[question];
        break;
      }
    }

    const botMessage = { text: response, sender: 'bot' };
    setMessages(prev => [...prev, botMessage]);
    setInput('');
  };

  return (
    <>
      <button id="chatbot-toggle" onClick={() => setOpen(prev => !prev)}>
        Chat with us!
      </button>

      {open && (
        <div id="chatbot-container">
          <div id="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', marginBottom: '10px' }}>
                {msg.text}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex' }}>
            <input
              type="text"
              id="chatbot-input"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button id="chatbot-send" onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;