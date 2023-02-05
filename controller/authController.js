const User = require('../model/User');
const auth = {
  // @desc     Register User
  // @route    POST /todo/v1/api
  // @access   Public
  register: async (req, res, next) => {
    const { email, password } = req.body;
    let user;
    user = await User.findOne({ email });
    if (user) {
      console.log('User already exist');
      res.status(200).json({
        success: false,
        message: 'User already exist',
      });
      return;
    }
    user = await User.create(req.body);
    res.status(200).json({
      success: true,
      data: user,
    });
  },

  // @desc     Login User
  // @route    POST /todo/v1/api
  // @access   Public
  login: async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'The entered email is incorrect',
      });
    }
    const response = await user.comparePassword(password);
    if (!response) {
      return res.status(404).json({
        success: false,
        message: 'Password does not match',
      });
    }

    if (response) {
      const token = user.getJsonWebToken();

      res.status(404).json({
        success: true,
        token,
        data: user,
      });
    }
  },
};
module.exports = auth;
