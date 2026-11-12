const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const multer = require('multer')
const mammoth = require('mammoth')
const pdfParse = require('pdf-parse')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const User = require('./models/User')

dotenv.config()

const app = express()

// ==================== MIDDLEWARE ====================

app.use(cors())
app.use(express.json())


// ==================== RESUME UPLOAD ====================

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})


// ==================== TEST ROUTE ====================

app.get('/', (req, res) => {
  res.send('CareerForge AI Backend is running!')
})


// ==================== SIGNUP API ====================

app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body

    console.log('SIGNUP REQUEST:', {
      name,
      email,
    })

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Please fill in all fields',
      })
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      name,
      email,
      password: hashedPassword,
    })

    await user.save()

    console.log('USER CREATED SUCCESSFULLY')

    return res.status(201).json({
      message: 'Account created successfully!',
    })
  } catch (error) {
    console.error('SIGNUP ERROR:', error)

    return res.status(500).json({
      message: error.message,
    })
  }
})


// ==================== LOGIN API ====================

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: 'Please fill in all fields',
      })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        message: 'Invalid email or password',
      })
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    )

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: 'Invalid email or password',
      })
    }

    console.log('LOGIN SUCCESSFUL:', email)

    return res.status(200).json({
      message: 'Login successful!',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error('LOGIN ERROR:', error)

    return res.status(500).json({
      message: error.message,
    })
  }
})


// ==================== RESUME ANALYSIS API ====================

