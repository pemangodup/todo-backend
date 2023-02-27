const User = require('../model/User');
const jsonResponse = require('../Utils/jsonResponse');

const auth = {
  // @desc     Register User
  // @route    POST /todo/v1/api
  // @access   Public
  register: async (req, res, next) => {
    const { email, password } = req.body;
    let user;
    user = await User.findOne({ email });
    if (user) {
      jsonResponse(res, 404, false, 'User already exists', '');
      return;
    }
    user = await User.create(req.body);
    jsonResponse(res, 200, true, 'User Created', user);
  },

  // @desc     Login User
  // @route    POST /todo/v1/api
  // @access   Public
  login: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return jsonResponse(
          res,
          400,
          false,
          'The entered email is incorrect',
          ''
        );
      }
      const response = await user.comparePassword(password);
      if (!response) {
        const error = new Error('Password does not match');
        error.statusCode = 401;
        throw error;
      }
      const token = user.getJsonWebToken();
      res.status(404).json({
        success: true,
        token,
        data: user,
      });
      return;
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
      return error;
    }
  },
};
module.exports = auth;
