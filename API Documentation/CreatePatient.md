### 5. Create Patient
**URL:** `/api/patients`  
**Method:** `POST`  
**Auth required:** Yes  
**Permissions required:** Authenticated user  

**Headers:**

| Parameter     | Description           |
|---------------|-----------------------|
| Authorization | Bearer `<token>`      |

**Body Parameters:**

| Parameter  | Type   | Description          |
|------------|--------|----------------------|
| name       | string | Full name of patient |
| age        | int    | Age of the patient   |
| diagnosis  | string | Medical diagnosis    |

**Success Response:**

**Code:** `201 Created`  
**Content:**
```json
{
  "id": 2,
  "name": "Teja",
  "age": 23,
  "diagnosis": "cold"
}
