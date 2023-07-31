import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import tw from 'twin.macro';

import AppProvider from '~/hocs/hoc-provider';

const TxTestPage = lazy(() => import('./pages/tx-test'));
const MainPage = lazy(() => import('./pages/main'));

const RouteWrapper = tw.main`relative w-full h-full`;
const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <RouteWrapper>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/tx-test" element={<TxTestPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </RouteWrapper>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
