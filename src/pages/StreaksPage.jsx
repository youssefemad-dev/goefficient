import React, { useState, useEffect } from 'react';
import { getAllStreaks, resetStreak, getStreakHistory, getStreakMessage } from '../utils/streak';

export default function StreaksPage() {
  const [streaks, setStreaks] = useState([]);

  const loadStreaks = () => {
    setStreaks(getAllStreaks());
  };

  useEffect(() => {
    loadStreaks();

    // Listen for streak updates from other pages
    const handleStreakUpdate = () => {
      loadStreaks();
    };

    window.addEventListener('streakUpdated', handleStreakUpdate);
    
    return () => {
      window.removeEventListener('streakUpdated', handleStreakUpdate);
    };
  }, []);

  const handleReset = (featureName, displayName) => {
    if (window.confirm(`Are you sure you want to reset your ${displayName} streak?`)) {
      resetStreak(featureName);
      loadStreaks();
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Never';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const renderStreakHistory = (featureName) => {
    const history = getStreakHistory(featureName);
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    
    return (
      <div className="d-flex justify-content-between align-items-center mt-3" style={{ gap: '2px' }}>
        {history.map((active, index) => (
          <div 
            key={index}
            className="text-center"
            style={{ flex: '1 1 0' }}
          >
            <div 
              className={`rounded-circle d-flex align-items-center justify-content-center ${
                active ? 'bg-success' : 'bg-light'
              }`}
              style={{ 
                width: '24px', 
                height: '24px',
                margin: '0 auto',
                fontSize: '0.7rem'
              }}
            >
              {active && <span className="text-white fw-bold">✓</span>}
            </div>
            <small className="text-muted d-block mt-1" style={{ fontSize: '0.65rem' }}>
              {days[index]}
            </small>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="display-4 fw-bold mb-2">
            <span className="me-2">🔥</span>
            Your Streaks
          </h1>
          <p className="text-muted lead">
            Keep the momentum going! Track your daily progress across all features.
          </p>
        </div>
      </div>

      <div className="row g-4">
        {streaks.map(({ name, displayName, icon, color, streak }) => (
          <div key={name} className="col-12 col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm border-0" style={{ borderLeft: `4px solid ${color}` }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h2 className="mb-0" style={{ fontSize: '2.5rem' }}>{icon}</h2>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleReset(name, displayName)}
                    title="Reset streak"
                  >
                    <i className="bi bi-arrow-counterclockwise"></i>
                  </button>
                </div>

                <h5 className="card-title fw-bold mb-1">{displayName}</h5>
                
                <div className="mb-3">
                  <div className="d-flex align-items-baseline">
                    <h2 className="display-3 fw-bold mb-0 me-2" style={{ color }}>
                      {streak.current}
                    </h2>
                    <span className="text-muted">day{streak.current !== 1 ? 's' : ''}</span>
                  </div>
                </div>

                <p className="text-muted small mb-2">
                  <strong>Last active:</strong> {formatDate(streak.lastActiveDate)}
                </p>

                <div className="alert alert-light mb-3 py-2 px-3" style={{ fontSize: '0.85rem' }}>
                  {getStreakMessage(streak.current)}
                </div>

                {/* 7-day history */}
                <div>
                  <p className="text-muted small mb-2 fw-semibold">Last 7 Days</p>
                  {renderStreakHistory(name)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card border-0 shadow-sm bg-light">
            <div className="card-body p-4">
              <h4 className="mb-3 fw-bold">📊 Overall Progress</h4>
              <div className="row text-center">
                <div className="col-6 col-md-3 mb-3">
                  <div className="display-6 fw-bold text-primary">
                    {streaks.reduce((sum, s) => sum + s.streak.current, 0)}
                  </div>
                  <small className="text-muted">Total Days</small>
                </div>
                <div className="col-6 col-md-3 mb-3">
                  <div className="display-6 fw-bold text-success">
                    {streaks.filter(s => s.streak.current > 0).length}
                  </div>
                  <small className="text-muted">Active Streaks</small>
                </div>
                <div className="col-6 col-md-3 mb-3">
                  <div className="display-6 fw-bold text-warning">
                    {Math.max(...streaks.map(s => s.streak.current), 0)}
                  </div>
                  <small className="text-muted">Longest Streak</small>
                </div>
                <div className="col-6 col-md-3 mb-3">
                  <div className="display-6 fw-bold text-info">
                    {streaks.filter(s => s.streak.current >= 7).length}
                  </div>
                  <small className="text-muted">Week+ Streaks</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="alert alert-info border-0">
            <h6 className="alert-heading fw-bold">💡 Streak Tips</h6>
            <ul className="mb-0 small">
              <li><strong>Notes:</strong> Create or edit a note to continue your streak</li>
              <li><strong>Todos:</strong> Complete a todo to keep the streak alive</li>
              <li><strong>Habits:</strong> Mark a habit as complete each day</li>
              <li><strong>Pomodoro:</strong> Finish a pomodoro session to maintain your focus streak</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
