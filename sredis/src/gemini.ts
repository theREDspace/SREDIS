import axios from 'axios';
import { config } from './config';
import { GEMINI_SRED_PROMPT } from './prompts';

const { geminiApiEndpoint, geminiApiKey } = config;

export async function analyzeWithGemini(ticket: { summary: string; description: string; comments: string[]; acceptanceCriteria?: string; prSummaries?: string; commits?: string; developer?: string; projectContext?: string }) {
	// Replace placeholders in the prompt template with ticket data
	const prompt = GEMINI_SRED_PROMPT
		.replace(/\{\{JIRA_TITLE\}\}/g, ticket.summary)
		.replace(/\{\{JIRA_DESCRIPTION\}\}/g, ticket.description)
		.replace(/\{\{COMMENTS\}\}/g, ticket.comments && ticket.comments.length ? ticket.comments.join('\n') : '');
	const url = `${geminiApiEndpoint}${geminiApiKey}`;
	const response = await axios.post(url, {
		contents: [{ parts: [{ text: prompt }] }],
	});
	// Parse the Gemini response for the SRED documentation section
	const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || '';
	return text.trim();
}
