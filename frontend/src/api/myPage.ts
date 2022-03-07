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

export const addPlant = async (
  fill: boolean,
  plantId: string,
): Promise<void> => {
  switch (fill) {
    case false:
      await athentication.post(`api/plant/${plantId}/like`);
      return;

    case true:
      await athentication.delete(`api/plant/${plantId}/like`);
      return;
  }
};

export const setMyPlant = async (
  user: string | undefined,
  image: string[],
  plantName: string,
  num: number,
) => {
  const imageFile = image[0];
  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append('name', plantName);

  try {
    const { data } = await athentication.post(
      `api/user/${user}?order=${num}`,
      formData,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const loadMyPlant = async (user: string | undefined) => {
  try {
    const { data } = await athentication.get(`api/user/${user}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
