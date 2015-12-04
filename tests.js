var nock = require('nock');
var expect = require('chai').expect;
var piggyback = require('./index');

function mockRequest() {
  return nock('http://piggyback.maetl.net');
}

describe('sendGet', function() {
  before(function() {
    mockRequest().get('/get').reply(200, {ok: 'OK'});
  });

  it('handles 200 OK', function(done) {
    piggyback.sendGet('http://piggyback.maetl.net/get').then(function(response) {
      expect(response.status).to.equal(200);
      done();
    });
  });
});

describe('sendPost', function() {
  before(function() {
    mockRequest().post('/post').reply(201, {ok: 'OK'});
  });

  it('handles 201 Created', function(done) {
    piggyback.sendPost('http://piggyback.maetl.net/post').then(function(response) {
      expect(response.status).to.equal(201);
      done();
    });
  });
});

describe('sendPut', function() {
  before(function() {
    mockRequest().put('/put').reply(201, {ok: 'OK'});
  });

  it('handles 201 Created', function(done) {
    piggyback.sendPut('http://piggyback.maetl.net/put').then(function(response) {
      expect(response.status).to.equal(201);
      done();
    });
  });
});

describe('sendPatch', function() {
  before(function() {
    mockRequest().patch('/patch').reply(201, {ok: 'OK'});
  });

  it('handles 201 Created', function(done) {
    piggyback.sendPatch('http://piggyback.maetl.net/patch').then(function(response) {
      expect(response.status).to.equal(201);
      done();
    });
  });
});

describe('sendDelete', function() {
  before(function() {
    mockRequest().delete('/delete').reply(202);
  });

  it('handles 200 OK', function(done) {
    piggyback.sendDelete('http://piggyback.maetl.net/delete').then(function(response) {
      expect(response.status).to.equal(202);
      done();
    });
  });
});

describe('resource', function() {
  it('builds a set of resource functions', function(done) {
    var api = piggyback.resource('tasks');
    expect(api.getTasks).to.be.a('function');
    expect(api.getTaskById).to.be.a('function');
    expect(api.createTask).to.be.a('function');
    expect(api.updateTask).to.be.a('function');
    expect(api.deleteTask).to.be.a('function');
    done();
  });
});
