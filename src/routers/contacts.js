import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
const router = Router();

//GET contacts
router.get('/contacts', ctrlWrapper(getContactsController));

//GET contact by ID
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

//POST new Contact
router.post('/contacts', ctrlWrapper(createContactController));

export default router;
