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
  return postFetch('/posts/' + id.toString());
}
```
