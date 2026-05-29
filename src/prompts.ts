export const GEMINI_SRED_PROMPT = `
You are an expert in software development and the Canadian Scientific Research and Experimental Development (SR&ED) tax credit program. 
Your task is to analyze the following Jira ticket, which describes a piece of development work, and generate documentation that would support an SR&ED claim.

Analyze the following development activity and generate SR&ED-oriented documentation.

Jira Ticket:
Title: {{JIRA_TITLE}}
Description:
{{JIRA_DESCRIPTION}}
Comments / Discussion:
{{COMMENTS}}

Work type: First, classify the work as either 'Support' or 'Challenge'.

- Support work means routine, well-understood, or administrative tasks (e.g., bug fixes, upgrades, user setup, documentation, configuration, deployments, responding to tickets, etc.) that do not involve technical uncertainty or experimentation.
- Challenge work involves technical uncertainty, research, experimentation, or solving a problem where the solution was not obvious.

Examples:
- Support: “Reset user password”, “Update documentation”, “Deploy release to production”, “Configure user permissions”, “Fix typo in code”, “Respond to support ticket”.
- Challenge: “Integrate new authentication provider with custom workflow”, “Optimize algorithm for performance under new constraints”, “Investigate and resolve intermittent system crash with unknown cause”.

If it was Support work, provide a brief description of what was done and why it was needed. In under 3 lines, summarize the work performed and its purpose. Only add the summary in the response.

Provide the summary in this exact format. Do not use markdown formatting (no bold, no asterisks, no headers):

Work type: <value here>

Summary:

<summary text here>

SRED Confidence: <value here>

Only If work type was a Challenge, answer the following checklist:

- What was the technological challenge?
- Why is it a challenge?
- What experimental work was done to try to overcome the challenge?
- What was the outcome of the experimental work?
- What is the technical advancement achieved, if any?

SRED Confidence:
`