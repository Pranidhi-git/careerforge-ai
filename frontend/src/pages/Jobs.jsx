
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Jobs() {
  const [search, setSearch] = useState('')

  // ================= JOB DATA =================

  const jobs = [
    {
      title: 'Software Developer',
      company: 'TCS',
      location: 'Pune, India',
      experience: 'Fresher / 0-2 Years',
      skills: ['Java', 'Python', 'SQL', 'DSA'],
      applyUrl: 'https://www.tcs.com/careers/india',
    },
    {
      title: 'Junior Software Engineer',
      company: 'Infosys',
      location: 'Pune, India',
      experience: 'Fresher',
      skills: ['Java', 'Python', 'SQL', 'Git'],
      applyUrl: 'https://www.infosys.com/careers/apply/',
    },
    {
      title: 'Frontend Developer',
      company: 'Accenture',
      location: 'Mumbai, India',
      experience: '0-2 Years',
      skills: ['HTML', 'CSS', 'JavaScript', 'React'],
      applyUrl: 'https://www.accenture.com/in-en/careers',
    },
    {
      title: 'Python Developer',
      company: 'Persistent Systems',
      location: 'Pune, India',
      experience: '0-2 Years',
      skills: ['Python', 'SQL', 'Git', 'REST API'],
      applyUrl: 'https://careers.persistent.com/jobslist',
    },
    {
      title: 'Graduate Engineer Trainee',
      company: 'Wipro',
      location: 'Bangalore, India',
      experience: 'Fresher',
      skills: ['Java', 'Python', 'SQL', 'Problem Solving'],
      applyUrl: 'https://careers.wipro.com/',
    },
    {
      title: 'Junior Data Analyst',
      company: 'Deloitte',
      location: 'Hyderabad, India',
      experience: 'Fresher / 0-1 Year',
      skills: ['Python', 'SQL', 'Excel', 'Power BI'],
      applyUrl: 'https://southasiacareers.deloitte.com/go/Deloitte-India/718244/',
    },
  ]

  // ================= RESUME SKILLS =================

  const storedResume = localStorage.getItem('resumeAnalysis')

  const resumeAnalysis = storedResume
    ? JSON.parse(storedResume)
    : null

  const resumeSkills = resumeAnalysis?.skills || []

  const userSkills = resumeSkills.map((skill) =>
    skill.toLowerCase().trim()
  )

  // ================= CALCULATE JOB MATCH =================

  const jobsWithMatch = jobs.map((job) => {
    const matchingSkills = job.skills.filter((skill) =>
      userSkills.includes(skill.toLowerCase().trim())
    )

    const missingSkills = job.skills.filter(
      (skill) =>
        !userSkills.includes(skill.toLowerCase().trim())
    )

    const matchPercentage = Math.round(
      (matchingSkills.length / job.skills.length) * 100
    )

    return {
      ...job,
      matchingSkills,
      missingSkills,
      matchPercentage,
    }
  })

  // ================= SORT BEST MATCHES FIRST =================

  const sortedJobs = [...jobsWithMatch].sort(
    (a, b) => b.matchPercentage - a.matchPercentage
  )

  // ================= SEARCH =================

  const filteredJobs = sortedJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(search.toLowerCase())
      )
  )

  // ================= JOBS MATCHED =================

  const jobsMatched = jobsWithMatch.filter(
    (job) => job.matchingSkills.length >= 2
  ).length

  // ================= APPLY FUNCTION =================

  const handleApply = (job) => {
    window.open(job.applyUrl, '_blank', 'noopener,noreferrer')
  }

  // ================= UI =================

  return (
    <div className="jobs-page">

      <Link to="/dashboard" className="back-link">
        ← Back to Dashboard
      </Link>

      <div className="jobs-header">
        <h1>💼 Job Recommendations</h1>
        <p>
          Find opportunities that match your skills and career goals.
        </p>
      </div>

      <div className="job-search">
        <input
          type="text"
          placeholder="Search jobs, companies, or skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="jobs-count">
        <p>
          Showing <strong>{filteredJobs.length}</strong> job opportunities
        </p>

        <p>
          ⭐ <strong>{jobsMatched}</strong> jobs match your skills
        </p>
      </div>

      <div className="jobs-container">

        {filteredJobs.length > 0 ? (

          filteredJobs.map((job, index) => (

            <div className="job-card" key={index}>

              <div className="job-icon">
                💼
              </div>

              <div className="job-content">

                <h2>{job.title}</h2>

                <h3>{job.company}</h3>

                <div
                  style={{
                    display: 'inline-block',
                    margin: '8px 0',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    background:
                      job.matchPercentage >= 75
                        ? 'rgba(34, 197, 94, 0.15)'
                        : job.matchPercentage >= 50
                        ? 'rgba(234, 179, 8, 0.15)'
                        : 'rgba(239, 68, 68, 0.15)',
                    color:
                      job.matchPercentage >= 75
                        ? '#22c55e'
                        : job.matchPercentage >= 50
                        ? '#eab308'
                        : '#ef4444',
                    fontWeight: '600',
                  }}
                >
                  ⭐ {job.matchPercentage}% Match
                </div>

                <p className="job-location">
                  📍 {job.location}
                </p>

                <p className="job-experience">
                  👨‍💻 {job.experience}
                </p>

                {job.matchingSkills.length > 0 && (
                  <div style={{ marginTop: '10px' }}>
                    <strong>✅ Your Matching Skills</strong>

                    <div className="job-skills">
                      {job.matchingSkills.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>
                  </div>
                )}

                {job.missingSkills.length > 0 && (
                  <div style={{ marginTop: '8px' }}>
                    <strong>📚 Skills to Learn</strong>

                    <div className="job-skills">
                      {job.missingSkills.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  className="apply-button"
                  onClick={() => handleApply(job)}
                >
                  Apply Now →
                </button>

              </div>
            </div>

          ))

        ) : (

          <div className="no-jobs">
            <h2>😕 No jobs found</h2>
            <p>Try searching for another job title or skill.</p>
          </div>

        )}

      </div>
    </div>
  )
}

export default Jobs
