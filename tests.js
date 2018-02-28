var nock = require('nock');
var expect = require('chai').expect;
var piggyback = require('./piggyback');

function mockRequest() {
  return nock('http://piggyback.website');
}

function mockRequestWithHeader() {
  return nock('http://piggyback.website', {
    reqheaders: {
      'X-Piggyback-Key': '123'
    }
  })
}

describe('sendGet', function() {
  before(function() {
    mockRequest().get('/get').reply(200, {ok: 'OK'});
  });

  it('handles 200 OK', function(done) {
    piggyback.sendGet('http://piggyback.website/get').then(function(response) {
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
    piggyback.sendPost('http://piggyback.website/post').then(function(response) {
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
    piggyback.sendPut('http://piggyback.website/put').then(function(response) {
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
    piggyback.sendPatch('http://piggyback.website/patch').then(function(response) {
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
    piggyback.sendDelete('http://piggyback.website/delete').then(function(response) {
      expect(response.status).to.equal(202);
      done();
    });
  });
});

describe('GET custom headers', function() {
  before(function() {
    mockRequestWithHeader().get('/x-key').reply(200);
  });

  it('GET custom headers', function(done) {
    piggyback.sendGet('http://piggyback.website/x-key', {
      'X-Piggyback-Key': '123'
    }).then(function(response) {
      expect(response.status).to.equal(200);
      done();
    });
  });
});

describe('POST custom headers', function() {
  before(function() {
    mockRequestWithHeader().post('/x-key').reply(200);
  });

  it('POST custom headers', function(done) {
    piggyback.sendPost('http://piggyback.website/x-key', {}, {
      'X-Piggyback-Key': '123'
    }).then(function(response) {
      expect(response.status).to.equal(200);
      done();
    });
  });
});

describe('PUT custom headers', function() {
  before(function() {
    mockRequestWithHeader().put('/x-key').reply(200);
  });

  it('PUT custom headers', function(done) {
    piggyback.sendPut('http://piggyback.website/x-key', {}, {
      'X-Piggyback-Key': '123'
    }).then(function(response) {
      expect(response.status).to.equal(200);
      done();
    });
  });
});

describe('PATCH custom headers', function() {
  before(function() {
    mockRequestWithHeader().patch('/x-key').reply(200);
  });

  it('PATCH custom headers', function(done) {
    piggyback.sendPatch('http://piggyback.website/x-key', {}, {
      'X-Piggyback-Key': '123'
    }).then(function(response) {
      expect(response.status).to.equal(200);
      done();
    });
  });
});

describe('DELETE custom headers', function() {
  before(function() {
    mockRequestWithHeader().delete('/x-key').reply(200);
  });

  it('DELETE custom headers', function(done) {
    piggyback.sendDelete('http://piggyback.website/x-key', {
      'X-Piggyback-Key': '123'
    }).then(function(response) {
      expect(response.status).to.equal(200);
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
