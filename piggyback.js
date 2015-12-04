// Fetch JSON resources using a polyfill for the forthcoming
// window.fetch specification.
//
// Automatically takes care of sending cookies and request headers.
require('es6-promise').polyfill();
require('isomorphic-fetch');

// Default options for GET requests.
const fetchOptions = {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  },
  credentials: 'include'
}

function requestOptions(customOptions) {
  return Object.assign({}, fetchOptions, customOptions);
}

// Throws a catchable error if the HTTP status code
// is in the error range.
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error;
  }
}

// Fetches a JSON resource via GET.
export function sendGet(uri) {
  return fetch(uri, fetchOptions).then(checkStatus);
}

// Sends a POST with a JSON body.
export function sendPost(uri, data) {
  return fetch(uri, requestOptions({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })).then(checkStatus);
}

// Sends a PUT with a JSON body.
export function sendPut(uri, data) {
  return fetch(uri, requestOptions({
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })).then(checkStatus);
}

// Sends a PATCH with a JSON body.
export function sendPatch(uri, data) {
  return fetch(uri, requestOptions({
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })).then(checkStatus);
}

// Sends a DELETE request.
export function sendDelete(uri) {
  return fetch(uri, requestOptions({
    method: 'DELETE'
  })).then(checkStatus);
}
