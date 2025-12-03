import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/home.css";

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to GoEfficient</h1>
          <p className="tagline">
            Your all-in-one productivity platform to build habits, manage tasks, and achieve your goals
          </p>
          <div className="hero-buttons">
            {isAuthenticated ? (
              <>
                <Link to="/habits" className="hero-btn hero-btn-primary">
                  Go to Habit tracker
                </Link>
                <Link to="/timer" className="hero-btn hero-btn-secondary">
                  Start Pomodoro
                </Link>
              </>
            ) : (
              <>
                <Link to="/register" className="hero-btn hero-btn-primary">
                  Get Started Free
                </Link>
                <Link to="/login" className="hero-btn hero-btn-secondary">
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-header">
          <h2>Everything You Need to Stay Productive</h2>
          <p>
            Powerful tools designed to help you focus, organize, and accomplish more every day
          </p>
        </div>

        <div className="features-grid">
          <Link to={isAuthenticated ? "/habits" : "/register"} className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Habit Tracker</h3>
            <p>
              Build lasting habits with our intuitive tracking system. Monitor your progress and stay consistent.
            </p>
          </Link>

          <Link to={isAuthenticated ? "/timer" : "/register"} className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3>Pomodoro Timer</h3>
            <p>
              Boost your focus with the proven Pomodoro technique. Work in focused intervals with built-in breaks.
            </p>
          </Link>

          <Link to={isAuthenticated ? "/todo" : "/register"} className="feature-card">
            <div className="feature-icon">✓</div>
            <h3>Todo Lists</h3>
            <p>
              Organize your tasks efficiently. Create, prioritize, and check off your daily to-dos with ease.
            </p>
          </Link>

          <Link to={isAuthenticated ? "/notes" : "/register"} className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Smart Notes</h3>
            <p>
              Capture ideas and important information. Keep all your notes organized and accessible.
            </p>
          </Link>

          <Link to={isAuthenticated ? "/streaks" : "/register"} className="feature-card">
            <div className="feature-icon">🔥</div>
            <h3>Streak Tracking</h3>
            <p>
              Stay motivated with streak tracking. Visualize your consistency and celebrate milestones.
            </p>
          </Link>

          <div className="feature-card" style={{ cursor: 'default' }}>
            <div className="feature-icon">🎵</div>
            <h3>Focus Music</h3>
            <p>
              Enhance concentration with curated focus music. Create the perfect environment for productivity.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Transform Your Productivity?</h2>
            <p>
              Join thousands of users who are achieving more with GoEfficient. Start your journey today—it's free!
            </p>
            <Link to="/register" className="cta-btn">
              Create Your Free Account
            </Link>
          </div>
        </section>
      )}

      {isAuthenticated && (
        <section className="cta-section">
          <div className="cta-content">
            <h2>Welcome back, {user?.name}! 👋</h2>
            <p>
              Ready to continue your productivity journey? Jump back into your workspace.
            </p>
            <Link to="/habits" className="cta-btn">
              Go to Habit Tracker
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
