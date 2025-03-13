
---

**3. Get User Profile**

**Get User Profile**

**URL** : `/api/profile/`  
**Method** : `GET`  
**Auth required** :  Yes  
**Permissions required** : User must be authenticated  

**Headers:**
| Parameter | Description |
|-----------|------------|
| Authorization | `Bearer <token>` |

**Success Response:**
- **Code** : `200 OK`  
- **Content** :
```json
{
    "id": 1,
    "Firstname": "John",
    "Lastname": "Doe",
    "email": "johndoe@ufl.edu",
    "username": "johndoe123"
}