app.post(
  '/api/resume/analyze',
  upload.single('resume'),
  async (req, res) => {
    try {

      // Check file
      if (!req.file) {
        return res.status(400).json({
          message: 'Please upload a resume.',
        })
      }

      console.log(
        'RESUME RECEIVED:',
        req.file.originalname
      )

      const fileName =
        req.file.originalname.toLowerCase()

      let resumeText = ''


      // ==================== DOCX ====================

      if (fileName.endsWith('.docx')) {

        const result =
          await mammoth.extractRawText({
            buffer: req.file.buffer,
          })

        resumeText = result.value
      }


      // ==================== PDF ====================

      else if (fileName.endsWith('.pdf')) {

        if (typeof pdfParse === 'function') {

          const result =
            await pdfParse(req.file.buffer)

          resumeText = result.text

        } else if (pdfParse.PDFParse) {

          const parser = new pdfParse.PDFParse({
            data: req.file.buffer,
          })

          const result =
            await parser.getText()

          resumeText = result.text

          await parser.destroy()

        } else {

          throw new Error(
            'PDF parser could not be loaded.'
          )
        }
      }


      // ==================== INVALID FILE ====================

      else {

        return res.status(400).json({
          message:
            'Only PDF and DOCX files are allowed.',
        })
      }


      // ==================== CLEAN TEXT ====================

      resumeText = resumeText
        .replace(/\s+/g, ' ')
        .trim()

      if (!resumeText) {

        return res.status(400).json({
          message:
            'Could not extract text from this resume.',
        })
      }

      console.log(
        'RESUME TEXT EXTRACTED SUCCESSFULLY'
      )


      // ==================================================
      // RESUME ANALYSIS
      // ==================================================

      const text = resumeText.toLowerCase()


      // ==================== SKILLS ====================

      const skillKeywords = [
        'python',
        'java',
        'javascript',
        'react',
        'node.js',
        'nodejs',
        'c++',
        'c',
        'sql',
        'mysql',
        'mongodb',
        'machine learning',
        'deep learning',
        'artificial intelligence',
        'data science',
        'html',
        'css',
        'git',
        'github',
        'docker',
        'aws',
        'azure',
        'power bi',
        'tableau',
        'pandas',
        'numpy',
        'tensorflow',
        'pytorch',
        'scikit-learn',
        'express',
        'express.js',
        'rest api',
      ]


      const skills = []

      skillKeywords.forEach((skill) => {

        if (text.includes(skill)) {

          let displaySkill = skill

          if (skill === 'node.js' || skill === 'nodejs') {
            displaySkill = 'Node.js'
          }

          if (skill === 'express.js') {
            displaySkill = 'Express.js'
          }

          if (skill === 'c++') {
            displaySkill = 'C++'
          }

          if (skill === 'c') {
            displaySkill = 'C'
          }

          if (skill === 'sql') {
            displaySkill = 'SQL'
          }

          if (skill === 'python') {
            displaySkill = 'Python'
          }

          if (skill === 'java') {
            displaySkill = 'Java'
          }

          if (skill === 'javascript') {
            displaySkill = 'JavaScript'
          }

          if (skill === 'react') {
            displaySkill = 'React'
          }

          if (skill === 'mongodb') {
            displaySkill = 'MongoDB'
          }

          if (skill === 'mysql') {
            displaySkill = 'MySQL'
          }

          if (skill === 'machine learning') {
            displaySkill = 'Machine Learning'
          }

          if (skill === 'deep learning') {
            displaySkill = 'Deep Learning'
          }

          if (skill === 'artificial intelligence') {
            displaySkill = 'Artificial Intelligence'
          }

          if (skill === 'data science') {
            displaySkill = 'Data Science'
          }

          if (skill === 'power bi') {
            displaySkill = 'Power BI'
          }

          if (skill === 'scikit-learn') {
            displaySkill = 'Scikit-learn'
          }

          skills.push(displaySkill)
        }
      })


      // Remove duplicate skills

      const uniqueSkills = [
        ...new Set(skills),
      ]


      // ==================== RESUME SCORE ====================

      let score = 40


      // Skills

      if (uniqueSkills.length >= 3) {
        score += 10
      }

      if (uniqueSkills.length >= 6) {
        score += 10
      }


      // Education

      if (
        text.includes('education') ||
        text.includes('btech') ||
        text.includes('b.tech') ||
        text.includes('degree')
      ) {
        score += 10
      }


      // Projects

      if (
        text.includes('project') ||
        text.includes('projects')
      ) {
        score += 10
      }


      // Experience

      if (
        text.includes('experience') ||
        text.includes('internship') ||
        text.includes('intern')
      ) {
        score += 10
      }


      // GitHub / LinkedIn

      if (
        text.includes('github') ||
        text.includes('linkedin')
      ) {
        score += 5
      }


      // Contact information

      if (
        text.includes('@') ||
        text.includes('phone')
      ) {
        score += 5
      }


      // Maximum 100

      if (score > 100) {
        score = 100
      }


      // ==================== SUGGESTIONS ====================

      const suggestions = []


      if (uniqueSkills.length < 3) {

        suggestions.push(
          'Add more relevant technical skills to your resume.'
        )
      }


      if (
        !text.includes('project')
      ) {

        suggestions.push(
          'Add academic or personal projects with technologies used and measurable results.'
        )
      }


      if (
        !text.includes('experience') &&
        !text.includes('internship')
      ) {

        suggestions.push(
          'Add internship, training, volunteering, or practical experience if applicable.'
        )
      }


      if (!text.includes('github')) {

        suggestions.push(
          'Add your GitHub profile to showcase your projects and coding work.'
        )
      }


      if (!text.includes('linkedin')) {

        suggestions.push(
          'Add your LinkedIn profile to improve your professional presence.'
        )
      }


      if (
        !text.includes('summary') &&
        !text.includes('objective')
      ) {

        suggestions.push(
          'Consider adding a short professional summary focused on your target role.'
        )
      }


      suggestions.push(
        'Use measurable achievements wherever possible instead of only listing responsibilities.'
      )


      suggestions.push(
        'Keep formatting consistent and use clear section headings.'
      )


      // ==================== CAREER SUGGESTIONS ====================

      const careerSuggestions = []


      if (
        text.includes('python') ||
        text.includes('java') ||
        text.includes('javascript') ||
        text.includes('react') ||
        text.includes('node')
      ) {

        careerSuggestions.push(
          'Software Developer'
        )
      }


      if (
        text.includes('machine learning') ||
        text.includes('deep learning') ||
        text.includes('tensorflow') ||
        text.includes('pytorch')
      ) {

        careerSuggestions.push(
          'Machine Learning Engineer'
        )
      }


      if (
        text.includes('sql') ||
        text.includes('power bi') ||
        text.includes('tableau') ||
        text.includes('data science')
      ) {

        careerSuggestions.push(
          'Data Analyst'
        )
      }


      if (
        text.includes('artificial intelligence') ||
        text.includes('data science')
      ) {

        careerSuggestions.push(
          'AI / Data Science Engineer'
        )
      }


      // Default career suggestion

      if (careerSuggestions.length === 0) {

        careerSuggestions.push(
          'Software Developer'
        )

        careerSuggestions.push(
          'Technology Graduate / Entry-Level Engineer'
        )
      }


      // Remove duplicate careers

      const uniqueCareers = [
        ...new Set(careerSuggestions),
      ]


      // ==================== FINAL RESPONSE ====================

      console.log(
        'RESUME ANALYSIS COMPLETED'
      )

      console.log(
        'SCORE:',
        score
      )

      console.log(
        'SKILLS:',
        uniqueSkills
      )


      return res.status(200).json({

        message:
          'Resume analyzed successfully!',

        fileName:
          req.file.originalname,

        resumeScore:
          score,

        skills:
          uniqueSkills,

        suggestions:
          suggestions,

        careerSuggestions:
          uniqueCareers,

        textLength:
          resumeText.length,

        resumeText:
          resumeText,

      })

    } catch (error) {

      console.error(
        '=============================='
      )

      console.error(
        'RESUME ERROR:',
        error
      )

      console.error(
        'ERROR MESSAGE:',
        error.message
      )

      console.error(
        '=============================='
      )

      return res.status(500).json({
        message: error.message,
      })
    }
  }
)


// ==================== MONGODB CONNECTION ====================

const connectDatabase = async () => {

  try {

    console.log(
      'Connecting to MongoDB...'
    )

    await mongoose.connect(
      process.env.MONGO_URI
    )

    console.log(
      'MongoDB connected successfully!'
    )

  } catch (error) {

    console.error(
      'MongoDB connection failed:',
      error.message
    )
  }
}


// ==================== SERVER ====================

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

connectDatabase() 