### 7. Update Patient by ID

**URL:** `/api/patients/:id`  
**Method:** `PUT`  
**Auth required:** Yes  
**Permissions required:** Authenticated user  

**Headers:**

| Parameter     | Description           |
|---------------|-----------------------|
| Authorization | Bearer `<token>`      |

**Body Parameters:**

| Parameter  | Type   | Description            |
|------------|--------|------------------------|
| name       | string | Updated name (optional)|
| age        | int    | Updated age (optional) |
| diagnosis  | string | Updated diagnosis      |

**Success Response:**

**Code:** `200 OK`  
**Content:**
```json
{
  "message": "Patient updated successfully"
}
