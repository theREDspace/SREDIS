# SRED’IS - SR&ED Intelligence Service
Scientific Research & Experimental Development (SR&ED) Automation Service for Jira using Gemini AI

## Getting Started

1. **Clone the repository**
	```sh
	git clone git@github.com:theREDspace/SREDIS.git
	cd sredis
	```

2. **Copy the .env file**
	- Obtain the `.env` file from Keeper and place it in the `sredis` directory.
	- Ensure it contains:
	  - `JIRA_BASE_URL`, `JIRA_USER`, `JIRA_API_TOKEN`, `GEMINI_API_KEY`, `GEMINI_API_ENDPOINT`, and the correct Jira field IDs.

3. **Install dependencies**
	```sh
	npm install
	```

4. **Configure Gemini Endpoint**
	- In your `.env`:
	  ```
	  GEMINI_API_ENDPOINT=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=
	  ```
	- Your `GEMINI_API_KEY` will be appended automatically by the code.

## Testing

### 1. Start the Service

```sh
npm run dev
# or
npm start
```

### 2. Test the POST Endpoint (Postman or curl)

**Endpoint:**
```
POST http://localhost:3000/api/sred-analyze
```

**Request Body (JSON):**
```
{
  "issueKey": "<YOUR_JIRA_ISSUE_KEY>"
}
```

Example : 

```
{
  "issueKey": "UDF25-415"
}
```

**Using Postman:**
- Set method to POST
- URL: http://localhost:3000/api/sred-analyze
- Body: raw, JSON, with the above payload
- Send the request

### 3. Verify
- The response will include the SRED summary. The response will be posted to JIRA and can be found in the SRED Documentation section of the ticket. 
