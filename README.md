# Piggyback

A resource-oriented wrapper over the `window.fetch` API. Defaults to the JSON content type.

<img src="http://i.imgur.com/xbbu240.jpg" width="640" title="Piggybacking space shuttle on 747">

## Install

```
npm install --save piggyback
```

## Usage

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
