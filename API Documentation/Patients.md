### 4. Get All Patients

**URL:** `/api/patients`  
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
[
  {
    "id": 1,
    "name": "Nabeel",
    "age": 22,
    "diagnosis": "Fever"
  }
]
