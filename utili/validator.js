const check = require('express-validator/check')

exports.validate = (req) => {
  // console.log(req)
  let errors = check.validationResult(req)
  if (!errors.isEmpty()) {
    return errors.array()
  }

  return []
}
