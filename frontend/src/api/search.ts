import { atom, selector } from 'recoil';
import { api } from '.';

export const plantListAtom = atom({
  key: 'plantListAtom',
  default: [],
});

export const plantQueryAtom = atom({
  key: 'plantQueryAtom',
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

export const scrollPage = async (page: number) => {
  try {
    const { data } = await api.get(`api/plant/search?page=${page}`);
    return data;
  } catch (error) {
    return false;
  }
};
