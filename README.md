# Piggyback

[![Build Status](https://travis-ci.org/digivizer/piggyback.svg?branch=master)](https://travis-ci.org/maetl/piggyback)

A resource-oriented wrapper over the `window.fetch` API. Defaults to the JSON content type.

<img src="http://i.imgur.com/xbbu240.jpg" width="640" title="Piggybacking space shuttle on 747">

## Install

```
npm install --save piggyback
```

## Usage

### Resource Builder

The `resource` function constructs a complete set of CRUD methods to interact with a conventional HTTP API.

All methods return a promise that resolves the [`JSON body`](https://developer.mozilla.org/en-US/docs/Web/API/Body/json) of the response.

```js
import { resource } from 'piggyback';

const { getTasks, getTaskById, createTask, updateTask, deleteTask } = resource('tasks');

// GET /tasks
getTasks().then((json) => console.log(json));

// GET /tasks/{id}
getTaskById(id).then((json) => console.log(json));

// POST /tasks
createTask(task).then((json) => console.log(json));

// PUT /tasks/{id}
createTask(id, task).then((json) => console.log(json));

// DELETE /tasks/{id}
deleteTask(id);
```

### Sending HTTP Requests

The following methods are provided to interact directly with JSON web APIs:

- `sendGet`
- `sendPost`
- `sendPut`
- `sendPatch`
- `sendDelete`

All methods return a promise that resolves to a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response/Response), including the [`Body` mixin of the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Body).

```js
import { sendGet, sendPost, sendPut, sendPatch, sendDelete } from 'piggyback';

export default function getTasks() {
  return sendGet('/tasks').then(function(response) {
    return response.json();
  });
}

export default function createTask(task) {
  return sendPost('/tasks', task).then(function(response) {
    return response.json();
  });
}

export default function replaceTask(id, task) {
  return sendPut('/tasks/' + id.toString(), task).then(function(response) {
    return response.json();
  });
}

export default function updateTask(id, task) {
  return sendPatch('/tasks/' + id.toString(), task).then(function(response) {
    return response.json();
  });
}

export default function deleteTask(id) {
  return sendDelete('/tasks/' + id.toString());
}
```

## Notes

- Depends on `es6-promise` and `isomorphic-fetch` polyfills (this is handled automatically).
- Browser auth credentials are always sent with the request.
- HTTP error codes result in a JavaScript `Error` being thrown by default.
- How you handle resolving and rejecting is up to you.

If these defaults aren’t suitable for your use-case, consider using the `isomorphic-fetch` library directly.
