import { atom, selector } from 'recoil';
import { api } from '.';

export const plantQueryAtom = atom({
  key: 'plantQueryAtom',
  default: '',
});

export const pageAtom = atom({
  key: 'pageAtom',
  default: '',
});

export const fetchPlant = selector({
  key: 'fetchPlant',
  get: async () => {
    try {
      const { data } = await api.get('api/plant/search');
      return data;
    } catch (error) {
      return false;
    }
  },
});

export const searchPlant = selector({
  key: 'searchPlant',
  get: async ({ get }) => {
    const plant = get(plantQueryAtom);
    try {
      const { data } = await api.get(`api/plant/search?keyword=${plant}`);
      return data;
    } catch (error) {
      return false;
    }
  },
});

export const scrollPage = selector({
  key: 'scrollPage',
  get: async ({ get }) => {
    const page = get(pageAtom);
    try {
      const { data } = await api.get(page);
      return data;
    } catch (error) {
      return false;
    }
  },
});
