import React, { useState } from 'react';
import Chatbot from './Chatbot'; // your existing Chatbot component
import './ChatWidget.css';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="chat-widget">
      {open && <Chatbot />}
      <button className="chat-toggle" onClick={() => setOpen(!open)}>
        💬
      </button>
    </div>
  );
}