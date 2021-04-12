const { NotFoundError, AuthError, AuthorizeError } = require('../common/errors');

const errorHandler = (err, req, res, next) => {
  const sendError = errorSender(req, res);

  if (err instanceof NotFoundError) {
    sendError(404, err);
    return;
  }

  if (err instanceof AuthError) {
    sendError(401, err);
    return;
  }

  if (err instanceof AuthorizeError) {
    sendError(403, err);
    return;
  }

  if (err.name === 'MongoError') {
    sendError(400, err);
    return;
  }

  console.error(err);
  sendError(500, err);
};

const errorSender = (req, res) => (status, error) => {
  res.status(status);

  const isApiEndpoint = req.path.startsWith('/api');

  if (isApiEndpoint) {
    res.send({ error: error.message });
  } else {
    res.render('error', { status, error: error.message });
  }
};

module.exports = errorHandler;
