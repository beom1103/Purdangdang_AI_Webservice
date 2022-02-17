import React from 'react';

const Intro = ({ textAnim }: any) => {
  console.log(textAnim);

  return (
    <div
      className="intro-div"
      style={{
        backgroundColor: '#f8f8f6',
        backgroundImage: 'url(/img/home1.jpg)',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex items-center justify-around w-8/12 h-4/6 ">
        <section className="intro-section">
          <article
            className={`intro-article lg:h-96 group ${
              textAnim ? `animate-fade-in-up` : null
            } `}
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1583753075968-1236ccb83c66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=754&q=80')`,
            }}
          >
            <div className="intro-cardBack"></div>
            <div className="intro-cardCenter">
              <h3 className="text-center">
                <a
                  className="text-2xl font-bold text-center text-white"
                  href="#"
                >
                  <span className="absolute inset-0"></span>
                  푸르댕댕 소개문구
                </a>
              </h3>
            </div>
          </article>
          <article
            className={`intro-article lg:h-96 group ${
              textAnim ? `animate-fade-in-up` : null
            } `}
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1495908333425-29a1e0918c5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80')`,
            }}
          >
            <div className="intro-cardBack"></div>
            <div className="intro-cardCenter">
              <h3 className="text-center">
                <a
                  className="text-2xl font-bold text-center text-white"
                  href="#"
                >
                  <span className="absolute inset-0"></span>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Minus, deserunt ducimus beatae nobis dolores dolorem?
                </a>
              </h3>
            </div>
          </article>
          <article
            className={`intro-article lg:h-96 group ${
              textAnim ? `animate-fade-in-up` : null
            } `}
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1566836610593-62a64888a216?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1077&q=80')`,
            }}
          >
            <div className="intro-cardBack"></div>
            <div className="intro-cardCenter">
              <h3 className="text-center">
                <a
                  className="text-2xl font-bold text-center text-white"
                  href="#"
                >
                  <span className="absolute inset-0"></span>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Velit sit possimus quos.
                </a>
              </h3>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default Intro;
