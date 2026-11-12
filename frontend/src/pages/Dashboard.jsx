import { Link, useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()

  // ================= USER =================

  const storedUser = localStorage.getItem('user')
  const user = storedUser ? JSON.parse(storedUser) : null


  // ================= RESUME DATA =================

  const storedResume = localStorage.getItem('resumeAnalysis')

  const resumeAnalysis = storedResume
    ? JSON.parse(storedResume)
    : null

  const resumesAnalyzed = resumeAnalysis ? 1 : 0

  const resumeSkills = resumeAnalysis?.skills || []

  const skillsIdentified = resumeSkills.length


  // ================= JOB DATA =================

  const jobs = [
    {
      title: 'Software Developer',
      skills: ['Java', 'Python', 'SQL', 'DSA'],
    },
    {
      title: 'Junior Software Engineer',
      skills: ['Java', 'Python', 'SQL', 'Git'],
    },
    {
      title: 'Frontend Developer',
      skills: ['HTML', 'CSS', 'JavaScript', 'React'],
    },
    {
      title: 'Python Developer',
      skills: ['Python', 'SQL', 'Git', 'REST API'],
    },
    {
      title: 'Graduate Engineer Trainee',
      skills: ['Java', 'Python', 'SQL', 'Problem Solving'],
    },
    {
      title: 'Junior Data Analyst',
      skills: ['Python', 'SQL', 'Excel', 'Power BI'],
    },
  ]


  // ================= MATCH JOBS =================

  const userSkills = resumeSkills.map((skill) =>
    skill.toLowerCase().trim()
  )

  const matchedJobs = jobs.filter((job) => {

    const matchingSkills = job.skills.filter((skill) =>
      userSkills.includes(skill.toLowerCase())
    )

    // A job is considered matched
    // when at least 2 skills match.
    return matchingSkills.length >= 2
  })

  const jobsMatched = matchedJobs.length


  // ================= LOGOUT =================

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }


  // ================= UI =================

  return (
    <div className="dashboard">

      {/* ================= SIDEBAR ================= */}

      <aside className="dashboard-sidebar">

        <h2>🚀 CareerForge AI</h2>

        <Link
          to="/dashboard"
          className="sidebar-item active"
        >
          🏠 Dashboard
        </Link>

        <Link
          to="/resume-ai"
          className="sidebar-item"
        >
          📄 Resume AI
        </Link>

        <Link
          to="/skill-gap"
          className="sidebar-item"
        >
          🎯 Skill Gap
        </Link>

        <Link
          to="/jobs"
          className="sidebar-item"
        >
          💼 Jobs
        </Link>

        <button
          onClick={handleLogout}
          className="sidebar-logout"
        >
          🚪 Logout
        </button>

      </aside>


      {/* ================= MAIN CONTENT ================= */}

      <main className="dashboard-main">

        {/* ================= HEADER ================= */}

        <div className="dashboard-header">

          <div>

            <p className="dashboard-label">
              YOUR CAREER DASHBOARD
            </p>

            <h1>
              Welcome back
              {user?.name ? `, ${user.name}` : ''}! 👋
            </h1>

            <p>
              Build your career smarter with AI-powered tools.
            </p>

          </div>

          <div className="profile-icon">
            👤
          </div>

        </div>


        {/* ================= STATISTICS ================= */}

        <div className="dashboard-stats">

          {/* RESUMES */}

          <div className="stat-card">

            <div className="stat-icon">
              📄
            </div>

            <div>

              <h2>
                {resumesAnalyzed}
              </h2>

              <p>
                Resumes Analyzed
              </p>

            </div>

          </div>


          {/* SKILLS */}

          <div className="stat-card">

            <div className="stat-icon">
              🎯
            </div>

            <div>

              <h2>
                {skillsIdentified}
              </h2>

              <p>
                Skills Identified
              </p>

            </div>

          </div>


          {/* JOBS */}

          <div className="stat-card">

            <div className="stat-icon">
              💼
            </div>

            <div>

              <h2>
                {jobsMatched}
              </h2>

              <p>
                Jobs Matched
              </p>

            </div>

          </div>

        </div>


        {/* ================= CAREER TOOLS ================= */}

        <section className="career-tools">

          <h2>
            Career Tools
          </h2>

          <p>
            Everything you need to prepare for your next opportunity.
          </p>


          <div className="dashboard-cards">


            {/* ================= RESUME AI ================= */}

            <div className="dashboard-card">

              <div className="card-icon">
                📄
              </div>

              <span>
                RESUME
              </span>

              <h2>
                Resume AI
              </h2>

              <p>
                Analyze your resume and get AI-powered
                suggestions to make it stronger and more
                professional.
              </p>

              <Link to="/resume-ai">

                <button>
                  Analyze Resume →
                </button>

              </Link>

            </div>


            {/* ================= SKILL GAP ================= */}

            <div className="dashboard-card">

              <div className="card-icon">
                🎯
              </div>

              <span>
                SKILLS
              </span>

              <h2>
                Skill Gap Analysis
              </h2>

              <p>
                Discover which skills you need to develop
                for your target career and improve your chances.
              </p>

              <Link to="/skill-gap">

                <button>
                  Check Skill Gap →
                </button>

              </Link>

            </div>


            {/* ================= JOBS ================= */}

            <div className="dashboard-card">

              <div className="card-icon">
                💼
              </div>

              <span>
                CAREER
              </span>

              <h2>
                Job Recommendations
              </h2>

              <p>
                Find relevant job opportunities based on
                your skills, interests, and career goals.
              </p>

              <Link to="/jobs">

                <button>
                  Find Jobs →
                </button>

              </Link>

            </div>

          </div>

        </section>


        {/* ================= CAREER TIP ================= */}

        <div className="career-tip">

          <span>
            💡
          </span>

          <div>

            <h3>
              Build your career step by step
            </h3>

            <p>
              Start by analyzing your resume, then identify
              your skill gaps and explore matching job opportunities.
            </p>

          </div>

        </div>

      </main>

    </div>
  )
}

export default Dashboard 