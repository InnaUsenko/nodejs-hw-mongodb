import Joi from 'joi';

export const createContactsSchema = Joi.object({
  name: Joi.string.required(),
  phoneNumber: Joi.string.required(),
  email: Joi.string().email(),
  isFavourite: Joi.boolean,
  contactType: Joi.string.valid('work', 'home', 'personal').required(),
});
