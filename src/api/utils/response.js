exports.sendResponse = (req, res, status = 200, data = null) => {
  const response = {
    success: true,
    data,
  };
  return res.status(status).json(response);
};
