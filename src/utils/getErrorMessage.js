export function getErrorMessage(error) {
  if (error === undefined) return;
  if (!error?.response) {
    return error.message;
  }

  let message = error.response.data.message;
  const errors = error.response.data.errors;

  if (errors) {
    if (typeof errors === 'object') {
      const errorsArr = Object.values(errors);
      message =
        errorsArr.length > 0
          ? errorsArr.join(', ')
          : error.response.data.message;
    } else if (typeof errors === 'string') {
      message = errors;
    }
  }

  return message;
}
