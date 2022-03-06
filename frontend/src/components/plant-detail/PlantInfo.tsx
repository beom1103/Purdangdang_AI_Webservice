import React from 'react';
import tw from 'tailwind-styled-components';
import { useRecoilValue } from 'recoil';
import { infoAtom } from '../../api/search';

const PlantInfo = () => {
  const info = useRecoilValue(infoAtom);

  const openShoppingPage = () => {
    const url = 'https://search.shopping.naver.com/search/all?query=';
    window.open(url + info.kor);
  };

  const openYoutubePage = () => {
    const url = 'https://www.youtube.com/results?search_query=';
    window.open(url + info.kor + ' 키우기');
  };

  return (
    <div>
      <p className="mb-4 leading-relaxed">{info?.description}</p>

      <InfoDiv>
        <i className="text-blue-500 fas fa-water"> 물</i>
        <span className="ml-auto">{info?.water_cycle}</span>
      </InfoDiv>
      <InfoDiv>
        <i className="text-orange-500 fas fa-sun"> 햇빛</i>
        <span className="ml-auto">{info?.sunlight}</span>
      </InfoDiv>
      <InfoDiv className="mb-6 border-b">
        <i className="text-green-500 fas fa-temperature-low"> 온도</i>
        <span className="ml-auto">잘 자라는 온도 : {info?.temperature}</span>
      </InfoDiv>

      <div className="flex">
        <button className="buy-button" onClick={openShoppingPage}>
          구매하러 가기
        </button>
        <button className="buy-button" onClick={openYoutubePage}>
          영상보러 가기
        </button>
      </div>
    </div>
  );
};

export default React.memo(PlantInfo);

const InfoDiv = tw.div`
  plant-info-div
`;
