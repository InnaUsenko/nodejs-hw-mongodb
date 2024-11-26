import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';
import { getContactById } from '../services/contacts.js';

export const isOwner = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const userId = req.user._id;

    if (!isValidObjectId(contactId)) {
      throw createHttpError(400, 'Bad Request. Invalid identifier format.');
    }

    const contact = await getContactById(contactId);
    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    if (!userId.equals(contact.userId)) {
      throw createHttpError(403, 'Forbidden');
    }

    next();
  } catch (err) {
    next(err);
  }
};
