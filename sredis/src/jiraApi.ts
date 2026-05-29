import axios from 'axios';
import { config } from './config';

const { cloudId, jiraFieldIds } = config;
const jiraBearerToken = process.env.JIRA_BEARER_TOKEN || '';

const headers = {
  Authorization: `Bearer ${jiraBearerToken}`,
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const apiBase = `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3`;

export async function fetchJiraTicketDetails(issueKey: string) {
  const url = `${apiBase}/issue/${issueKey}`;
  const response = await axios.get(url, { headers });
  const { summary, description } = response.data.fields;
  const comments = response.data.fields.comment?.comments?.map((c: any) => c.body) || [];
  return { summary, description, comments };
}

export async function updateJiraSredFields(issueKey: string, adfDoc: object) {
  const url = `${apiBase}/issue/${issueKey}`;
  const data = {
    fields: {
      [jiraFieldIds.sredDocumentation]: adfDoc,
    },
  };
  await axios.put(url, data, { headers });
}
