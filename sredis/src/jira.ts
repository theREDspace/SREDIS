import { Request, Response } from 'express'
import { fetchJiraTicketDetails, updateJiraSredFields } from './jiraApi'
import { analyzeWithGemini } from './gemini'

// Utility: Convert plain text (with newlines) to simple Atlassian Document Format (ADF)
function textToAdfDoc(text: string) {
  // Split by double newlines for paragraphs, single newlines for line breaks
  const paragraphs = text.split(/\n{2,}/).map(paragraph => {
    // Each paragraph: split by single newline for line breaks
    const lines = paragraph.split(/\n/).map(line => ({ type: 'text', text: line }));
    return {
      type: 'paragraph',
      content: lines.length ? lines : [{ type: 'text', text: '' }],
    };
  });
  return {
    type: 'doc',
    version: 1,
    content: paragraphs,
  };
}

export async function handleJiraWebhook(req: Request, res: Response) {
  const { issueKey } = req.body
  if (!issueKey) {
    return res.status(400).json({ error: 'Missing issueKey' })
  }
  try {
    // 1. Fetch ticket details from Jira
    const ticket = await fetchJiraTicketDetails(issueKey)
    // 2. Analyze with Gemini
    const sredSummary = await analyzeWithGemini(ticket)
    // 3. Convert summary to ADF and update Jira ticket
    const adfDoc = textToAdfDoc(sredSummary)
    await updateJiraSredFields(issueKey, adfDoc)
    res.json({ success: true, sredSummary: adfDoc })
  } catch (err: any) {
    // Enhanced error logging for debugging
    console.error('Error in handleJiraWebhook:', err?.response?.data || err)
    res.status(500).json({ error: err.message, details: err?.response?.data })
  }
}
