
const CustomError = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  // console.log(req.signedCookies.token);
  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication ');
  }

  try {
    const payload = isTokenValid({ token });
    const {name, userId, role} = payload.user;
    req.user = { name, userId, role };
    console.log(req.user);
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid');
  }
};

const authorizePermissions =(...roles) => {
  return (req, res, next) => {
    console.log(roles);
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnAuthorizeError(
        'Unauthorized to access this route'
      );
    }
    next();
  };
};
module.exports = {
    authenticateUser,
    authorizePermissions
}