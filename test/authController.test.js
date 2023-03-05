const sinon = require('sinon');
const { expect } = require('chai');

const User = require('../model/User');
const { register, login } = require('../controller/authController');

describe('Register', function () {
  this.afterEach(() => {
    sinon.restore();
  });

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

  it('should create a user if email id is not yet registered', async function () {
    const req = { body: { email: 'test@test.com' } };
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
    sinon.stub(User, 'findOne').returns(null);
    sinon.stub(User, 'create').returns(req.body);
    await register(req, res, next);
    expect(res.statusCode).to.equal(200);
    expect(res.data.message).to.equal('User Created');
  });

  it('should throw an error with status code 400 if there is any error in the try block', async function () {
    const req = { body: {} };
    const res = {
      statusCode: null,
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
    sinon.stub(User, 'findOne').throws('hehehe');
    await register(req, res, next);
    console.log(next.args[0][0].message);
    expect(next.args[0][0].statusCode).to.equal(400);
  });
});

// Unit testing for login function
describe('Login', () => {
  it('should throw incorrect email if no user is registered in given email id', async () => {
    const req = {
      body: { email: 'test@test.com' },
    };
    const res = {
      statusCode: null,
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

    sinon.stub(User, 'findOne').resolves(null);
    await login(req, res, next);
    expect(res.statusCode).to.equal(400);
    expect(res.data.message).to.equal('The entered email is incorrect');
  });
});
