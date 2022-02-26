import React from 'react';
import tw from 'tailwind-styled-components';
import { useLocation, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { getDetailInfo } from '../../api/search';

const PlantInfo = () => {
  const params = useParams() as { name: string };
  const { pathname } = useLocation();
  const plantInfo = useRecoilValue(getDetailInfo(pathname));

  return (
    <div>
      <p className="mb-4 leading-relaxed">{plantInfo.description}</p>

      <InfoDiv>
        <i className="text-blue-500 fas fa-water"> 물</i>
        <span className="ml-auto">{plantInfo.water_cycle}</span>
      </InfoDiv>
      <InfoDiv>
        <i className="text-orange-500 fas fa-sun"> 햇빛</i>
        <span className="ml-auto">{plantInfo.sunlight}</span>
      </InfoDiv>
      <InfoDiv className="mb-6 border-b">
        <i className="text-green-500 fas fa-temperature-low"> 온도</i>
        <span className="ml-auto">
          잘 자라는 온도 : {plantInfo.temperature}
        </span>
      </InfoDiv>

      <button className="buy-button">구매하러 가기</button>
    </div>
  );
};

export default PlantInfo;

const InfoDiv = tw.div`
  plant-info-div
`;
