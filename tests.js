var nock = require('nock');
var expect = require('chai').expect;
var piggyback = require('./index');

describe('sendGet', function() {
  it('handles 200 OK', function(done) {
    piggyback.sendGet('https://httpbin.org/get').then(function(response) {
      expect(response).to.be.a('object');
      done();
    });
  });
});
