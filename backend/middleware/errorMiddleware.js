const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({
      msg: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  } else {
    res.status(500).json({ msg: err.message });
  }
};

export default errorHandler;
