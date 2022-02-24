import axios, { AxiosInstance } from 'axios';
// import { atom, selector } from 'recoil';

// const shop: AxiosInstance = axios.create({
//   baseURL: 'https://openapi.naver.com/v1/search/shop.json?query=',
//   headers: {
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Credentials': 'true',
//     'Content-Type': 'application/json;charset=UTF-8',
//     'X-Naver-Client-Id': `${process.env.NAVER_CLIENT_ID}`,
//     'X-Naver-Client-Secret': `${process.env.NAVER_CLIENT_SECRET}`,
//   },
// });

// // export const showShopList = selectorFamily({
// //     key: "showShopList",
// //     get:(query) => async({get)=>{
// //         const response = await
// //     }
// // })

// export const plantAtom = atom({
//   key: 'plantAtom',
//   default: '',
// });

// export const showShopList = selector<any>({
//   key: 'showShopList',
//   get: async ({ get }) => {
//     const plant = get(plantAtom);
//     try {
//       const response = await shop.get(`${plant}&display=10`);

//       return response.data;
//     } catch (error: any) {
//       throw Error(error);
//     }
//   },
// });
