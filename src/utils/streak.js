/**
 * Multi-Feature Streak Tracking Utilities
 * Manages streaks for: notes, todos, habits, pomodoro
 */

const STREAK_FEATURES = {
  NOTES: 'notesStreak',
  TODOS: 'todosStreak',
  HABITS: 'habitsStreak',
  POMODORO: 'pomodoroStreak'
};

/**
 * Get current date in YYYY-MM-DD format
 */
function getTodayDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

/**
 * Get yesterday's date in YYYY-MM-DD format
 */
function getYesterdayDate() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
}

/**
 * Get streak data for a specific feature
 * @param {string} featureName - Name of the feature (e.g., 'notesStreak')
 * @returns {Object} Streak object with current count and lastActiveDate
 */
export function getStreak(featureName) {
  const streakData = localStorage.getItem(featureName);
  
  if (!streakData) {
    return {
      current: 0,
      lastActiveDate: null
    };
  }
  
  try {
    return JSON.parse(streakData);
  } catch (error) {
    console.error(`Error parsing streak data for ${featureName}:`, error);
    return {
      current: 0,
      lastActiveDate: null
    };
  }
}

/**
 * Update streak for a specific feature
 * Logic:
 * - If lastActiveDate == today: do nothing
 * - If lastActiveDate == yesterday: increment current
 * - If older or null: reset to 1
 * - Always update lastActiveDate to today
 * 
 * @param {string} featureName - Name of the feature (e.g., 'notesStreak')
 */
export function updateStreak(featureName) {
  const today = getTodayDate();
  const yesterday = getYesterdayDate();
  const streak = getStreak(featureName);
  
  // If already active today, don't update
  if (streak.lastActiveDate === today) {
    return streak;
  }
  
  let newCurrent;
  
  if (streak.lastActiveDate === yesterday) {
    // Continue the streak
    newCurrent = streak.current + 1;
  } else {
    // Start a new streak
    newCurrent = 1;
  }
  
  const updatedStreak = {
    current: newCurrent,
    lastActiveDate: today
  };
  
  localStorage.setItem(featureName, JSON.stringify(updatedStreak));
  
  // Dispatch custom event for streak updates
  window.dispatchEvent(new CustomEvent('streakUpdated', { 
    detail: { featureName, streak: updatedStreak } 
  }));
  
  return updatedStreak;
}

/**
 * Reset streak for a specific feature
 * @param {string} featureName - Name of the feature
 */
export function resetStreak(featureName) {
  const resetData = {
    current: 0,
    lastActiveDate: null
  };
  
  localStorage.setItem(featureName, JSON.stringify(resetData));
  
  // Dispatch custom event for streak updates
  window.dispatchEvent(new CustomEvent('streakUpdated', { 
    detail: { featureName, streak: resetData } 
  }));
  
  return resetData;
}

/**
 * Get all streaks for display on Streaks page
 * @returns {Array} Array of streak objects with feature info
 */
export function getAllStreaks() {
  const features = [
    { name: STREAK_FEATURES.NOTES, displayName: 'Notes', icon: '📝', color: '#4CAF50' },
    { name: STREAK_FEATURES.TODOS, displayName: 'Todos', icon: '✅', color: '#2196F3' },
    { name: STREAK_FEATURES.HABITS, displayName: 'Habits', icon: '🎯', color: '#FF9800' },
    { name: STREAK_FEATURES.POMODORO, displayName: 'Pomodoro', icon: '🍅', color: '#F44336' }
  ];
  
  return features.map(feature => ({
    ...feature,
    streak: getStreak(feature.name)
  }));
}

/**
 * Get 7-day streak history for a feature
 * Returns array of booleans indicating if streak was active each day
 * @param {string} featureName - Name of the feature
 * @returns {Array} Array of 7 booleans (true = active, false = inactive)
 */
export function getStreakHistory(featureName) {
  const streak = getStreak(featureName);
  const history = new Array(7).fill(false);
  
  if (!streak.lastActiveDate || streak.current === 0) {
    return history;
  }
  
  const today = new Date();
  const lastActive = new Date(streak.lastActiveDate);
  
  // Calculate how many days to fill based on current streak
  const daysToFill = Math.min(streak.current, 7);
  
  // Fill from the end (most recent days)
  for (let i = 0; i < daysToFill; i++) {
    history[6 - i] = true;
  }
  
  return history;
}

/**
 * Get motivational message based on streak count
 * @param {number} streakCount - Current streak count
 * @returns {string} Motivational message
 */
export function getStreakMessage(streakCount) {
  if (streakCount === 0) return "Start your streak today! 🚀";
  if (streakCount === 1) return "Great start! Keep it going! 💪";
  if (streakCount < 7) return `${streakCount} days strong! 🔥`;
  if (streakCount < 30) return `Amazing ${streakCount}-day streak! 🌟`;
  if (streakCount < 100) return `Incredible ${streakCount}-day streak! 🏆`;
  return `Legendary ${streakCount}-day streak! 👑`;
}

export { STREAK_FEATURES };
