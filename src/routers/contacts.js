import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
const router = Router();

//GET contacts
router.get('/contacts', ctrlWrapper(getContactsController));

//GET contact by ID
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

//POST new Contact
router.post('/contacts', ctrlWrapper(createContactController));

//DELETE
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

//PUT
router.put('/contacts/:contactId', ctrlWrapper(upsertContactController));
export default router;

//PATCH
router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));
