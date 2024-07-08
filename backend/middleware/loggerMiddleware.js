const loggerHandler = (req, res, next) => {
  const methodColors = {
    GET: 'green',
    POST: 'yellow',
    PUT: 'blue',
    DELETE: 'red',
  };

  const color = methodColors[req.method] || 'white';

  console.log(
    `METHOD: ${req.method}, URL: ${req.protocol}://${req.get('host')}${
      req.originalUrl
    }`[color]
  );
  next();
};

export default loggerHandler;
