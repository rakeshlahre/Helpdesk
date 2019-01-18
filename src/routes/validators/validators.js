const validatePassword = function (req) {
  req.checkBody('password', 'Invalid Password').exists()
    .isLength({min: 6, max: 50});
};

const validateUsername = function (req) {
  req.checkBody('username', 'Invalid Username').exists()
    .trim()
    .isLength({min: 2, max: 20})
    .matches(/^[a-z0-9_]+$/i) // name contains invalid characters
    .not()
    .matches(/^[_]|[_]$/i) // name starts or ends with underscores
    .not()
    .matches(/[_]{2,}/i); // name contains consecutive underscores
};

const validateUsernameAvailable = function (req, db, key) {
  req.check(key || 'username', 'username already exists').exists()
    .custom(value => db.users.isUserNameAlreadyTaken(req.body[key] || req.body.username)
      .then(userNameExists => {
        if (userNameExists) throw new Error();
      })
    );
};

const validateEmail = function (req, isOptional) {
  req.check('email', 'Invalid Email').exists()
    .trim()
    .isLength({max: 255})
    .isEmail()
    .optional({checkFalsy: isOptional});
};

const validateEmailAvailable = function (req, db, isOptional) {
  req.check('email', 'Email already exists').exists()
    .custom(value => db.users.isEmailAlreadyTaken(value)
      .then(emailExists => {
        if (emailExists) throw new Error();
      })
    )
    .optional({checkFalsy: isOptional});
};

const validateToken = function (req) {
  req.check('token', 'Invalid token').exists()
    .isUUID(4);
};

const validateRememberMe = function (req) {
  req.checkBody('rememberme', 'Invalid remember me option').isBoolean();
};

const validateOtp = function (req, isOptional) {
  req.checkBody('otp', 'Invalid two factor code').exists()
    .isInt()
    .isLength({min: 6, max: 6})
    .optional({checkFalsy: isOptional});
};

const validateLimit = function (req) {
  req.checkQuery('limit', 'Invalid limit param')
    .exists()
    .isInt()
    .optional({checkFalsy: true});
};

const validateSkip = function (req) {
  req.checkQuery('skip', 'Invalid skip param')
    .exists()
    .isInt()
    .optional({checkFalsy: true});
};

const validateSort = function (req, sortableFields) {
  req.checkQuery('sort', 'Invalid sort param')
    .exists()
    .isIn(sortableFields)
    .optional({checkFalsy: true});
};

const validateSessionId = function (req) {
  req.checkBody('id', 'Invalid session id').exists()
    .trim()
    .isUUID(4);
};

const validateIp = function (req, isOptional) {
  req.checkBody('ip', 'Invalid ip')
    .exists()
    .trim()
    .isIP()
    .optional({checkFalsy: isOptional});
};

const validateBooleanOption = function (req) {
  req.checkBody('option', 'Invalid option').exists()
    .isBoolean();
};

const textValidator = function (req, fieldName) {
  req.checkBody(fieldName, `Invalid ${fieldName}`).exists()
    .custom(value => typeof value === 'string')
    .isLength({min: 1, max: 4000});
};

const validateName = function (req) {
  req.checkBody('name', 'Invalid name').exists()
    .isLength({max: 255});
};

module.exports = {
  validatePassword,
  validateUsername,
  validateUsernameAvailable,
  validateEmail,
  validateEmailAvailable,
  validateToken,
  validateRememberMe,
  validateOtp,
  validateLimit,
  validateSkip,
  validateSort,
  validateSessionId,
  validateIp,
  validateBooleanOption,
  textValidator,
  validateName
};
