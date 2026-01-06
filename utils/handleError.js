function handleError(res, code = 500, message = "Internal Server Error", details = []) {
  return res.status(code).render("error", {
    code,
    message,
    details
  });
}

module.exports = handleError;
