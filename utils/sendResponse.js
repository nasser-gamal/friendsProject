const sendResponse = (res, data ) => {
  const responseData = {
    status: "success",
    statusCode: data.statusCode || 200,
    message: data?.message || "Data retrieved successfully",
    data: data?.data || null,
  };

  return res.status(responseData.statusCode).json(responseData);
};

module.exports = sendResponse;
