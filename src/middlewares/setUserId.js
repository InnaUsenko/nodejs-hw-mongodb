import createHttpError from 'http-errors';

export const setUserId = async (req, res, next) => {
  const userId = req.user._id;

  if (userId) {
    const payload = { ...req.body, userId };
    req.body = payload;
    next();
  } else {
    const error = createHttpError(400, 'Bad Request', {
      errors: 'Something went wrong',
    });
    next(error);
  }
};
