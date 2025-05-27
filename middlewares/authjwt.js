const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      STATUS: false,
      MESSAGE: 'No token provided.',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user data to req.user
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      STATUS: false,
      MESSAGE: 'Invalid token.',
    });
  }
};
