
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
    "Firstname": "test",
    "Lastname": "User",
    "email": "testuser@ufl.edu",
    "username": "testpass"
}
