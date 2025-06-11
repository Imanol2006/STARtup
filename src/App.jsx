import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import ChatWidget from './components/ChatWidget';

import LandingPage from './components/LandingPage';
import Login from './components/Login';
import LessonPlan from './components/LessonPlan';
import TaskCalendar from './components/TaskCalendar';
import Opportunities from './components/Opportunities';

export default function App() {
  return (
    <>
      {/* Always shown */}
      <Navbar />
      <ChatWidget />

      {/* Main routes */}
      <div style={{ paddingTop: '60px' }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/lesson" element={<LessonPlan />} />
          <Route path="/tasks" element={<TaskCalendar />} />
          <Route path="/opportunities" element={<Opportunities />} />
        </Routes>
      </div>
    </>
  );
}