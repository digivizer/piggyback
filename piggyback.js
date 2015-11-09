// Fetch JSON resources using a polyfill for the forthcoming
// window.fetch specification.
//
// Automatically takes care of sending cookies and request headers.
require('es6-promise').polyfill();
require('isomorphic-fetch');

var _merge = require('lodash.merge');

// Default options for GET requests.
var fetchOptions = {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  },
  credentials: 'include'
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
export function getFetch(uri) {
  return fetch(uri, fetchOptions).then(checkStatus);
}

// Sends a POST with a JSON body.
export function postFetch(uri, data) {
  return fetch(uri, _merge(fetchOptions, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })).then(checkStatus);
}

// Sends a PUT with a JSON body.
export function putFetch(uri, data) {
  return fetch(uri, _merge(fetchOptions, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })).then(checkStatus);
}

// Sends a DELETE request.
export function deleteFetch(uri) {
  return fetch(uri, _merge(fetchOptions, {
    method: 'DELETE'
  })).then(checkStatus);
}
