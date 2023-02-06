const errorMiddleware = (err, req, res, next) => {
  res.status(500).json({ success: false, data: err.message });
};

module.exports = errorMiddleware;
