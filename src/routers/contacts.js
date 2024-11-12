import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController,
} from '../controllers/contacts.js';

const router = Router();

//GET contacts
router.get('/contacts', ctrlWrapper(getContactsController));

//GET contact by ID
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

//POST new Contact
router.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

//DELETE
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

//PUT
router.put(
  '/contacts/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(upsertContactController),
);
export default router;

//PATCH
router.patch(
  '/contacts/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);
