import React from 'react';
import Header from './components/homepage/Header';
import Intro from './components/homepage/Intro';
import VideoBackground from './components/homepage/VideoBackground';

function App() {
  return (
    <div className="relative w-full App">
      <Header />
      <VideoBackground />
      <Intro />
    </div>
  );
}

export default App;
