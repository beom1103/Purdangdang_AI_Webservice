import { atom, selector } from 'recoil';
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

export const filterAtom = atom({
  key: 'filterAtom',
  default: '',
});

export const pageAtom = atom({
  key: 'pageAtom',
  default: 1,
});

// 나중에 검색이랑 합치기
export const fetchPlant = selector({
  key: 'fetchPlant',
  get: async ({ get }) => {
    const filter = get(filterAtom);
    let requestUrl = null;

    if (filter === '전체') {
      requestUrl = 'api/plant/search';
    } else {
      requestUrl = `api/plant/search?f=${filter}`;
    }

    if (requestUrl !== null) {
      const { data } = await api.get(requestUrl);
      return data;
    }
  },
});

export const searchPlant = selector({
  key: 'searchPlant',
  get: async ({ get }) => {
    const plant = get(plantQueryAtom);
    try {
      const { data } = await api.get(`api/plant/search?kw=${plant}`);
      return data;
    } catch (error) {
      return false;
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
    const { data } = await api.get(requestUrl);
    return data;
  }
};

export const getMorePlant = selector({
  key: 'getMorePlant',
  get: async ({ get }) => {
    const page = get(pageAtom);
    const filter = get(filterAtom);
    const response = await scrollPage(page, filter);
    return response;
  },
});

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

export const preview = async (select: any) => {
  console.log(select);
  const imageFile = select;
  const image = new FormData();
  image.append('file', imageFile);

  try {
    const { data } = await api.post('api/plant/upload', image);
    return data;
  } catch (error) {
    console.log(error);
  }
};
