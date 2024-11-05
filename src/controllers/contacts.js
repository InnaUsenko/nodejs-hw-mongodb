import { getAllContacts, getContactById } from '../services/contacts.js';
import { isObjectIdOrHexString } from 'mongoose';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res) => {
  const contacts = await getAllContacts();

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  //Відповідь, якщо формат/тип ID невірний
  if (!isObjectIdOrHexString(contactId)) {
    res.status(400).json({
      message: 'Invalid ID type',
    });
    return;
  }

  const contact = await getContactById(contactId);

  if (!contact) {
    // next(new Error('Contact not found'));
    // return;
    throw createHttpError(404, 'Student not found');
  }

  // Відповідь, якщо контакт знайдено
  res.status(200).json({
    status: 200,
    message: `Successfully found contacts! with id ${contactId}`,
    data: contact,
  });
};
