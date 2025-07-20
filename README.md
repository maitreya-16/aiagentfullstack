# AI Agent Fullstack

A fullstack application for automated technical support ticket management using AI assistance. This project provides a platform where users can submit support tickets, AI analyzes and triages the tickets, and moderators/admins manage and resolve them efficiently.

---

## Features

- **User Authentication:** Signup and login using JWT-based authentication.
- **Ticket Submission:** Users can create support tickets, providing title and description.
- **AI Ticket Triage:** AI agent analyzes incoming tickets to:
  - Summarize the issue.
  - Estimate ticket priority ("low", "medium", "high").
  - Suggest helpful notes and external resources.
  - Identify relevant technical skills for resolution.
- **Helpful Notes:** AI provides detailed, actionable notes for each ticket (see below).
- **Moderator/Admin Dashboard:** 
  - Admins can view, search, and update users (roles, skills).
  - Moderators/admins are assigned tickets based on skills.
- **Automated Notifications:** 
  - Welcome email sent to new users on signup.
  - Ticket assignment notifications sent to moderators/admins.
- **Role Management:** User roles include user, moderator, and admin.

---

## Helpful Notes Provided by AI

When a user submits a support ticket, the AI agent analyzes the issue and generates "helpful notes" as part of its triage process. These helpful notes are intended specifically for moderators and admins to:

- Offer a detailed technical explanation of the issue.
- Suggest actionable steps that can help resolve the ticket.
- Include links to relevant external resources, documentation, or troubleshooting guides when possible.
- Identify potential root causes and troubleshooting directions.
- Highlight any dependencies, technologies, or skills required to address the problem.

The helpful notes are automatically attached to each ticket, ensuring that whoever is assigned to the ticket has immediate, AI-generated context and suggestions, streamlining the resolution workflow and reducing time to response.

**Example Helpful Notes Output:**
```json
{
  "summary": "User cannot connect to MongoDB from frontend.",
  "priority": "high",
  "helpfulNotes": "Check if MongoDB URI is correctly set in the backend environment variables. Ensure that network access is allowed for the connecting IP. Refer to: https://docs.mongodb.com/manual/reference/connection-string/",
  "relatedSkills": ["MongoDB", "Node.js", "React"]
}
```

---

## Tech Stack

- **Frontend:** React, Vite, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (using mongoose)
- **AI Integration:** Gemini (via @inngest/agent-kit)
- **Email:** Nodemailer (via custom mailer utility)
- **Event Processing:** Inngest
- **Authentication:** JWT

---

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB running instance
- Environment variables for backend (see below)

### Installation

1. **Clone the repository:**
   ```
   git clone https://github.com/maitreya-16/aiagentfullstack.git
   cd aiagentfullstack
   ```

2. **Backend Setup:**
   ```bash
   cd ai-ticket-assistant
   npm install
   ```
   - Create a `.env` file with:
     ```
     MONGO_URI=your_mongo_connection_string
     JWT_SECRET=your_jwt_secret
     GEMINI_API_KEY=your_gemini_api_key
     ```

3. **Frontend Setup:**
   ```bash
   cd ../ai-ticket-frontend
   npm install
   ```
   - Create a `.env` file (if needed) and set:
     ```
     VITE_SERVER_URL=http://localhost:3000/api
     ```

4. **Run the backend:**
   ```bash
   cd ../ai-ticket-assistant
   npm start
   ```

5. **Run the frontend:**
   ```bash
   cd ../ai-ticket-frontend
   npm run dev
   ```

---

## Usage

- **Sign up** as a new user.
- **Submit tickets** describing your technical support issues.
- **AI** will triage your ticket, assign priority, suggest solutions, and forward to a suitable moderator/admin.
- **Admins** can manage users, assign roles and skills via the admin dashboard.

---

## Project Structure

```
aiagentfullstack/
│
├── ai-ticket-assistant/        # Backend API and AI ticket processing
│   ├── controllers/
│   ├── ingest/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.js
│
├── ai-ticket-frontend/         # Frontend React app
│   ├── src/
│   ├── public/
│   └── index.html
│
└── README.md
```

---
## Author

- [@maitreya-16](https://github.com/maitreya-16)
