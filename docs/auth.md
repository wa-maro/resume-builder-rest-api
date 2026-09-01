#

## 🔐 Authentication API Endpoints

These endpoints handle user account creation, login, logout, and password management. JWT tokens are required to access protected resources in the system.

---

### 1. **POST /api/v0/auth/register**

**Description:** Register a new user account.

**Usage:**

```http
POST /api/v0/auth/register HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "StrongP@ssword123",
  "confirmPassword": "StrongP@ssword123"
}
```

**Request Headers:**

| Header       | Value            | Required | Description                       |
| ------------ | ---------------- | -------- | --------------------------------- |
| Content-Type | application/json | ✅       | Specifies the request body format |

**Request Body:**

| Field           | Type   | Required | Description                               |
| --------------- | ------ | -------- | ----------------------------------------- |
| username        | String | ✅       | Desired username                          |
| email           | String | ✅       | Email address                             |
| password        | String | ✅       | Password for the new account              |
| confirmPassword | String | ✅       | Confirmation Password for the new account |

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

### 2. **POST /api/v0/auth/login**

**Description:** Log in with your credentials to receive a JWT token.

**Usage:**

```http
POST /api/v0/auth/login HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
  "usernameOrEmail": "johndoe@example.com",
  "password": "StrongP@ssword123"
}
```

**Request Headers:**

| Header       | Value            | Required | Description                       |
| ------------ | ---------------- | -------- | --------------------------------- |
| Content-Type | application/json | ✅       | Specifies the request body format |

**Request Body:**

| Field           | Type   | Required | Description                  |
| --------------- | ------ | -------- | ---------------------------- |
| usernameOrEmail | String | ✅       | Registered username or email |
| password        | String | ✅       | Associated account password  |

**Response:**

```json
{
  "success": true,
  "message": "User logged in successfully",
  "user": {
    "id": "680ccc5029c28a166080a99b",
    "username": "johndoe",
    "role": "user"
  },
  "token": "jwt_token_here"
}
```

---
