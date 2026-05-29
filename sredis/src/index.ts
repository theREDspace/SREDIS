import express from 'express'
import dotenv from 'dotenv'
import { handleJiraWebhook } from './jira'

dotenv.config()

const app = express()
app.use(express.json())

app.post('/api/sred-analyze', handleJiraWebhook)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`SRED'IS service running on port ${PORT}`)
})
