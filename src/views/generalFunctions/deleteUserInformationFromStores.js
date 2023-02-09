import { authContext } from '@/stores/authContext';
import { theoryNotesCollection } from '@/stores/theoryNotesCollection.js';
import { additionalsCollection } from '@/stores/additionalsCollection.js';

export const deleteUserInformationFromStores = () => {
  authContext().logout();
  theoryNotesCollection().clearTheoryNotes();
  additionalsCollection().clearAdditionals();
};
