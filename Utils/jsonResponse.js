const jsonResponse = (res, sta, bool, message, count, data) => {
  res.status(sta).json({
    success: bool,
    message,
    count,
    data,
  });
};
module.exports = jsonResponse;
