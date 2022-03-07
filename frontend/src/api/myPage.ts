import { athentication } from '.';

export const isLikePlant = async (plantId: string): Promise<boolean> => {
  try {
    const { data } = await athentication.get(`api/plant/${plantId}/like`);
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const addPlant = async (fill: boolean, plantId: string) => {
  switch (fill) {
    case false:
      await athentication.post(`api/plant/${plantId}/like`);
      return;

    case true:
      await athentication.delete(`api/plant/${plantId}/like`);
      return;
  }
};
