var expect = require('chat').expect;
var request = require('request');

describe('Server urls', function() {
  beforeEach(function() {
    var page;
    request('http://127.0.0.1:3000', function(error, response, body) {
      page = body;
    });
  });

  it('Should send the front page in response to a GET to "/"', function() {
    expect(page).to.not.equal(undefined);
  });
});
