const restrictedTo = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      const error = new Error('You do not have permission to perform this action!');
      error.status = 403;
      return next(error);
    }
    next();
  };

module.exports = restrictedTo;