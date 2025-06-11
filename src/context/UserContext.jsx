import { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    username: '',
    major: '',
    learningStyle: '',
    studyHours: 0,
    interests: ''
  });

  const [lessonPlans, setLessonPlans] = useState(() => {
    const saved = localStorage.getItem("lessonPlans");
    return saved ? JSON.parse(saved) : [];
  });

  const [calendarTasks, setCalendarTasks] = useState(() => {
    const saved = localStorage.getItem("calendarTasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [opportunities, setOpportunities] = useState([]);

  const updateLessonPlan = (newPlan) => {
    const updated = [...lessonPlans, newPlan];
    setLessonPlans(updated);
    localStorage.setItem("lessonPlans", JSON.stringify(updated));
  };

  const updateCalendar = (task) => {
    const updated = [...calendarTasks, task];
    setCalendarTasks(updated);
    localStorage.setItem("calendarTasks", JSON.stringify(updated));
  };

  return (
    <UserContext.Provider value={{
      user, setUser,
      lessonPlans, updateLessonPlan,
      calendarTasks, updateCalendar,
      opportunities, setOpportunities
    }}>
      {children}
    </UserContext.Provider>
  );
}