const expect = require('chai').expect;
const authMiddleware = require('../middleware/auth');

describe('Auth Middleware', () => {
  it('should throw an error if there is no bearer token.', function (done) {
    const req = {
      headers: { authorization: null },
    };

    expect(authMiddleware.protect.bind(this, req, {}, () => {})).to.throw(
      'Not authenticated.'
    );
    done();
  });
});
