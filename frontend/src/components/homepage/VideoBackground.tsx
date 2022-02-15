import React from 'react';

const VideoBackground = () => {
  return (
    <div>
      <video className="object-cover w-full h-screen " loop autoPlay muted>
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoBackground;
