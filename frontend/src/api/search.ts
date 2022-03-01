import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { api, athentication } from '.';
import { Info, Reviews } from '../store/type';

export const plantListAtom = atom({
  key: 'plantListAtom',
  default: [],
});

export const plantQueryAtom = atom({
  key: 'plantQueryAtom',
  default: '',
});

export const methodAtom = atom({
  key: 'methodAtom',
  default: '',
});

export const infoAtom = atom<Info>({
  key: 'infoAtom',
  default: {},
});

export const reviewPostAtom = atom<Reviews>({
  key: 'reviewInputAtom',
  default: {
    plant_id: 0,
    content: '',
    score: 0,
  },
});

// 나중에 검색이랑 합치기
export const fetchPlant = selector({
  key: 'fetchPlant',
  get: async () => {
    try {
      const { data } = await api.get('api/plant/search');
      return data;
    } catch (error) {
      return;
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

export const getDetailInfo = async (pathname: string): Promise<Info | any> => {
  try {
    const { data } = await api.get(`api${pathname}`);
    return data;
  } catch (error) {
    return;
  }
};

export const postReview = async (
  pathname: string,
  review: Reviews,
  method: string,
): Promise<void> => {
  switch (method) {
    case 'post':
      try {
        athentication.post(`api${pathname}`, review);
      } catch (error) {
        console.log(error);
      }
      return;

    case 'delete':
      return;

    case 'put':
      return;

    default:
      return;
  }
};
