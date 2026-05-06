const { body, validationResult } = require('express-validator');

const userValidationRules = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be 2-50 characters'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name must be 1-50 characters'),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone')
    .trim()
    .matches(/^[0-9]{10}$/)
    .withMessage('Phone must be exactly 10 digits'),
  body('gender')
    .optional()
    .isIn(['Male', 'Female', 'Other'])
    .withMessage('Gender must be Male, Female or Other'),
  body('city').optional().trim().isLength({ max: 80 }),
  body('country').optional().trim().isLength({ max: 80 }),
  body('status').optional().isIn(['Active', 'Inactive']),
];

function validate(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  return res.status(400).json({
    success: false,
    message: 'Validation failed',
    errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
  });
}

module.exports = { userValidationRules, validate };
