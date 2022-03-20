import { atom, selector } from 'recoil';
import { api, athentication } from '.';
import { Info, Plant, Reviews, Search } from '../store/type';

export const plantListAtom = atom<Plant[]>({
  key: 'plantListAtom',
  default: [],
});

export const plantQueryAtom = atom<string>({
  key: 'plantQueryAtom',
  default: '',
});

export const methodAtom = atom<string>({
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

export const filterAtom = atom<string>({
  key: 'filterAtom',
  default: '전체',
});

export const searchPlant = selector<Search>({
  key: 'searchPlant',
  get: async ({ get }) => {
    const plant = get(plantQueryAtom);
    const filter = get(filterAtom);

    let requestUrl = null;

    try {
      if (filter === '전체') {
        requestUrl = `api/plant/search?kw=${plant}`;
      } else {
        requestUrl = `api/plant/search?kw=${plant}&f=${filter}`;
      }

      if (requestUrl !== null) {
        const { data } = await api.get(requestUrl);
        return data;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  },
});

export const scrollPage = async (page: number, filter: string) => {
  let requestUrl = null;

  if (filter === '전체') {
    requestUrl = `api/plant/search?page=${page}`;
  } else {
    requestUrl = `api/plant/search?f=${filter}&page=${page}`;
  }
  if (requestUrl !== null) {
    try {
      const { data } = await api.get(requestUrl);
      return data;
    } catch (error) {
      return false;
    }
  }
};

export const getDetailInfo = async (pathname: string) => {
  try {
    const { data } = await api.get(`api${pathname}`);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getMoreReview = async (url: string) => {
  try {
    const { data } = await api.get(`${url}`);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const postReview = async (
  pathname: string,
  method: string,
  review?: Reviews,
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
      try {
        athentication.delete(`api${pathname}`);
      } catch (error) {
        console.log(error);
      }
      return;

    case 'put':
      try {
        athentication.put(`api${pathname}`, review);
      } catch (error) {
        console.log(error);
      }
      return;

    default:
      return;
  }
};

export const postAiModel = async (select: File[], filter: string) => {
  const imageFile = select[0];
  const image = new FormData();
  image.append('file', imageFile);

  try {
    const { data } = await api.post(`api/plant/upload?act=${filter}`, image);
    return data;
  } catch (error) {
    console.log(error);
  }
};
