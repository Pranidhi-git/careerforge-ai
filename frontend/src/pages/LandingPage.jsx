import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className="landing-page">

      {/* ================= NAVBAR ================= */}

      <nav className="nav">

        <div className="logo">
          🚀 CareerForge AI
        </div>

        <div className="nav-links">

          <a href="#features">
            Features
          </a>

          <a href="#about">
            About
          </a>

          <Link to="/login">
            Login
          </Link>

          <Link
            to="/signup"
            className="nav-button"
          >
            Get Started
          </Link>

        </div>

      </nav>


      {/* ================= HERO ================= */}

      <section className="hero">

        <div className="hero-content">

          <p className="hero-label">
            🚀 AI-POWERED CAREER PLATFORM
          </p>

          <h1>
            Build Your Career
            <br />
            <span>Smarter with AI</span>
          </h1>

          <p className="hero-description">
            CareerForge AI helps you analyze your resume,
            identify skill gaps, and discover job opportunities
            that match your career goals.
          </p>

          <div className="hero-buttons">

            <Link
              to="/signup"
              className="primary-button"
            >
              Get Started →
            </Link>

            <Link
              to="/login"
              className="secondary-button"
            >
              Login
            </Link>

          </div>

        </div>


        {/* HERO VISUAL */}

        <div className="hero-visual">

          <div className="hero-card">

            <div className="hero-card-icon">
              📄
            </div>

            <div>

              <h3>
                Resume Analysis
              </h3>

              <p>
                AI-powered insights
              </p>

            </div>

            <span className="hero-check">
              ✓
            </span>

          </div>


          <div className="hero-card">

            <div className="hero-card-icon">
              🎯
            </div>

            <div>

              <h3>
                Skill Gap
              </h3>

              <p>
                Know what to learn next
              </p>

            </div>

            <span className="hero-check">
              ✓
            </span>

          </div>


          <div className="hero-card">

            <div className="hero-card-icon">
              💼
            </div>

            <div>

              <h3>
                Job Matching
              </h3>

              <p>
                Find relevant opportunities
              </p>

            </div>

            <span className="hero-check">
              ✓
            </span>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section
        className="features"
        id="features"
      >

        <div className="section-heading">

          <p>
            POWERFUL CAREER TOOLS
          </p>

          <h2>
            Everything You Need to
            <br />
            <span>Move Forward</span>
          </h2>

          <p>
            One platform to help you understand your skills,
            improve your resume, and find your next opportunity.
          </p>

        </div>


        <div className="feature-container">


          {/* RESUME */}

          <div className="feature-card">

            <div className="feature-icon">
              📄
            </div>

            <h3>
              Resume AI
            </h3>

            <p>
              Upload your resume and get an instant score,
              detected skills, improvement suggestions,
              and career recommendations.
            </p>

          </div>


          {/* SKILLS */}

          <div className="feature-card">

            <div className="feature-icon">
              🎯
            </div>

            <h3>
              Skill Gap Analysis
            </h3>

            <p>
              Compare your current skills with the skills
              required for your target career and discover
              what you should learn next.
            </p>

          </div>


          {/* JOBS */}

          <div className="feature-card">

            <div className="feature-icon">
              💼
            </div>

            <h3>
              Job Recommendations
            </h3>

            <p>
              Discover job opportunities based on your
              skills and see how well your profile matches
              each position.
            </p>

          </div>

        </div>

      </section>


      {/* ================= ABOUT ================= */}

      <section
        className="about"
        id="about"
      >

        <div className="about-content">

          <p className="about-label">
            ABOUT CAREERFORGE AI
          </p>

          <h2>
            Your Career,
            <br />
            <span>Your Future.</span>
          </h2>

          <p>
            CareerForge AI is designed to make career
            preparation easier for students and freshers.
            Instead of using multiple platforms, you can
            analyze your resume, understand your skill gaps,
            and explore suitable job opportunities from one
            place.
          </p>

          <Link
            to="/signup"
            className="primary-button"
          >
            Start Your Journey →
          </Link>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div>

          <h3>
            🚀 CareerForge AI
          </h3>

          <p>
            Build your career smarter with AI.
          </p>

        </div>

        <p>
          © 2026 CareerForge AI. All rights reserved.
        </p>

      </footer>

    </div>
  )
}

export default LandingPage 