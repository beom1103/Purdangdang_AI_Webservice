import { atom } from 'recoil';
import { User } from './type';

export const userAtom = atom<User | null>({
  key: 'userAtom',
  default: null,
});
