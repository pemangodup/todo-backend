const { expect } = require('chai');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const auth = require('../middleware/auth');

describe('auth middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = {};
    next = sinon.spy();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return a 400 error if token is not provided', async () => {
    await auth.protect(req, res, next);
    expect(next.calledOnce).to.be.true;
    expect(next.args[0][0].statusCode).to.equal(400);
    expect(next.args[0][0].message).to.equal('Token has not been passed.');
  });

  it('should return a 404 error if token is invalid', async () => {
    req.headers = { authorization: 'Bearer invalid_token' };
    sinon.stub(jwt, 'verify').throws(new Error('Invalid token'));
    await auth.protect(req, res, next);
    expect(next.calledOnce).to.be.true;
    expect(next.args[0][0].statusCode).to.equal(404);
    expect(next.args[0][0].message).to.equal('Invalid token');
  });

  it('should set req.user if token is valid', async () => {
    const user = { _id: 'user_id' };
    const token = jwt.sign({ id: user._id }, 'iamsecret');
    req.headers = { authorization: `Bearer ${token}` };
    sinon.stub(jwt, 'verify').returns({ id: user._id });
    sinon.stub(User, 'findById').resolves(user);
    await auth.protect(req, res, next);
    expect(req.user).to.deep.equal(user);
    expect(next.calledOnce).to.be.true;
  });
});
