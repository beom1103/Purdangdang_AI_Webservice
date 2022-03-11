import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import LoadingSpiner from './components/load-page/LoadingSpiner';
import Routing from './components/routing/Routing';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/global/ScrollToTop';

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <Suspense fallback={<LoadingSpiner />}>
          <BrowserRouter>
            <ScrollToTop />
            <Routing />
          </BrowserRouter>
        </Suspense>
      </RecoilRoot>
    </div>
  );
}

export default App;
