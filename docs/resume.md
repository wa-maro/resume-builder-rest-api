## 📝 Resume API Endpoints

---

### 1. **POST /api/v0/resumes/**

**Description:** Create a new resume for the authenticated user. Each user can only create one resume.

**Usage:**

```http
POST /api/v0/resumes/ HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer {token}

{
  "title": "Full Stack Developer Resume",
  "summary": "A detail-oriented developer with experience in building scalable web apps.",
  "declaration": {
    "statement": "I hereby declare that the information provided is true and correct.",
    "signature": "Jane Doe",
    "date": "13/04/2025"
  }
}
```

**Response:**

```json
{
  "success": true,
  "message": "Resume created successfully",
  "resume": {
    "_id": "661a1c70cbfc1e0e5c3a78a9",
    "user": "67fbf4f562e0a6b6e874316e",
    "title": "Full Stack Developer Resume",
    "summary": "A detail-oriented developer with experience in building scalable web apps.",
    "declaration": {
      "statement": "I hereby declare that the information provided is true and correct.",
      "signature": "Jane Doe",
      "date": "13/04/2025"
    }
  }
}
```

---

### 2. **GET /api/v0/resumes/:id**

**Description:** Retrieve a single resume by its ID.

**Usage:**

```http
GET /api/v0/resumes/661a1c70cbfc1e0e5c3a78a9 HTTP/1.1
Host: api.example.com
Authorization: Bearer {token}
```

**Response:**

```json
{
  "success": true,
  "resume": {
    "_id": "661a1c70cbfc1e0e5c3a78a9",
    "user": "67fbf4f562e0a6b6e874316e",
    "title": "Full Stack Developer Resume",
    "summary": "A detail-oriented developer with experience in building scalable web apps.",
    "declaration": {
      "statement": "I hereby declare that the information provided is true and correct.",
      "signature": "Jane Doe",
      "date": "13/04/2025"
    },
    "createdAt": "2025-04-13T19:01:32.844Z",
    "updatedAt": "2025-04-13T19:01:32.844Z"
  }
}
```

---

### 3. **PATCH /api/v0/resumes/:id**

**Description:** Update an existing resume by ID. Only fields provided in the body will be updated.

**Usage:**

```http
PATCH /api/v0/resumes/661a1c70cbfc1e0e5c3a78a9 HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer {token}

{
  "title": "Updated Resume Title",
  "summary": "Updated summary content.",
   "declaration": {
    "statement": "I hereby declare that the information provided above is true to the best of my knowledge.",
    "signature": "John Doe",
    "date": "14/04/2025"
  }
}
```

**Response:**

```json
{
  "success": true,
  "message": "Resume updated successfully",
  "resume": {
    "_id": "661a1c70cbfc1e0e5c3a78a9",
    "user": "67fbf4f562e0a6b6e874316e",
    "title": "Updated Resume Title",
    "summary": "Updated summary content.",
    "declaration": {
      "statement": "I hereby declare that the information provided is true and correct.",
      "signature": "Jane Doe",
      "date": "13/04/2025"
    },
    "createdAt": "2025-04-13T19:01:32.844Z",
    "updatedAt": "2025-04-13T19:01:32.844Z"
  }
}
```

---

### 4. **DELETE /api/v0/resumes/:id**

**Description:** Permanently delete a resume by ID.

**Usage:**

```http
DELETE /api/v0/resumes/661a1c70cbfc1e0e5c3a78a9 HTTP/1.1
Host: api.example.com
Authorization: Bearer {token}
```

**Response:**

```json
{
  "success": true,
  "message": "Resume deleted successfully"
}
```

---
