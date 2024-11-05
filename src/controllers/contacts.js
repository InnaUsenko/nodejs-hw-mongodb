import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
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
export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;

  //Відповідь, якщо формат/тип ID невірний
  if (!isObjectIdOrHexString(contactId)) {
    throw createHttpError(400, 'Invalid ID type');
  }

  const contact = await getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  // Відповідь, якщо контакт знайдено
  res.status(200).json({
    status: 200,
    message: `Successfully found contacts! with id ${contactId}`,
    data: contact,
  });
};

//POST new contact
export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

//DELETE contact
export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  if (!isObjectIdOrHexString(contactId)) {
    throw createHttpError(400, 'Invalid ID type');
  }

  const contact = await deleteContact(contactId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};

//UPDATE contact
export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;
  if (!isObjectIdOrHexString(contactId)) {
    throw createHttpError(400, 'Invalid ID type');
  }

  const result = await updateContact(contactId, req.body, {
    upsert: true,
  });

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a contact!`,
    data: result.contact,
  });
};

//PATCH contact
export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  if (!isObjectIdOrHexString(contactId)) {
    throw createHttpError(400, 'Invalid ID type');
  }

  const result = await updateContact(contactId, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};
