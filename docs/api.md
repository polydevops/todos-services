# API #

### Authorization ###
This application is authorized via a json web token (jwt) generated from firebase. That token is provided to the server as the following header:

`Authorization: [insert_token]`


### GET /todos ###

Description:
- Fetches all of the 'todos' associated with a user (user is identified by token in header)

Response:
```
{
  todos: [
    {
      _id: 1,
      name: "title",
      todo-items: [
        {
          _id: 1,
          todo: "TODO",
          isDone: false,
        },
        ...
      ]
    },
    ...
  ]
}
```

### POST /todos ###

Description:
- Creates a new todos

Payload:
```
{
  _id: 1,
  name: "title",
  todo-items: [
    {
      _id: 1,
      todo: "TODO",
      isDone: false,
      todo-items: []
    },
    ...
  ]
},
```

Response:
```
{id: 1}
```

### POST /todos/:id ###

Description:
- Updates an existing todos name

Params:
- :id - the id of the todos to update

Payload
```
{
  _id: 1,
  name: "newTitle",
  todo-items: [
    {
      id: 1,
      todo: "TODO",
      isDone: false
    },
    ...
  ]
},
```

Response:
```
200 (OK)
```

### DELETE /todos/:id ###

Description:
- Deletes an existing todos

Params:
- :id - the id of the todos

Response:
```
200 (OK)
```

### POST /todo ###

Description:
- Creates a new todo

Payload:
```
{
  todosId: 1,
  todo: {
    todo: "TODO",
    isDone: false
  }
}
```

Response:
```
{id: 201}
```

### POST /todo/:id ###

Description:
- Updates an existing todo

Params:
- :id - the id of the todo

Payload:
```
{
  todosId: 1,
  todo: {
    _id: 101,
    todo: "Make Dinner",
    isDone: true
  }
}
```

Response:
```
200 (OK)
```

### DELETE /todo/:id ###

Description:
- Deletes an existing todo

Params:
- :id - the id of the todo

Response:
```
200 (OK)
```
