


## Signin

Login to an Account for the authenticated User already in database:

**URL** : ```/api/signin/```

**Method** : ```POST```

**Auth required** : ```NO```

**Permissions required** : ```None```

```
{
    "email": "[must be unique,not null]",
    "password": "[not null]",
}
```
| Parameter      | Description
| :---        |    ----:  
| Email      |email of user    | 
| password      | password of user |
Data example All fields must be sent.
```
{
    "email": "[testuser@ufl.edu]",
    "password": "[testpass]",
}
```
| Parameter      | Sample Input 
| :---        |    ----:  
| Email      |testuser@ufl.edu   |  
| password      | testpass      |
## Success Response

Condition : If everything is OK
**Content:** {“Complete”}

## Error Responses
**Condition :** If Password not matches after decryption with the one that is found in database against the username
**Code :** ```401 Unauthorized```
**Content :** {"Incorrect Details": "[response]"


