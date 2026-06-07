# Template Clone AI - API Documentation

## Base URL
```
http://localhost:3001/api
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Endpoints

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "secure_password"
}

Response: 201 Created
{
  "id": "user_id",
  "email": "user@example.com",
  "name": "John Doe",
  "token": "jwt_token"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password"
}

Response: 200 OK
{
  "id": "user_id",
  "email": "user@example.com",
  "token": "jwt_token"
}
```

#### Logout
```http
POST /auth/logout
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Logged out successfully"
}
```

### Project Endpoints

#### List Projects
```http
GET /projects
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "id": "project_id",
    "name": "My Design",
    "description": "Landing page design",
    "imageUrl": "https://s3.amazonaws.com/...",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-02T00:00:00Z"
  }
]
```

#### Create Project
```http
POST /projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "My Design",
  "description": "Landing page design"
}

Response: 201 Created
{
  "id": "project_id",
  "name": "My Design",
  "userId": "user_id",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### Get Project
```http
GET /projects/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "id": "project_id",
  "name": "My Design",
  "imageUrl": "...",
  "jsonData": {...},
  "elements": [...],
  "exports": [...]
}
```

#### Update Project
```http
PUT /projects/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Design",
  "description": "Updated description"
}

Response: 200 OK
{...updated project...}
```

#### Delete Project
```http
DELETE /projects/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Project deleted successfully"
}
```

### Image Upload & Analysis

#### Upload Image
```http
POST /projects/:id/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

[binary image data]

Response: 200 OK
{
  "imageUrl": "https://s3.amazonaws.com/...",
  "analysis": {...}
}
```

#### Analyze Image
```http
POST /projects/:id/analyze
Authorization: Bearer <token>
Content-Type: application/json

Response: 200 OK
{
  "colors": ["#FF5733", "#33FF57"],
  "typography": {
    "fonts": ["Roboto", "Open Sans"],
    "sizes": [16, 24, 32]
  },
  "layout": {
    "type": "grid",
    "elements": 12
  },
  "components": ["button", "card", "header"],
  "extractedText": "Sample text from image..."
}
```

### Element Endpoints

#### Get Elements
```http
GET /projects/:id/elements
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "id": "element_id",
    "type": "text",
    "content": "Hello World",
    "style": {
      "color": "#000000",
      "fontSize": 16,
      "fontFamily": "Roboto"
    },
    "position": {"x": 10, "y": 20},
    "size": {"width": 200, "height": 50}
  }
]
```

#### Create Element
```http
POST /projects/:id/elements
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "text",
  "content": "New Element",
  "style": {...},
  "position": {"x": 0, "y": 0},
  "size": {"width": 100, "height": 50}
}

Response: 201 Created
{...created element...}
```

#### Update Element
```http
PUT /elements/:elementId
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Updated text",
  "style": {...}
}

Response: 200 OK
{...updated element...}
```

#### Delete Element
```http
DELETE /elements/:elementId
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Element deleted successfully"
}
```

### Export Endpoints

#### Export Project
```http
POST /projects/:id/export
Authorization: Bearer <token>
Content-Type: application/json

{
  "format": "html"  // html, react, tailwind, pdf, png
}

Response: 200 OK
{
  "id": "export_id",
  "format": "html",
  "content": "<!DOCTYPE html>...",
  "fileUrl": "https://s3.amazonaws.com/...",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### Get Export
```http
GET /exports/:exportId
Authorization: Bearer <token>

Response: 200 OK
{
  "id": "export_id",
  "format": "html",
  "content": "<!DOCTYPE html>...",
  "fileUrl": "..."
}
```

### Template Endpoints

#### List Templates
```http
GET /templates?category=landing-pages&isPublic=true

Response: 200 OK
[
  {
    "id": "template_id",
    "name": "Modern Landing Page",
    "category": "landing-pages",
    "thumbnailUrl": "...",
    "isPublic": true
  }
]
```

#### Get Template
```http
GET /templates/:id

Response: 200 OK
{
  "id": "template_id",
  "name": "Modern Landing Page",
  "jsonData": {...},
  "thumbnailUrl": "..."
}
```

#### Create Template
```http
POST /templates
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "My Template",
  "category": "landing-pages",
  "jsonData": {...},
  "isPublic": false
}

Response: 201 Created
{...created template...}
```

## Error Handling

All error responses follow this format:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": "Additional error details"
}
```

### Common Error Codes
- `INVALID_INPUT` - Input validation failed
- `UNAUTHORIZED` - Missing or invalid token
- `FORBIDDEN` - Access denied
- `NOT_FOUND` - Resource not found
- `CONFLICT` - Resource already exists
- `RATE_LIMITED` - Too many requests
- `SERVER_ERROR` - Internal server error

## Rate Limiting

- 1000 requests per hour per user
- 100 requests per minute per IP

Headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1672531200
```

## Pagination

List endpoints support pagination:

```http
GET /projects?page=1&limit=10

Response:
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```
