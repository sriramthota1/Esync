### 6. Get Patient by ID

**URL:** `/api/patients/:id`  
**Method:** `GET`  
**Auth required:** Yes  
**Permissions required:** Authenticated user  

**Headers:**

| Parameter     | Description           |
|---------------|-----------------------|
| Authorization | Bearer `<token>`      |

**Success Response:**

**Code:** `200 OK`  
**Content:**
```json
{
  "id": 2,
  "name": "Teja",
  "age": 23,
  "diagnosis": "cold"
}
