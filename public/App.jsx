import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Chatbot from './components/Chatbot';
import LessonPlan from './components/LessonPlan';
import TaskCalendar from './components/TaskCalendar';
import Opportunities from './components/Opportunities';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/lesson" element={<LessonPlan />} />
        <Route path="/tasks" element={<TaskCalendar />} />
        <Route path="/opportunities" element={<Opportunities />} />
      </Routes>
    </Router>
  );
}