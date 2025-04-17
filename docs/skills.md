## 🧠 Skills API Endpoints

These endpoints allow you to manage the skill section of a resume. Each user can add, retrieve, update, or delete multiple skills under their resume.

---

### 1. **POST /api/v0/resumes/:resumeId/skills/**

**Description:** Add a new skill to the specified resume's skills section.

**Usage:**

```http
POST /api/v0/resumes/661a1c70cbfc1e0e5c3a78a9/skills/ HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer {token}

{
    "type": "soft",
    "name": "Communication",
    "proficiency": "advanced",
}
```

**Request Headers:**

| Header        | Value            | Required | Description                       |
| ------------- | ---------------- | -------- | --------------------------------- |
| Authorization | Bearer `{token}` | ✅       | JWT token for authenticated user  |
| Content-Type  | application/json | ✅       | Specifies the request body format |

**Path Parameters:**

| Parameter | Type   | Description                          |
| --------- | ------ | ------------------------------------ |
| resumeId  | String | The unique ID of the resume document |

**Request Body:**

| Field       | Type   | Required | Description                                  |
| ----------- | ------ | -------- | -------------------------------------------- |
| type        | String | ✅       | Type of the skill (soft or professional)     |
| name        | String | ✅       | Name of the skill (e.g., JavaScript, Excel)  |
| proficiency | String | ❌       | Proficiency level (e.g., Beginner, Advanced) |

**Response:**

```json
{
  "success": true,
  "message": "Skill added successfully",
  "skill": {
    "_id": "661f4c00c8f62c33b2b3a4f5",
    "type": "soft",
    "name": "JavaScript",
    "proficiency": "Advanced",
    "createdAt": "2025-04-17T07:41:12.080Z",
    "updatedAt": "2025-04-17T07:41:12.080Z"
  }
}
```

---

### 2. **GET /api/v0/resumes/:resumeId/skills/**

**Description:** Retrieve all skills associated with a given resume.

**Usage:**

```http
GET /api/v0/resumes/661a1c70cbfc1e0e5c3a78a9/skills/ HTTP/1.1
Host: api.example.com
Authorization: Bearer {token}
```

**Request Headers:**

| Header        | Value            | Required | Description                          |
| ------------- | ---------------- | -------- | ------------------------------------ |
| Authorization | Bearer `{token}` | ✅       | JWT token for the authenticated user |

**Path Parameters:**

| Parameter | Type   | Description                          |
| --------- | ------ | ------------------------------------ |
| resumeId  | String | The unique ID of the resume document |

**Response:**

```json
{
  "success": true,
  "message": "Skills retrieved successfully",
  "skills": [
    {
      "skill": {
        "_id": "661f4c00c8f62c33b2b3a4f5",
        "type": "soft",
        "name": "JavaScript",
        "proficiency": "Advanced",
        "createdAt": "2025-04-17T07:41:12.080Z",
        "updatedAt": "2025-04-17T07:41:12.080Z"
      }
    }
  ]
}
```

---

### 3. **PATCH /api/v0/resumes/:resumeId/skills/:skillId**

**Description:** Update a specific skill by its ID within the specified resume.

**Usage:**

```http
PATCH /api/v0/resumes/661a1c70cbfc1e0e5c3a78a9/skills/661f4c00c8f62c33b2b3a4f5 HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer {token}

{
  "level": "Expert"
}
```

**Request Headers:**

| Header        | Value            | Required | Description                          |
| ------------- | ---------------- | -------- | ------------------------------------ |
| Authorization | Bearer `{token}` | ✅       | JWT token for the authenticated user |
| Content-Type  | application/json | ✅       | Body content type                    |

**Path Parameters:**

| Parameter | Type   | Description                          |
| --------- | ------ | ------------------------------------ |
| resumeId  | String | The unique ID of the resume document |
| skillId   | String | The ID of the skill to update        |

**Request Body:**  
Partial updates are supported. Only include fields you want to update.

```json
{
  "name": "JavaScript",
  "proficiency": "Expert"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Skill updated successfully",
  "skill": {
    "_id": "661f4c00c8f62c33b2b3a4f5",
    "type": "soft",
    "name": "JavaScript",
    "proficiency": "Advanced",
    "createdAt": "2025-04-17T07:41:12.080Z",
    "updatedAt": "2025-04-17T07:41:12.080Z"
  }
}
```

---

### 4. **DELETE /api/v0/resumes/:resumeId/skills/:skillId**

**Description:** Delete a specific skill by its ID from the specified resume.

**Usage:**

```http
DELETE /api/v0/resumes/661a1c70cbfc1e0e5c3a78a9/skills/661f4c00c8f62c33b2b3a4f5 HTTP/1.1
Host: api.example.com
Authorization: Bearer {token}
```

**Request Headers:**

| Header        | Value            | Required | Description                          |
| ------------- | ---------------- | -------- | ------------------------------------ |
| Authorization | Bearer `{token}` | ✅       | JWT token for the authenticated user |

**Path Parameters:**

| Parameter | Type   | Description                          |
| --------- | ------ | ------------------------------------ |
| resumeId  | String | The unique ID of the resume document |
| skillId   | String | The ID of the skill to delete        |

**Response:**

```json
{
  "success": true,
  "message": "Skill deleted successfully"
}
```

---
