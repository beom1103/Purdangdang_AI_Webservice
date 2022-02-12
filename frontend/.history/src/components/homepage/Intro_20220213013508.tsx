import React from "react";

const Intro = () => {
  return (
    <div
      className="w-full h-screen"
      style={{
        backgroundImage: "url(/img/home1.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* <img
          className="object-cover w-full h-full bg-cover "
          src="/img/home1.jpg"
          alt="intro"
        /> */}
      <h3 className="flex flex-col items-end justify-center h-screen leading-7 text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, quaerat.
        Provident ullam vitae minima esse laudantium magni quia ipsa numquam
        velit voluptates sapiente animi qui ea est, dicta quasi optio?
      </h3>
    </div>
  );
};

export default Intro;
