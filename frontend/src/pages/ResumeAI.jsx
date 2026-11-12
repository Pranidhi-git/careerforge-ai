import { useState } from 'react'
import { Link } from 'react-router-dom'

function ResumeAI() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]

    if (!selectedFile) {
      return
    }

    setFile(selectedFile)
    setResult(null)
    setError('')
  }

  const handleAnalyze = async () => {
    if (!file) {
      alert('Please select your resume first.')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const formData = new FormData()

      formData.append('resume', file)

      const response = await fetch(
        'https://careerforge-ai-2w0t.onrender.com/api/resume/analyze',
        {
          method: 'POST',
          body: formData,
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Resume analysis failed.')
      }

      setResult(data)

      // Save resume analysis for Dashboard
      localStorage.setItem(
        'resumeAnalysis',
        JSON.stringify(data)
      )

    } catch (error) {
      console.error('RESUME ANALYSIS ERROR:', error)

      setError(error.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="resume-page">

      {/* HEADER */}

      <div className="resume-header">

        <Link to="/dashboard" className="back-link">
          ← Back to Dashboard
        </Link>

        <h1>📄 Resume AI</h1>

        <p>
          Improve your resume with AI-powered analysis and suggestions.
        </p>

      </div>


      {/* MAIN CONTENT */}

      <div className="resume-container">

        {/* UPLOAD CARD */}

        <div className="resume-upload-card">

          <div className="resume-icon">
            📄
          </div>

          <h2>Analyze Your Resume</h2>

          <p>
            Upload your resume and get personalized suggestions to
            improve your skills, experience, and overall presentation.
          </p>

          <label className="upload-box">

            <span className="upload-icon">
              📤
            </span>

            {file ? (
              <>
                <strong>{file.name}</strong>
                <small>File selected successfully</small>
              </>
            ) : (
              <>
                <strong>Upload Resume</strong>
                <small>PDF or DOCX files</small>
              </>
            )}

            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
            />

          </label>

          <button
            className="analyze-button"
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading
              ? '⏳ Analyzing Resume...'
              : '✨ Analyze Resume'}
          </button>

        </div>


        {/* WHAT YOU GET */}

        <div className="resume-info-card">

          <h2>What you'll get</h2>

          <div className="info-item">
            <span>🎯</span>

            <div>
              <h3>Resume Score</h3>
              <p>Get an overall score for your resume.</p>
            </div>
          </div>

          <div className="info-item">
            <span>💡</span>

            <div>
              <h3>Improvement Suggestions</h3>
              <p>
                Discover areas where your resume can be improved.
              </p>
            </div>
          </div>

          <div className="info-item">
            <span>🔍</span>

            <div>
              <h3>Skill Analysis</h3>
              <p>
                Identify important skills mentioned in your resume.
              </p>
            </div>
          </div>

          <div className="info-item">
            <span>💼</span>

            <div>
              <h3>Career Suggestions</h3>
              <p>
                Understand how your resume fits your career goals.
              </p>
            </div>
          </div>

        </div>

      </div>


      {/* ERROR */}

      {error && (
        <div className="resume-error">
          ❌ {error}
        </div>
      )}


      {/* RESULTS */}

      {result && (

        <div className="analysis-results">

          <h2>✅ Resume Analysis Complete</h2>

          <p className="result-file">
            <strong>File:</strong> {result.fileName}
          </p>


          {/* SCORE */}

          <div className="score-card">

            <h3>Resume Score</h3>

            <div className="score">
              {result.resumeScore}
              <span>/100</span>
            </div>

            <p>
              Your resume has been analyzed based on its
              content and structure.
            </p>

          </div>


          {/* SKILLS */}

          <div className="result-card">

            <h3>💻 Skills Detected</h3>

            {result.skills && result.skills.length > 0 ? (

              <div className="skills-list">

                {result.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}

              </div>

            ) : (

              <p>No technical skills detected.</p>

            )}

          </div>


          {/* SUGGESTIONS */}

          <div className="result-card">

            <h3>💡 Improvement Suggestions</h3>

            <ul>

              {result.suggestions?.map((suggestion, index) => (
                <li key={index}>
                  {suggestion}
                </li>
              ))}

            </ul>

          </div>


          {/* CAREER */}

          <div className="result-card">

            <h3>💼 Career Suggestions</h3>

            <div className="career-list">

              {result.careerSuggestions?.map(
                (career, index) => (
                  <div
                    key={index}
                    className="career-item"
                  >
                    🚀 {career}
                  </div>
                )
              )}

            </div>

          </div>


          {/* EXTRACTED TEXT */}

          <div className="result-card">

            <h3>📄 Extracted Resume Content</h3>

            <div className="resume-text">
              {result.resumeText}
            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default ResumeAI 