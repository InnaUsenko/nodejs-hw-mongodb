import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
const router = Router();

//GET contacts
router.get('/contacts', ctrlWrapper(getContactsController));

//GET contact by ID
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

export default router;
