import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import './Opportunities.css';

export default function Opportunities() {
  const { user, opportunities, setOpportunities } = useContext(UserContext);
  const [suggested, setSuggested] = useState([]);

  useEffect(() => {
    // If no opportunities yet, generate mock ones based on interests
    if (opportunities.length === 0) {
      const base = [];

      if (user.interests.includes('Internships'))
        base.push("🔬 AI Research Internship – CS Department");

      if (user.interests.includes('Jobs'))
        base.push("💼 Student Tech Assistant – Campus IT Center");

      if (user.interests.includes('Events'))
        base.push("🎤 Resume Workshop – Career Center (May 12)");

      if (user.interests.includes('Research'))
        base.push("📊 Data Assistant for Faculty Research Project");

      setOpportunities(base);
      setSuggested(base);
    } else {
      setSuggested(opportunities);
    }
  }, [user, opportunities, setOpportunities]);

  return (
    <div className="opportunities-container">
      <h1>🌐 Matched Opportunities</h1>
      {suggested.length > 0 ? (
        <div className="opportunity-list">
          {suggested.map((op, i) => (
            <div key={i} className="op-card">
              {op}
            </div>
          ))}
        </div>
      ) : (
        <p>No opportunities found yet.</p>
      )}
    </div>
  );
}
