import { useState } from 'react'
import { Link } from 'react-router-dom'

function SkillGap() {

  // ================= RESUME SKILLS =================

  const storedResume = localStorage.getItem('resumeAnalysis')

  const resumeAnalysis = storedResume
    ? JSON.parse(storedResume)
    : null

  const detectedSkills = resumeAnalysis?.skills || []

  const initialSkills = detectedSkills.join(', ')


  // ================= STATES =================

  const [career, setCareer] = useState('')
  const [skills, setSkills] = useState(initialSkills)
  const [result, setResult] = useState(null)


  // ================= ANALYZE =================

  const analyzeSkills = () => {

    if (!career || !skills) {
      alert('Please enter your target career and current skills.')
      return
    }

    const currentSkills = skills
      .split(',')
      .map((skill) => skill.trim().toLowerCase())
      .filter((skill) => skill !== '')


    // ================= REQUIRED SKILLS =================

    const requiredSkills = {

      'software developer': [
        'python',
        'java',
        'c++',
        'sql',
        'dsa',
        'git',
      ],

      'data scientist': [
        'python',
        'sql',
        'machine learning',
        'statistics',
        'pandas',
        'numpy',
      ],

      'web developer': [
        'html',
        'css',
        'javascript',
        'react',
        'node.js',
        'git',
      ],

      'machine learning engineer': [
        'python',
        'machine learning',
        'statistics',
        'numpy',
        'pandas',
        'tensorflow',
      ],
    }


    const required =
      requiredSkills[career.toLowerCase()] || [
        'python',
        'sql',
        'communication',
        'problem solving',
        'git',
      ]


    // ================= MATCHED SKILLS =================

    const missing = required.filter(
      (skill) => !currentSkills.includes(skill)
    )

    const matched = required.filter(
      (skill) => currentSkills.includes(skill)
    )


    // ================= SCORE =================

    const score = Math.round(
      (matched.length / required.length) * 100
    )


    setResult({
      required,
      matched,
      missing,
      score,
    })
  }


  // ================= UI =================

  return (
    <div className="skill-gap-page">

      {/* BACK */}

      <Link
        to="/dashboard"
        className="back-link"
      >
        ← Back to Dashboard
      </Link>


      {/* HEADER */}

      <div className="skill-gap-header">

        <h1>
          🎯 Skill Gap Analysis
        </h1>

        <p>
          Find out which skills you need to develop for your target career.
        </p>

      </div>


      {/* MAIN CONTENT */}

      <div className="skill-gap-container">


        {/* ANALYSIS CARD */}

        <div className="skill-gap-card">

          <h2>
            Analyze Your Skills
          </h2>

          <p>
            Your skills detected from Resume AI are automatically loaded below.
          </p>


          {/* CAREER */}

          <label>
            Target Career
          </label>

          <input
            type="text"
            placeholder="Example: Software Developer"
            value={career}
            onChange={(e) => {
              setCareer(e.target.value)
              setResult(null)
            }}
          />


          {/* SKILLS */}

          <label>
            Your Current Skills
          </label>

          <textarea
            placeholder="Example: Python, SQL, Java"
            value={skills}
            onChange={(e) => {
              setSkills(e.target.value)
              setResult(null)
            }}
          />


          {/* RESUME MESSAGE */}

          {detectedSkills.length > 0 && (

            <p
              style={{
                marginTop: '8px',
                fontSize: '14px',
                opacity: 0.8,
              }}
            >
              ✅ {detectedSkills.length} skills loaded from your resume
            </p>

          )}


          {/* ANALYZE BUTTON */}

          <button onClick={analyzeSkills}>
            🎯 Analyze Skill Gap
          </button>

        </div>


        {/* INFO CARD */}

        <div className="skill-gap-info">

          <h2>
            What you'll get
          </h2>


          <div className="skill-info-item">

            <span>
              📊
            </span>

            <div>

              <h3>
                Skill Match Score
              </h3>

              <p>
                See how well your current skills match your target career.
              </p>

            </div>

          </div>


          <div className="skill-info-item">

            <span>
              ✅
            </span>

            <div>

              <h3>
                Matched Skills
              </h3>

              <p>
                Identify the skills you already have.
              </p>

            </div>

          </div>


          <div className="skill-info-item">

            <span>
              📚
            </span>

            <div>

              <h3>
                Missing Skills
              </h3>

              <p>
                Discover what you should learn next.
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* ================= RESULTS ================= */}

      {result && (

        <div className="skill-result">

          <h2>
            📊 Your Skill Gap Analysis
          </h2>


          {/* SCORE */}

          <div className="score">
            {result.score}%
          </div>


          <p>
            Skill match for <strong>{career}</strong>
          </p>


          {/* MATCHED SKILLS */}

          <div className="result-section">

            <h3>
              ✅ Skills You Have
            </h3>


            {result.matched.length > 0 ? (

              <div className="skill-list">

                {result.matched.map((skill) => (

                  <span
                    key={skill}
                    className="skill-tag matched"
                  >
                    {skill}
                  </span>

                ))}

              </div>

            ) : (

              <p>
                No matching skills found.
              </p>

            )}

          </div>


          {/* MISSING SKILLS */}

          <div className="result-section">

            <h3>
              📚 Skills You Need
            </h3>


            {result.missing.length > 0 ? (

              <div className="skill-list">

                {result.missing.map((skill) => (

                  <span
                    key={skill}
                    className="skill-tag missing"
                  >
                    {skill}
                  </span>

                ))}

              </div>

            ) : (

              <p>
                🎉 You have all the required skills!
              </p>

            )}

          </div>

        </div>

      )}

    </div>
  )
}

export default SkillGap 