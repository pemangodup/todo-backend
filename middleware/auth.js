const ErrorResponse = require('../Utils/errorResponse');
const errorResponse = require('../Utils/errorResponse');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const auth = {
  // Verifying the token
  protect: async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token || token === undefined) {
      return next(new ErrorResponse('Token has not been passed.', 400));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      next();
    } catch (error) {
      return next(new errorResponse(error.message, 404));
    }
  },
};

module.exports = auth;
