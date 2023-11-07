import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const HRChat = () => {
  const { candidateId } = useParams(); // Extract candidateId from the URL
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    try {
      await axios.post(`http://localhost:8080/api/chat/${candidateId}`, {
        text: message,
        role: 'hr'
      });
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default HRChat;
