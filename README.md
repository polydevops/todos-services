Services for todos-kotlin application. Developed using node with MongoDB as the data repository.

### Configuration ###
The services will not run as is - the user must supply two configuration files.

- /config/service-account-key.json - Get this file from Firebase.
- /config/mongo.json - This file describes your mongo connection. Follows the form:

```
{
  "url": "mongodb://localhost:27017/todos"
}
```
