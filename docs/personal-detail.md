## 🧍 Personal Detail API Endpoints

These endpoints allow you to manage the **personal detail** section of a resume. Each resume can have one associated personal detail.

---

### 1. **POST /api/v0/resumes/:resumeId/personal-detail/**

**Description:** Add personal details to a specific resume.

**Usage:**

```http
POST /api/v0/resumes/661a1c70cbfc1e0e5c3a78a9/personal-detail/ HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer {token}

{
  "fullName": "Jane Miriam Doe",
  "email": "jane.doe@example.com",
  "phone": "+255712345678",
  "address": "123 Main Street, Dar es Salaam, Tanzania",
  "gender": "Female",
  "nationality": "Tanzanian",
  "dateOfBirth": "15/08/1997",
  "maritualStatus": "Single",
  "socialLinks": {
    "linkedIn": "https://www.linkedin.com/in/janedoe",
    "facebook": "https://www.facebook.com/jane.doe",
    "x": "https://x.com/janedoe",
    "github": "https://github.com/janedoe"
  }
}
```

**Response:**

```json
{
  "success": true,
  "message": "Personal detail added successfully",
  "personalDetail": {
    "_id": "661b2ec1aa847b5e4c9e66f0",
    "resume": "661a1c70cbfc1e0e5c3a78a9",
    "fullName": "Jane Miriam Doe",
    "email": "jane.doe@example.com",
    "phone": "+255712345678",
    "address": "123 Main Street, Dar es Salaam, Tanzania",
    "gender": "Female",
    "nationality": "Tanzanian",
    "dateOfBirth": "15/08/1997",
    "maritualStatus": "Single",
    "socialLinks": {
      "linkedIn": "https://www.linkedin.com/in/janedoe",
      "facebook": "https://www.facebook.com/jane.doe",
      "x": "https://x.com/janedoe",
      "github": "https://github.com/janedoe"
    }
  }
}
```

---

### 2. **GET /api/v0/resumes/:resumeId/personal-detail/:id**

**Description:** Retrieve personal detail for a specific resume by personal detail ID.

**Usage:**

```http
GET /api/v0/resumes/661a1c70cbfc1e0e5c3a78a9/personal-detail/661b2ec1aa847b5e4c9e66f0 HTTP/1.1
Host: api.example.com
Authorization: Bearer {token}
```

**Response:**

```json
{
  "success": true,
  "personalDetail": {
    "_id": "661b2ec1aa847b5e4c9e66f0",
    "resume": "661a1c70cbfc1e0e5c3a78a9",
    "fullName": "Jane Miriam Doe",
    "email": "jane.doe@example.com",
    "phone": "+255712345678",
    "address": "123 Main Street, Dar es Salaam, Tanzania",
    "gender": "Female",
    "nationality": "Tanzanian",
    "dateOfBirth": "15/08/1997",
    "maritualStatus": "Single",
    "socialLinks": {
      "linkedIn": "https://www.linkedin.com/in/janedoe",
      "facebook": "https://www.facebook.com/jane.doe",
      "x": "https://x.com/janedoe",
      "github": "https://github.com/janedoe"
    },
    "createdAt": "2025-04-13T19:01:32.844Z",
    "updatedAt": "2025-04-13T19:01:32.844Z"
  }
}
```

---

### 3. **PATCH /api/v0/resumes/:resumeId/personal-detail/:id**

**Description:** Update existing personal detail. Only send fields you want to update.

**Usage:**

```http
PATCH /api/v0/resumes/661a1c70cbfc1e0e5c3a78a9/personal-detail/661b2ec1aa847b5e4c9e66f0 HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer {token}

{
  "address": "456 New Street, Dodoma, Tanzania",
  "phone": "+255713334455"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Personal detail updated successfully",
  "personalDetail": {
    "_id": "661b2ec1aa847b5e4c9e66f0",
    "resume": "661a1c70cbfc1e0e5c3a78a9",
    "fullName": "Jane Miriam Doe",
    "email": "jane.doe@example.com",
    "phone": "+255713334455",
    "address": "456 New Street, Dodoma, Tanzania",
    "gender": "Female",
    "nationality": "Tanzanian",
    "dateOfBirth": "15/08/1997",
    "maritualStatus": "Single",
    "socialLinks": {
      "linkedIn": "https://www.linkedin.com/in/janedoe",
      "facebook": "https://www.facebook.com/jane.doe",
      "x": "https://x.com/janedoe",
      "github": "https://github.com/janedoe"
    },
    "createdAt": "2025-04-13T19:01:32.844Z",
    "updatedAt": "2025-04-13T19:01:32.844Z"
  }
}
```

---
