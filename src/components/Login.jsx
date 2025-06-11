import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Login.css';

export default function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    username: '',
    major: '',
    learningStyle: 'visual',
    studyHours: 10,
    interests: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setForm(prev => ({
        ...prev,
        interests: checked
          ? [...prev.interests, value]
          : prev.interests.filter(i => i !== value)
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setUser({
      ...form,
      interests: form.interests.join(', ')
    });

    const from = location.state?.from || '/lesson'; // fallback if no origin
    navigate(from);
  };

  return (
    <div className="login-container">
      <h1>🎓 Let's Get You Started</h1>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <label>Major</label>
        <input
          type="text"
          name="major"
          value={form.major}
          onChange={handleChange}
          required
        />

        <label>Learning Style</label>
        <select name="learningStyle" value={form.learningStyle} onChange={handleChange}>
          <option value="visual">Visual</option>
          <option value="reading">Reading/Writing</option>
          <option value="kinesthetic">Kinesthetic</option>
        </select>

        <label>Study Hours Per Week</label>
        <input
          type="number"
          name="studyHours"
          value={form.studyHours}
          onChange={handleChange}
        />

        <label>What are you looking for?</label>
        <div className="checkbox-group">
          {['Internships', 'Jobs', 'Events', 'Research'].map(option => (
            <label key={option}>
              <input
                type="checkbox"
                value={option}
                checked={form.interests.includes(option)}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>

        <button type="submit">Continue ➤</button>
      </form>
    </div>
  );
}