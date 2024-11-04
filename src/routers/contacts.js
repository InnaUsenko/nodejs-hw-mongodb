import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
} from '../controllers/contacts.js';

const router = Router();

//GET contacts
router.get('/contacts', getContactsController);

//GET contact by ID
router.get('/contacts/:contactId', getContactByIdController);

export default router;
