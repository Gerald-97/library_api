const { body, validationResult  } = require('express-validator');

const validationRules = () => {
    return [
      body('email').isEmail(),
      body('password').isLength({ min: 5 })
    ]
}
const validate = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = { validationRules, validate};