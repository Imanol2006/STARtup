import React, { useState, useRef, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import './Chatbot.css';

export default function Chatbot() {
  const { user, updateLessonPlan, updateCalendar } = useContext(UserContext);
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hi! How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const chatboxRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input.trim();
    const newMessages = [...messages, { type: 'user', text: userText }];
    setMessages(newMessages);
    setInput('');

    const prompt = `
You are STAR, an AI assistant for college students. Based on what the student says, you may do 3 things:

1. If it's academic help like "I need help with math", generate a specific study plan.
   Respond with: [LESSONPLAN]: Write the lesson plan here.

2. If it's a calendar event like "I have a meeting on Wednesday at 12", parse the time and day.
   Respond with: [TASK]: Add { "title": "Meeting", "day": "Wednesday", "time": "12pm" }

3. Otherwise, respond as a friendly chatbot.

Student context:
- Name: ${user.username}
- Major: ${user.major}
- Learning Style: ${user.learningStyle}
- Study Hours: ${user.studyHours}
- Interests: ${user.interests}

Student said: "${userText}"
`;

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7
        }),
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "🤖 Something went wrong.";

      // Handle special responses
      if (reply.startsWith("[LESSONPLAN]:")) {
        const lesson = reply.replace("[LESSONPLAN]:", "").trim();
        updateLessonPlan(lesson);
        setMessages(prev => [...prev, { type: 'bot', text: "✅ Lesson plan updated!" }]);
      } else if (reply.startsWith("[TASK]:")) {
        const jsonMatch = reply.match(/{.*}/);
        if (jsonMatch) {
          const taskObj = JSON.parse(jsonMatch[0]);
          updateCalendar(taskObj);
          setMessages(prev => [...prev, { type: 'bot', text: `✅ Task added to calendar: ${taskObj.title} on ${taskObj.day} at ${taskObj.time}` }]);
        } else {
          setMessages(prev => [...prev, { type: 'bot', text: reply }]);
        }
      } else {
        setMessages(prev => [...prev, { type: 'bot', text: reply }]);
      }

      // Scroll down
      setTimeout(() => {
        chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
      }, 100);

    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { type: 'bot', text: "❌ Error connecting to AI." }]);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">STAR Chat</div>

      <div className="chatbox" ref={chatboxRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>➤</button>
      </div>
    </div>
  );
}