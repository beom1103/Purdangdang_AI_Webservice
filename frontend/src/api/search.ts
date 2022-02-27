import { atom, selector, selectorFamily } from 'recoil';
import { api } from '.';

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

// export const reviewInputAtom = atom({
//   key: 'reviewInputAtom',
//   default: {
//     plant_id: 0,
//     content: '',
//     score: 0,
//   },
// });

// 나중에 검색이랑 합치기
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

export const getDetailInfo = selectorFamily({
  key: 'getDetailInfo',
  get: (pathname: string) => async () => {
    try {
      const { data } = await api.get(`api${pathname}`);
      return data;
    } catch (error) {
      return false;
    }
  },
});

export const getReviews = selectorFamily({
  key: 'getReviews',
  get:
    (id: number) =>
    async ({ get }) => {
      const method = get(methodAtom);

      switch (method) {
        case 'post':
          return;

        case 'delete':
          return;

        case 'put':
          return;

        default:
          const { data } = await api.get(`api/plant/${id}/info`);
          return data;
      }
    },
});
