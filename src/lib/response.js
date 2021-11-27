function Response(res) {
  this.success = (payload, statusCode) => {
    return res.status(statusCode).json({
      success: true,
      payload,
    });
  };

  this.error = (error, statusCode = 401) => {
    return res.status(statusCode).json({
      success: false,
      error,
    });
  };
}

module.exports = (res) => new Response(res);
