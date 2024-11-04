import { Router } from 'express';
import { getAllContacts, getContactById } from '../services/contacts.js';
import { isObjectIdOrHexString } from 'mongoose';

const router = Router();

//GET contacts
router.get('/contacts', async (req, res) => {
  const contacts = await getAllContacts();

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
});

//GET contact by ID
router.get('/contacts/:contactId', async (req, res) => {
  const { contactId } = req.params;

  //Відповідь, якщо формат/тип ID невірний
  if (!isObjectIdOrHexString(contactId)) {
    res.status(400).json({
      message: 'Invalid ID type',
    });
    return;
  }

  const contact = await getContactById(contactId);

  // Відповідь, якщо контакт не знайдено
  if (!contact) {
    res.status(404).json({
      message: 'Contact not found',
    });
    return;
  }

  // Відповідь, якщо контакт знайдено
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contact,
  });
});

export default router;
