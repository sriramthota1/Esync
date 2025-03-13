3. Get User Profile
Retrieve details of the authenticated user.

URL : /api/profile/
Method : GET
Auth required : ✅ Yes
Permissions required : User must be authenticated

Headers
Parameter	Description
Authorization	Bearer <token>
Success Response
Code : 200 OK
Content :
json
Copy
Edit
{
    "id": 1,
    "Firstname": "John",
    "Lastname": "Doe",
    "email": "johndoe@ufl.edu",
    "username": "johndoe123"
}
Error Responses
Code : 401 Unauthorized
Content : {"error": "Authentication required"}
