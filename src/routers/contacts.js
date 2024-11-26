import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isOwner } from '../middlewares/isOwner.js';
import { validateBody } from '../middlewares/validateBody.js';
import { setUserId } from '../middlewares/setUserId.js';
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
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

//GET contacts
router.get('/', ctrlWrapper(getContactsController));

//GET contact by ID
router.get('/:contactId', isOwner, ctrlWrapper(getContactByIdController));

//POST new Contact
router.post(
  '/',
  setUserId,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

//DELETE
router.delete('/:contactId', isOwner, ctrlWrapper(deleteContactController));

//PUT
router.put(
  '/:contactId',
  isOwner,
  validateBody(updateContactSchema),
  ctrlWrapper(upsertContactController),
);
export default router;

//PATCH
router.patch(
  '/:contactId',
  isOwner,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);
