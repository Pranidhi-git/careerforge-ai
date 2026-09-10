function App() {
  return (
    <div>
      <nav>
        <h2>CareerForge AI</h2>

        <div>
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">About</a>
          <button>Get Started</button>
        </div>
      </nav>

      <section className="hero">
        <h1>Build Your Career With AI</h1>

        <p>
          Your intelligent career companion for resumes, skills, and jobs.
        </p>

        <button>Get Started</button>
      </section>

      <section className="features">
        <h2>What We Can Do</h2>

        <div className="feature-container">
          <div className="feature-card">
            <h3>Resume AI</h3>
            <p>
              Analyze your resume and get personalized suggestions to improve it.
            </p>
          </div>

          <div className="feature-card">
            <h3>Skill Gap Analysis</h3>
            <p>
              Discover the skills you need to develop for your dream career.
            </p>
          </div>

          <div className="feature-card">
            <h3>Job Recommendations</h3>
            <p>
              Find job opportunities that match your skills and career goals.
            </p>
          </div>
        </div>
      </section>
      <section className="about">
  <h2>About CareerForge AI</h2>

  <p>
    CareerForge AI helps students and job seekers build better careers
    using artificial intelligence. From resume improvement to skill-gap
    analysis and job recommendations, CareerForge AI brings everything
    together in one place.
  </p>
</section>
         <footer>
        <p>© 2026 CareerForge AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
export default App;