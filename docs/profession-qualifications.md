## 🎓 Profession Qualifications API Endpoints

These endpoints allow you to manage the education background section of a resume. Each user can add, update, retrieve, or delete multiple profession qualifications under their resume.

---

### 1. **POST /api/v0/resumes/:resumeId/profession-qualifications**

**Description:** Add one or more professional qualifications (e.g., Diploma, Bachelor's, Master's) to the education background of a specific resume. Each entry must be unique based on the combination of `institutionName`, `qualification`, and `programme`.

**Usage:**

```http
POST /api/v0/resumes/661a1c70cbfc1e0e5c3a78a9/profession-qualifications HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer {token}

{
  "professionQualifications": [
    {
      "institutionName": "University of Dar es Salaam",
      "qualification": "Bachelor's",
      "programme": "Computer Science",
      "startYear": 2017,
      "endYear": 2020,
      "grade": {
        "classification": "Upper Second",
        "gpa": 4.2
      }
    },
    {
      "institutionName": "Open University of Tanzania",
      "qualification": "Postgraduate Diploma",
      "programme": "Education",
      "startYear": 2021,
      "endYear": 2022,
      "grade": {
        "classification": "Pass",
        "gpa": 3.2
      }
    }
  ]
}
```

**Request Headers:**

| Header        | Value            | Required | Description                          |
| ------------- | ---------------- | -------- | ------------------------------------ |
| Authorization | Bearer `{token}` | ✅       | JWT token for the authenticated user |
| Content-Type  | application/json | ✅       | Specifies JSON body format           |

**Response:**

```json
{
  "success": true,
  "message": "Professional qualification(s) added successfully",
  "data": [
    {
      "_id": "661d4c8ff3a1d2ce2db5a911",
      "institutionName": "University of Dar es Salaam",
      "qualification": "Bachelor's",
      "programme": "Computer Science",
      "startYear": 2017,
      "endYear": 2020,
      "grade": {
        "classification": "Upper Second",
        "gpa": 4.2
      }
    },
    {
      "_id": "661d4c8ff3a1d2ce2db5a912",
      "institutionName": "Open University of Tanzania",
      "qualification": "Postgraduate Diploma",
      "programme": "Education",
      "startYear": 2021,
      "endYear": 2022,
      "grade": {
        "classification": "Pass",
        "gpa": 3.2
      }
    }
  ]
}
```

---

### 2. **GET /api/v0/resumes/:resumeId/profession-qualifications**

**Description:** Retrieve all professional qualifications (e.g., Diploma, Bachelor's, Master's) associated with a specific resume.

**Usage:**

```http
GET /api/v0/resumes/661a1c70cbfc1e0e5c3a78a9/profession-qualifications HTTP/1.1
Host: api.example.com
Authorization: Bearer {token}
```

**Request Headers:**

| Header        | Value            | Required | Description                          |
| ------------- | ---------------- | -------- | ------------------------------------ |
| Authorization | Bearer `{token}` | ✅       | JWT token for the authenticated user |

**Path Parameters:**

| Parameter | Type   | Description                 |
| --------- | ------ | --------------------------- |
| resumeId  | String | The unique ID of the resume |

**Response:**

```json
{
  "success": true,
  "message": "Professional qualifications retrieved successfully",
  "professionQualifications": [
    {
      "_id": "661d4c8ff3a1d2ce2db5a911",
      "institutionName": "University of Dar es Salaam",
      "qualification": "Bachelor's",
      "programme": "Computer Science",
      "startYear": 2017,
      "endYear": 2020,
      "grade": {
        "classification": "Upper Second",
        "gpa": 4.2
      }
    },
    {
      "_id": "661d4c8ff3a1d2ce2db5a912",
      "institutionName": "Open University of Tanzania",
      "qualification": "Postgraduate Diploma",
      "programme": "Education",
      "startYear": 2021,
      "endYear": 2022,
      "grade": {
        "classification": "Pass",
        "gpa": 3.2
      }
    }
  ]
}
```

---

### 3. **PATCH /api/v0/resumes/:resumeId/profession-qualifications/:qualificationId**

**Description:** Update a specific professional qualification for a given resume by its ID. You can modify fields like `institutionName`, `qualification`, `programme`, `startYear`, `endYear`, and `grade`.

**Usage:**

```http
PATCH /api/v0/resumes/661a1c70cbfc1e0e5c3a78a9/profession-qualifications/661d4c8ff3a1d2ce2db5a911 HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer {token}

{
  "institutionName": "University of Dar es Salaam",
  "qualification": "Bachelor's",
  "programme": "Computer Science",
  "startYear": 2017,
  "endYear": 2021,
  "grade": {
    "classification": "Upper Second",
    "gpa": 4.5
  }
}
```

**Request Headers:**

| Header        | Value            | Required | Description                          |
| ------------- | ---------------- | -------- | ------------------------------------ |
| Authorization | Bearer `{token}` | ✅       | JWT token for the authenticated user |
| Content-Type  | application/json | ✅       | Specifies JSON body format           |

**Path Parameters:**

| Parameter       | Type   | Description                                               |
| --------------- | ------ | --------------------------------------------------------- |
| resumeId        | String | The unique ID of the resume                               |
| qualificationId | String | The unique ID of the professional qualification to update |

**Request Body:**

```json
{
  "institutionName": "University of Dar es Salaam",
  "qualification": "Bachelor's",
  "programme": "Computer Science",
  "startYear": 2017,
  "endYear": 2021,
  "grade": {
    "classification": "Upper Second",
    "gpa": 4.5
  }
}
```

**Required Fields:**

- `institutionName`: Name of the institution offering the qualification
- `qualification`: Type of qualification (e.g., Bachelor's, Master's)
- `programme`: The specific academic programme or course
- `startYear`: The year the qualification started
- `endYear`: The year the qualification ended
- `grade.classification`: The grade classification for the qualification (e.g., Upper Second)
- `grade.gpa`: The GPA score for the qualification

**Response:**

```json
{
  "success": true,
  "message": "Professional qualification updated successfully",
  "data": {
    "_id": "661d4c8ff3a1d2ce2db5a911",
    "institutionName": "University of Dar es Salaam",
    "qualification": "Bachelor's",
    "programme": "Computer Science",
    "startYear": 2017,
    "endYear": 2021,
    "grade": {
      "classification": "Upper Second",
      "gpa": 4.5
    }
  }
}
```

---

### 4. **DELETE /api/v0/resumes/:resumeId/profession-qualifications/:qualificationId**

**Description:** Delete a specific professional qualification for a given resume by its qualification ID.

**Usage:**

```http
DELETE /api/v0/resumes/661a1c70cbfc1e0e5c3a78a9/profession-qualifications/661d4c8ff3a1d2ce2db5a911 HTTP/1.1
Host: api.example.com
Authorization: Bearer {token}
```

**Request Headers:**

| Header        | Value            | Required | Description                          |
| ------------- | ---------------- | -------- | ------------------------------------ |
| Authorization | Bearer `{token}` | ✅       | JWT token for the authenticated user |

**Path Parameters:**

| Parameter       | Type   | Description                                               |
| --------------- | ------ | --------------------------------------------------------- |
| resumeId        | String | The unique ID of the resume                               |
| qualificationId | String | The unique ID of the professional qualification to delete |

**Response:**

```json
{
  "success": true,
  "message": "Professional qualification deleted successfully"
}
```
