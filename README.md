# Piggyback

A resource-oriented wrapper over the window.fetch API. Defaults to JSON content type.

## Install

```
npm install --save piggyback
```

## Usage

```js
import { getFetch, postFetch, putFetch, deleteFetch } from 'piggyback';

export default function getPosts() {
  return getFetch('/posts').then(function(response) {
    return response.json();
  });
}

export default function createPost(body) {
  return postFetch('/posts', body).then(function(response) {
    return response.json();
  });
}

export default function updatePost(id, body) {
  return putFetch('/posts/' + id.toString(), body).then(function(response) {
    return response.json();
  });
}

export default function deletePost(id) {
  return deleteFetch('/posts/' + id.toString());
}
```

## Notes

- Depends on `es6-promise` and `isomorphic-fetch` polyfills (this is handled automatically).
- Browser auth credentials are always sent with the request.
- HTTP error codes result in a JavaScript `Error` being thrown by default.
- How you handle resolving and rejecting is up to you.

If these defaults aren’t suitable for your use-case, consider using the `isomorphic-fetch` library directly.
