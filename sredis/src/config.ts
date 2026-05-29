import dotenv from 'dotenv';
dotenv.config();

export const config = {
	jiraBaseUrl: process.env.JIRA_BASE_URL || '',
	jiraUser: process.env.JIRA_USER || '',
	jiraApiToken: process.env.JIRA_API_TOKEN || '',
	geminiApiEndpoint: process.env.GEMINI_API_ENDPOINT || '',
	geminiApiKey: process.env.GEMINI_API_KEY || '',
	jiraFieldIds: {
		sredDocumentation: process.env.JIRA_FIELD_ID_SRED_DOCUMENTATION || '',
	},
	geminiSectionHeaders: {
		sredDocumentation: 'SRED Documentation',
	},
  cloudId: process.env.CLOUD_ID || '',
};