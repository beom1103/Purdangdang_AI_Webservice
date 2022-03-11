import React from 'react';
import tw from 'tailwind-styled-components';

const img1 = `url('https://images.unsplash.com/photo-1583753075968-1236ccb83c66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=754&q=80')`;
const img2 = `url('https://images.unsplash.com/photo-1495908333425-29a1e0918c5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80')`;
const img3 = `url('https://images.unsplash.com/photo-1566836610593-62a64888a216?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1077&q=80')`;

type AnimProps = {
  textAnim: boolean;
};

const Intro = ({ textAnim }: AnimProps) => {
  return (
    <div className="intro-div intro">
      <div className="justify-around w-8/12 center h-4/6 ">
        <section className="intro-section">
          <Article
            className={` ${textAnim ? `animate-fade-in-up` : null} `}
            style={{
              backgroundImage: img1,
            }}
          >
            <div className="intro-cardBack"></div>
            <div className="intro-cardCenter">
              <H3>푸르댕댕은...</H3>
            </div>
          </Article>
          <Article
            className={` ${textAnim ? `animate-fade-in-up` : null} `}
            style={{
              backgroundImage: img2,
            }}
          >
            <div className="intro-cardBack"></div>
            <div className="intro-cardCenter">
              <H3>
                사용자가 궁금한 식물을 업로드 시 CNN 모델을 토대로 식물 이미지를
                식별하여 결과를 알려줍니다.
              </H3>
            </div>
          </Article>
          <Article
            className={` ${textAnim ? `animate-fade-in-up` : null} `}
            style={{
              backgroundImage: img3,
            }}
          >
            <div className="intro-cardBack"></div>
            <div className="intro-cardCenter">
              <H3>
                반려동물 유무, 채광, 습도 등의 사용자의 환경을 입력받아 적합한
                식물을 추천해줍니다. 
              </H3>
            </div>
          </Article>
        </section>
      </div>
    </div>
  );
};

export default Intro;

const Article = tw.article`
  intro-article
  lg:h-96
  group
`;

const H3 = tw.h3`
  text-sm
  font-bold
  text-center
  text-white
  md:text-2xl
`;
