## 🎓 Education Qualifications API Endpoints

These endpoints allow you to manage the education background section of a resume. Each user can add, update, retrieve, or delete multiple education qualifications under their resume.

---

### 1. **POST /api/v0/resumes/:resumeId/education-qualifications/**

**Description:** Add a new education qualification (e.g., Primary, O-Level, A-Level) to the specified resume's education background.

**Usage:**

```http
POST /api/v0/resumes/661a1c70cbfc1e0e5c3a78a9/education-qualifications/ HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer {token}

{
  "level": "O-Level",
  "schoolName": "Mzumbe Secondary School",
  "startYear": 2012,
  "endYear": 2015,
  "certificate": "The Certificate of Secondary Education Examination (CSEE)",
  "grade": {
    "division": "I",
    "points": "10"
  }
}
```

**Request Headers:**

| Header        | Value            | Required | Description                       |
| ------------- | ---------------- | -------- | --------------------------------- |
| Authorization | Bearer `{token}` | ✅       | JWT token for authenticated user  |
| Content-Type  | application/json | ✅       | Specifies the request body format |

**Request Body:**

| Field       | Type   | Required | Description                                                                 |
| ----------- | ------ | -------- | --------------------------------------------------------------------------- |
| level       | String | ✅       | One of: `"Primary"`, `"O-Level"`, `"A-Level"`                               |
| schoolName  | String | ✅       | Name of the school                                                          |
| startYear   | Number | ✅       | 4-digit year format, must be ≤ `endYear`                                    |
| endYear     | Number | ✅       | 4-digit year format                                                         |
| certificate | String | ✅       | Valid certificate type depending on `level` (e.g., CSEE, PSLE, ACSEE)       |
| grade       | Object | ❌       | Grade object with `division` and `points` fields (optional but recommended) |
| ├─ division | String | ❌       | One of: `"I"`, `"II"`, `"III"`, `"IV"`, `"0"`                               |
| └─ points   | String | ❌       | Points scored                                                               |

**Response:**

```json
{
  "success": true,
  "message": "Education qualification added successfully",
  "data": {
    "_id": "661c4b9d345b8b0e77d2b0a4",
    "level": "O-Level",
    "schoolName": "Mzumbe Secondary School",
    "startYear": 2012,
    "endYear": 2015,
    "certificate": "The Certificate of Secondary Education Examination (CSEE)",
    "grade": {
      "division": "I",
      "points": "10"
    }
  }
}
```

---

### 2. **GET /api/v0/resumes/:resumeId/education-qualifications/**

**Description:** Retrieve all education qualifications (e.g., Primary, O-Level, A-Level) associated with a given resume.

**Usage:**

```http
GET /api/v0/resumes/661a1c70cbfc1e0e5c3a78a9/education-qualifications/ HTTP/1.1
Host: api.example.com
Authorization: Bearer {token}
```

**Request Headers:**

| Header        | Value            | Required | Description                          |
| ------------- | ---------------- | -------- | ------------------------------------ |
| Authorization | Bearer `{token}` | ✅       | JWT token for the authenticated user |

**Path Parameter:**

| Parameter | Type   | Description                          |
| --------- | ------ | ------------------------------------ |
| resumeId  | String | The unique ID of the resume document |

**Response:**

```json
{
  "success": true,
  "message": "Education qualifications retrieved successfully",
  "educationQualifications": [
    {
      "_id": "661c4b9d345b8b0e77d2b0a4",
      "level": "O-Level",
      "schoolName": "Mzumbe Secondary School",
      "startYear": 2012,
      "endYear": 2015,
      "certificate": "The Certificate of Secondary Education Examination (CSEE)",
      "grade": {
        "division": "I",
        "points": "10"
      }
    },
    {
      "_id": "661c4e2d2347c10e3a8b9a12",
      "level": "Primary",
      "schoolName": "Uhuru Primary School",
      "startYear": 2005,
      "endYear": 2011,
      "certificate": "Primary School Leaving Examination (PSLE)",
      "grade": {
        "division": "II",
        "points": "15"
      }
    }
  ]
}
```

---

### 3. **PATCH /api/v0/resumes/:resumeId/education-qualifications/:qualificationId**

**Description:** Update a specific education qualification (e.g., O-Level, A-Level) by its ID within the specified resume.

**Usage:**

```http
PATCH /api/v0/resumes/661a1c70cbfc1e0e5c3a78a9/education-qualifications/661c4b9d345b8b0e77d2b0a4 HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer {token}

{
  "schoolName": "Updated Secondary School",
  "endYear": 2016,
  "grade": {
    "division": "II",
    "points": "12"
  }
}
```

**Request Headers:**

| Header        | Value            | Required | Description                          |
| ------------- | ---------------- | -------- | ------------------------------------ |
| Authorization | Bearer `{token}` | ✅       | JWT token for the authenticated user |
| Content-Type  | application/json | ✅       | Body content type                    |

**Path Parameters:**

| Parameter       | Type   | Description                                     |
| --------------- | ------ | ----------------------------------------------- |
| resumeId        | String | The unique ID of the resume                     |
| qualificationId | String | The ID of the education qualification to update |

**Request Body:**  
Partial updates are supported. Only include fields you want to update.

```json
{
  "level": "O-Level",
  "schoolName": "Updated Secondary School",
  "startYear": 2012,
  "endYear": 2016,
  "certificate": "The Certificate of Secondary Education Examination (CSEE)",
  "grade": {
    "division": "II",
    "points": "12"
  }
}
```

**Response:**

```json
{
  "success": true,
  "message": "Education qualification updated successfully",
  "data": {
    "_id": "661c4b9d345b8b0e77d2b0a4",
    "level": "O-Level",
    "schoolName": "Updated Secondary School",
    "startYear": 2012,
    "endYear": 2016,
    "certificate": "The Certificate of Secondary Education Examination (CSEE)",
    "grade": {
      "division": "II",
      "points": "12"
    }
  }
}
```

---

### 4. **DELETE /api/v0/resumes/:resumeId/education-qualifications/:qualificationId**

**Description:** Delete an individual education qualification (e.g., Primary, O-Level, A-Level) by its ID from the specified resume.

**Usage:**

```http
DELETE /api/v0/resumes/661a1c70cbfc1e0e5c3a78a9/education-qualifications/661c4b9d345b8b0e77d2b0a4 HTTP/1.1
Host: api.example.com
Authorization: Bearer {token}
```

**Request Headers:**

| Header        | Value            | Required | Description                          |
| ------------- | ---------------- | -------- | ------------------------------------ |
| Authorization | Bearer `{token}` | ✅       | JWT token for the authenticated user |

**Path Parameters:**

| Parameter       | Type   | Description                                     |
| --------------- | ------ | ----------------------------------------------- |
| resumeId        | String | The unique ID of the resume                     |
| qualificationId | String | The ID of the education qualification to delete |

**Response:**

```json
{
  "success": true,
  "message": "Education qualification deleted successfully"
}
```

---
