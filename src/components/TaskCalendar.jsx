import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import './TaskCalendar.css';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function TaskCalendar() {
  const { calendarTasks } = useContext(UserContext);

  const getTasksForDay = (day) => {
    return calendarTasks.filter(task => task.day.toLowerCase() === day.toLowerCase());
  };

  return (
    <div className="calendar-container">
      <h2>📅 Your Weekly Calendar</h2>
      <div className="calendar-grid">
        {daysOfWeek.map(day => (
          <div className="calendar-day" key={day}>
            <h3>{day}</h3>
            <div className="tasks">
              {getTasksForDay(day).length > 0 ? (
                getTasksForDay(day).map((task, idx) => (
                  <div className="task" key={idx}>
                    📌 {task.title} at {task.time}
                  </div>
                ))
              ) : (
                <p className="no-tasks">No tasks</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}