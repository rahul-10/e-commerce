const Ajv = require('ajv');

const { addVariant } = require('../schema/internal');
const { error } = require('./error');

const ajv = new Ajv({
  coerceTypes: true,
  format: 'full',
  verbose: true,
  removeAdditional: true,
});


const constructError = (errors) => {
  let err;
  if (typeof errors === 'object') err = errors[0];
  else err = errors.errors[0];

  const dataPath = err.dataPath.replace('.', '');
  const errMessage = err.message;
  const message = `${dataPath} ${errMessage}`;

  return error(400, message.trim());
};


exports.isValid = (data) => {
  const validate = ajv.compile(addVariant);
  if (!validate(data)){
    throw constructError(validate.errors);
  }
  return true;
}
