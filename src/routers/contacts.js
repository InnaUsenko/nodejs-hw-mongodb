import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
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
router.get('/', ctrlWrapper(getContactsController));

//GET contact by ID
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

//POST new Contact
router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

//DELETE
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

//PUT
router.put(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(upsertContactController),
);
export default router;

//PATCH
router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);
