## 👥 Referees API Endpoints

These endpoints allow you to manage the referee section of a resume. Each user can add, retrieve, update, or delete multiple referees under their resume.

---

### 1. **POST /api/v0/resumes/:resumeId/referees/**

**Description:** Add a new referee to the specified resume's referees section.

**Usage:**

```http
POST /api/v0/resumes/661a1c70cbfc1e0e5c3a78a9/referees/ HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer {token}

{
  "name": "Mary Smith",
  "position": "Assistant Lecturer",
  "organization": "University of Dar es Salaam",
  "address": "P.O. Box 35091, Dar es Salaam, Tanzania",
  "email": "johndoe4@example.com",
  "phone": "+255712345670"
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

| Field        | Type   | Required | Description                                                              |
| ------------ | ------ | -------- | ------------------------------------------------------------------------ |
| name         | String | ✅       | Name of the referee (e.g., Mary Smith)                                   |
| position     | String | ✅       | Position of the referee (e.g., Assistant Lecturer)                       |
| organization | String | ✅       | Organization where the referee works (e.g., University of Dar es Salaam) |
| address      | String | ✅       | Address of the referee (e.g., P.O. Box 35091, Dar es Salaam, Tanzania)   |
| email        | String | ✅       | Email address of the referee (e.g., johndoe4@example.com)                |
| phone        | String | ✅       | Phone number of the referee (e.g., +255712345670)                        |

**Response:**

```json
{
  "success": true,
  "message": "Referee added successfully",
  "referee": {
    "_id": "6800caad309c6b466ca97b2e",
    "resume": "67fdeb62f1145dae48777766",
    "name": "Mary Smith",
    "position": "Assistant Lecturer",
    "organization": "University of Dar es Salaam",
    "address": "P.O. Box 35091, Dar es Salaam, Tanzania",
    "email": "johndoe2@example.com",
    "phone": "+255712345671",
    "createdAt": "2025-04-17T09:32:29.913Z",
    "updatedAt": "2025-04-17T09:32:29.913Z"
  }
}
```

---

### 2. **GET /api/v0/resumes/:resumeId/referees/**

**Description:** Retrieve all referees associated with a given resume.

**Usage:**

```http
GET /api/v0/resumes/661a1c70cbfc1e0e5c3a78a9/referees/ HTTP/1.1
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
  "message": "Referees retrieved successfully",
  "referees": [
    {
      "_id": "6800caad309c6b466ca97b2e",
      "resume": "67fdeb62f1145dae48777766",
      "name": "Mary Smith",
      "position": "Assistant Lecturer",
      "organization": "University of Dar es Salaam",
      "address": "P.O. Box 35091, Dar es Salaam, Tanzania",
      "email": "johndoe2@example.com",
      "phone": "+255712345671",
      "createdAt": "2025-04-17T09:32:29.913Z",
      "updatedAt": "2025-04-17T09:32:29.913Z"
    }
  ]
}
```

---

### 3. **PATCH /api/v0/resumes/:resumeId/referees/:id**

**Description:** Update a specific referee by its ID within the specified resume.

**Usage:**

```http
PATCH /api/v0/resumes/661a1c70cbfc1e0e5c3a78a9/referees/661f4c00c8f62c33b2b3a4f5 HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer {token}

{
  "name": "Mary Smith",
  "position": "Assistant Lecturer",
  "organization": "University of Dar es Salaam",
  "address": "P.O. Box 35091, Dar es Salaam, Tanzania",
  "email": "johndoe4@example.com",
  "phone": "+255712345670"
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
| id        | String | The ID of the referee to update      |

**Request Body:**  
Partial updates are supported. Only include fields you want to update.

```json
{
  "name": "Mary Smith",
  "position": "Assistant Lecturer",
  "organization": "University of Dar es Salaam",
  "address": "P.O. Box 35091, Dar es Salaam, Tanzania",
  "email": "johndoe2@example.com",
  "phone": "+255712345671"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Referee updated successfully",
  "referee": {
    "_id": "6800caad309c6b466ca97b2e",
    "resume": "67fdeb62f1145dae48777766",
    "name": "Mary Smith",
    "position": "Assistant Lecturer",
    "organization": "University of Dar es Salaam",
    "address": "P.O. Box 35091, Dar es Salaam, Tanzania",
    "email": "johndoe2@example.com",
    "phone": "+255712345671",
    "createdAt": "2025-04-17T09:32:29.913Z",
    "updatedAt": "2025-04-17T09:32:29.913Z"
  }
}
```

---

### 4. **DELETE /api/v0/resumes/:resumeId/referees/:id**

**Description:** Delete a specific referee by its ID from the specified resume.

**Usage:**

```http
DELETE /api/v0/resumes/661a1c70cbfc1e0e5c3a78a9/referees/661f4c00c8f62c33b2b3a4f5 HTTP/1.1
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
| id        | String | The ID of the referee to delete      |

**Response:**

```json
{
  "success": true,
  "message": "Referee deleted successfully"
}
```

---
