import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import './LessonPlan.css';

export default function LessonPlan() {
  const { lessonPlans } = useContext(UserContext);

  return (
    <div className="lesson-page">
      <h1 className="lesson-title">📘 Your Lesson Plan</h1>
      {lessonPlans.length === 0 ? (
        <p>No plans yet. Try asking the chatbot to help you study!</p>
      ) : (
        <div className="lesson-grid">
          {lessonPlans.map((plan, idx) => (
            <div key={idx} className="lesson-card">
              <p>{plan}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}