# API Standards

Every API endpoint adheres to a strict JSON structure.

## Success Response
```json
{
  "success": true,
  "data": {
    "id": "123",
    "title": "Example"
  },
  "message": "Item retrieved successfully",
  "meta": {
    "requestId": "req_abc123"
  }
}
```

## Error Response
```json
{
  "success": false,
  "message": "Resource not found",
  "errors": [
    {
      "code": "NOT_FOUND",
      "details": "The specified portfolio item does not exist."
    }
  ],
  "meta": {
    "requestId": "req_abc123",
    "timestamp": "2026-07-04T00:00:00Z"
  }
}
```

## Pagination
Standardized via query parameters `?page=1&limit=10`.
Response includes `meta.pagination`:
```json
"meta": {
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```
