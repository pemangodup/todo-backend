const jsonResponse = (res, sta, bool, message, data) => {
  res.status(sta).json({
    success: bool,
    message,
    data,
  });
};
module.exports = jsonResponse;
