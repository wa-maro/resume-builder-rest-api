# resume-builder-rest-api

A RESTful API for building and managing professional resumes.
Built with Node.js, Express, and MongoDB. Supports user authentication, resume creation, section management (education, experience, skills, etc.), and PDF export.

## Features

- User registration and authentication (JWT)
- Create and manage resumes
- Add and edit resume sections:
  - Personal Details
  - Education Background
  - Work Experience
  - Skills & Certifications
  - Referees
  - Declaration with Signature
- Export resumes to PDF (coming soon)

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Authentication)
- Joi (Validation)

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB

### Installation

```bash
git clone https://github.com/theomaro/resume-builder-rest-api.git
cd resume-builder-rest-api
npm install
```

## API Endpoints Overview

---

### 📄 Resume API Endpoints

These endpoints allow you to manage the resume itself, which acts as the central entity linking together all sections like personal details, education, work experience, skills, referees, and more. Each user can have one resume.

| Method | Endpoint              | Description           |
| ------ | --------------------- | --------------------- |
| POST   | `/api/v0/resumes/`    | Create a new resume   |
| GET    | `/api/v0/resumes/:id` | Get a resume by ID    |
| PATCH  | `/api/v0/resumes/:id` | Update a resume by ID |
| DELETE | `/api/v0/resumes/:id` | Delete a resume by ID |

> 🔗 For detailed API documentation, 👉 [resume.md](./docs/resume.md)

---

#### 🧍 Personal Detail API Endpoints

These endpoints allow you to manage the personal detail section of a resume. Each resume can have one associated personal detail.

| Method | Endpoint                                        | Description                     |
| ------ | ----------------------------------------------- | ------------------------------- |
| POST   | `/api/v0/resumes/:resumeId/personal-detail/`    | Add personal detail to a resume |
| GET    | `/api/v0/resumes/:resumeId/personal-detail/:id` | Get personal detail by ID       |
| PATCH  | `/api/v0/resumes/:resumeId/personal-detail/:id` | Update personal detail by ID    |

> 🔗 For detailed API documentation, 👉 [personal-detail.md](./docs/personal-detail.md)

---

#### 🎓 Education Qualification API Endpoints

These endpoints allow you to manage general education qualifications such as Primary, O-Level, and A-Level within a resume's education background.

| Method | Endpoint                                                 | Description                                 |
| ------ | -------------------------------------------------------- | ------------------------------------------- |
| POST   | `/api/v0/resumes/:resumeId/education-qualifications/`    | Add a new education qualification           |
| GET    | `/api/v0/resumes/:resumeId/education-qualifications/`    | Get all education qualifications for resume |
| PATCH  | `/api/v0/resumes/:resumeId/education-qualifications/:id` | Update a specific education qualification   |
| DELETE | `/api/v0/resumes/:resumeId/education-qualifications/:id` | Delete a specific education qualification   |

> 🔗 For detailed API documentation, 👉 [education-qualifications.md](./docs/education-qualifications.md)

---

#### 🎓 Profession Qualification API Endpoints

These endpoints allow you to manage higher education qualifications (e.g., Diplomas, Degrees) within a resume's education background.

| Method | Endpoint                                                  | Description                                  |
| ------ | --------------------------------------------------------- | -------------------------------------------- |
| POST   | `/api/v0/resumes/:resumeId/profession-qualifications/`    | Add a new profession qualification           |
| GET    | `/api/v0/resumes/:resumeId/profession-qualifications/`    | Get all profession qualifications for resume |
| PATCH  | `/api/v0/resumes/:resumeId/profession-qualifications/:id` | Update a specific profession qualification   |
| DELETE | `/api/v0/resumes/:resumeId/profession-qualifications/:id` | Delete a specific profession qualification   |

> 🔗 For detailed API documentation, 👉 [profession-qualifications.md](./docs/profession-qualifications.md)

---

### 🧠 Skills API Endpoints

These endpoints allow you to manage the skills section of a resume. Each user can add, retrieve, update, or delete multiple skills under their resume.

| Method | Endpoint                               | Description                   |
| ------ | -------------------------------------- | ----------------------------- |
| POST   | `/api/v0/resumes/:resumeId/skills/`    | Add a new skill               |
| GET    | `/api/v0/resumes/:resumeId/skills/`    | Get all skills for a resume   |
| PATCH  | `/api/v0/resumes/:resumeId/skills/:id` | Update a specific skill by ID |
| DELETE | `/api/v0/resumes/:resumeId/skills/:id` | Delete a specific skill by ID |

> 🔗 For detailed API documentation, 👉 [skills.md](./docs/skills.md)

---

### 👥 Referee API Endpoints

These endpoints allow you to manage the referees section of a resume. Each user can add, retrieve, update, or delete multiple referees under their resume.

| Method | Endpoint                                 | Description                     |
| ------ | ---------------------------------------- | ------------------------------- |
| POST   | `/api/v0/resumes/:resumeId/referees/`    | Add a new referee               |
| GET    | `/api/v0/resumes/:resumeId/referees/`    | Get all referees for a resume   |
| PATCH  | `/api/v0/resumes/:resumeId/referees/:id` | Update a specific referee by ID |
| DELETE | `/api/v0/resumes/:resumeId/referees/:id` | Delete a specific referee by ID |

> 🔗 For detailed API documentation, 👉 [referees.md](./docs/referees.md)

---
