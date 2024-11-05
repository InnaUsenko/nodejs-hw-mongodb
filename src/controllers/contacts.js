import {
  getAllContacts,
  getContactById,
  createContact,
} from '../services/contacts.js';
import { isObjectIdOrHexString } from 'mongoose';
import createHttpError from 'http-errors';

//GET contacts
export const getContactsController = async (req, res) => {
  const contacts = await getAllContacts();

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

//GET contact by ID
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
    throw createHttpError(404, 'Contact not found');
  }

  // Відповідь, якщо контакт знайдено
  res.status(200).json({
    status: 200,
    message: `Successfully found contacts! with id ${contactId}`,
    data: contact,
  });
};

//POST new Contact
export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};
