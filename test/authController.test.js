const sinon = require('sinon');
const { expect } = require('chai');

const User = require('../model/User');
const { register } = require('../controller/authController');

describe('Register', function () {
  it('should return an error if email is already registered', async function () {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };
    const res = {
      statusCode: 500,
      data: null,
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.data = data;
      },
    };
    const next = sinon.spy();

    sinon.stub(User, 'findOne').returns(req.body);
    await register(req, res, next);
    expect(res.statusCode).to.equal(400);
    expect(res.data.message).to.equal('User already exists');
  });
});

// res.status(sta).json({
//   success: bool,
//   message,
//   count,
//   data,
// });
