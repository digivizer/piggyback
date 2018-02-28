import fetch from 'cross-fetch';

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
export function sendGet(uri, headers={}) {
  return fetch(uri, requestOptions({headers})).then(checkStatus);
}

// Sends a POST with a JSON body.
export function sendPost(uri, data, headers={}) {
  return fetch(uri, requestOptions({
    method: 'POST',
    headers: Object.assign({}, {
      'Content-Type': 'application/json'
    }, headers),
    body: JSON.stringify(data)
  })).then(checkStatus);
}

// Sends a PUT with a JSON body.
export function sendPut(uri, data, headers={}) {
  return fetch(uri, requestOptions({
    method: 'PUT',
    headers: Object.assign({}, {
      'Content-Type': 'application/json'
    }, headers),
    body: JSON.stringify(data)
  })).then(checkStatus);
}

// Sends a PATCH with a JSON body.
export function sendPatch(uri, data, headers={}) {
  return fetch(uri, requestOptions({
    method: 'PATCH',
    headers: Object.assign({}, {
      'Content-Type': 'application/json'
    }, headers),
    body: JSON.stringify(data)
  })).then(checkStatus);
}

// Sends a DELETE request.
export function sendDelete(uri, headers={}) {
  return fetch(uri, requestOptions({
    method: 'DELETE',
    headers
  })).then(checkStatus);
}

function buildGetOperation(resourceUri) {
  return function get() {
    return sendGet(resourceUri, body).then(function(response) {
      return response.json();
    });
  }
}

function buildGetByIdOperation(resourceUri) {
  return function getId(id) {
    return sendGet(`${resourceUri}/${id}`, body).then(function(response) {
      return response.json();
    });
  }
}

function buildCreateOperation(resourceUri) {
  return function create(body) {
    return sendPost(resourceUri, body).then(function(response) {
      return response.json();
    });
  }
}

function buildUpdateOperation(resourceUri) {
  return function update(id, body) {
    return sendPut(`${resourceUri}/${id}`, body).then(function(response) {
      return response.json();
    });
  }
}

function buildDeleteOperation(resourceUri) {
  return function del(body) {
    return sendDelete(resourceUri);
  }
}

import { singular } from 'pluralize';

const resourceMap = {};

// Constructs a set of uniform functions to interact with a resource with
// create, update, delete, and get methods.
export function resource(name) {
  if (resourceMap[name] !== undefined) return resourceMap[name];

  const resourceName = name.charAt(0).toUpperCase().concat(name.slice(1, name.length));

  const getResource = `get${resourceName}`;
  const getResourceById = `get${singular(resourceName)}ById`;
  const createResource = `create${singular(resourceName)}`;
  const updateResource = `update${singular(resourceName)}`;
  const deleteResource = `delete${singular(resourceName)}`;
  const resourceUri = `/${resourceName}`;

  resourceMap[name] = {};
  resourceMap[name][getResource] = buildGetOperation(resourceUri);
  resourceMap[name][getResourceById] = buildGetByIdOperation(resourceUri);
  resourceMap[name][createResource] = buildCreateOperation(resourceUri);
  resourceMap[name][updateResource] = buildUpdateOperation(resourceUri);
  resourceMap[name][deleteResource] = buildDeleteOperation(resourceUri);

  return resourceMap[name];
}
